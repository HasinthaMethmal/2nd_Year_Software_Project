import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, CardTitle, Table, Button, Input, Label } from 'reactstrap';


function InprogressTable() {
  const [deliveries, setDeliveries] = useState([]);
  const [deliverycost, setDeliverycost] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:5000/delivery_inprogress?username=${username}`);
        setDeliveries(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const handlePriceChange = (e, index) => {
    const newDeliverycost = Array.isArray(deliverycost) ? [...deliverycost] : [];
    newDeliverycost[index] = parseInt(e.target.value);
    setDeliverycost(newDeliverycost);
  };

  const handleAddPrice = (index) => {
    const newDeliveries = [...deliveries];
    const newDelivery = { ...newDeliveries[index] };
    newDelivery.deliverycost = deliverycost[index];
    newDeliveries[index] = newDelivery;
    setDeliveries(newDeliveries);
    setEditIndex(-1);

    // Store updated deliveries array in localStorage
    localStorage.setItem('deliveries', JSON.stringify(newDeliveries));
  };


  const handleEdit = (index) => {
    setDeliverycost(deliveries[index].deliverycost || 0);
    setEditIndex(index);
  };

  const handleCompleted = (index) => {
    const newDeliveries = [...deliveries];
    newDeliveries[index].completed = !newDeliveries[index].completed;
    setDeliveries(newDeliveries);
  };


  const handleReject = async (delivery) => {
    // Remove delivery cost and username before POSTing to deliveries table
    const { deliverycost, username, ...deliveryWithoutCost } = delivery;

    try {
      // POST delivery data to orders table
      await axios.post("http://localhost:5000/delivery_orders", deliveryWithoutCost);

      console.log("Delivery added to deliveries table");

      // DELETE delivery data from inprogress table
      await axios.delete(`http://localhost:5000/delivery_inprogress/${delivery.id}`);

      console.log(`Accepted delivery with id ${delivery.id} deleted from the database.`);

      // Update state with new deliveries data
      const updatedDeliveries = deliveries.map((d) => {
        if (d.id === delivery.id) {
          return {
            ...d,
            deliverycost: null, // set delivery cost to null
            username: null, // set username to null
          };
        } else {
          return d;
        }
      });

      setDeliveries(updatedDeliveries.filter((d) => d.id !== delivery.id));
    } catch (error) {
      console.log(error);
    }
  };


  const handleConfirm = async (index) => {
    try {
      // Get updated deliveries array from local storage
      const updatedDeliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
      const delivery = updatedDeliveries[index];
      const deliveryCost = delivery.deliverycost || 0;
      const rowData = {
        ...delivery,
        deliverycost: deliveryCost,
      };

      // Make POST request to myhistory table
      await axios.post('http://localhost:5000/delivery_myhistory', rowData);

      console.log('Row added to myhistory table');

      await axios.delete(`http://localhost:5000/delivery_inprogress/${delivery.id}`);

      console.log('Row deleted from inprogress table');
      localStorage.removeItem('deliveries');
      const newDeliveries = [...deliveries];
      newDeliveries.splice(index, 1);
      setDeliveries(newDeliveries);
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Deliveries In Progress</CardTitle>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="text-center">Action</th>
                          <th className="text-center">ID</th>
                          <th className="text-center">Customer ID</th>
                          <th className="text-center">Seller ID</th>
                          <th className="text-center">Item ID</th>
                          <th className="text-center">Price</th>
                          <th className="text-center">Address</th>
                          <th className="text-center">Add Delivery Cost</th>
                          <th className="text-center">Delivery Cost (Rs.)</th>
                          <th className="text-center">Confirm Delivery</th>
                        </tr>
                      </thead>
                      <tbody>
                        {deliveries.map((delivery, index) => (
                          <tr key={delivery.id} style={{ backgroundColor: delivery.completed ? "green" : "" }}>
                            <td className="text-center">
                              <div className="d-flex flex-column justify-content-center align-items-center">
                                <Button className="btn-danger mb-2" onClick={() => handleReject(delivery)}>Reject</Button>
                              </div>
                            </td>
                            <td className="text-center">{delivery.id}</td>
                            <td className="text-center">{delivery.customerID}</td>
                            <td className="text-center">{delivery.sellerID}</td>
                            <td className="text-center">{delivery.itemID}</td>
                            <td className="text-center">{delivery.price}</td>
                            <td className="text-center">{delivery.address}</td>
                            <td className="text-center">
                              {editIndex === index ? (
                                <div>
                                  <Label htmlFor={`price-${index}`}></Label>
                                  <Input
                                    type="number"
                                    id={`price-${index}`}
                                    value={deliverycost[index] || delivery.deliverycost || ''}
                                    onChange={(e) => handlePriceChange(e, index)}
                                    min="1"
                                  />
                                  <Button className="price-success-button" onClick={() => handleAddPrice(index)}>Update</Button>
                                </div>
                              ) : (
                                <div className="d-flex justify-content-center">
                                  <Button color="primary" className="mr-2" onClick={() => handleEdit(index)}>Add</Button>
                                </div>
                              )}
                            </td>
                            <td className="text-center">{delivery.deliverycost || '-'}</td>
                            <td className="text-center">
                              {delivery.deliverycost ? (
                                <div className="d-flex justify-content-center">
                                  <Button
                                    color="success"
                                    className="mr-2"
                                    onClick={() => handleConfirm(index)}
                                  >
                                    Confirm
                                  </Button>
                                </div>
                              ) : (
                                <div></div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </React.Fragment>
  );
};

export default InprogressTable;

import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Button,
} from "reactstrap";

function OrdersTables() {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/delivery_orders");
        setDeliveries(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const handleAccept = async (deliveryId) => {
    try {
      const delivery = deliveries.find((d) => d.id === deliveryId);
      const username = localStorage.getItem('username');

      const acceptedDelivery = {
        ...delivery,
        username: username
      };

      // Make the POST request to add the delivery to the inprogress table
      await axios.post("http://localhost:5000/delivery_inprogress", acceptedDelivery);

      // Make the DELETE request to remove the delivery from the orders table
      await axios.delete(`http://localhost:5000/delivery_orders/${deliveryId}`);

      // Remove the delivery from the deliveries array
      const updatedDeliveries = deliveries.filter((d) => d.id !== deliveryId);
      setDeliveries(updatedDeliveries);
    } catch (error) {
      console.log(error);
    }
  };

  // filter out deliveries that have already been accepted
  let filteredDeliveries = deliveries.filter((delivery) => !delivery.accepted);

  return (
    <div className="page-content">
      <div className="container-fluid">
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <CardTitle className="h4">Available Orders</CardTitle>
                <div className="table-responsive">
                  <Table className="table mb-0">
                    <thead className="table-light">
                      <tr>
                        <th className="text-center">ID</th>
                        <th className="text-center">Customer ID</th>
                        <th className="text-center">Seller ID</th>
                        <th className="text-center">Item ID</th>
                        <th className="text-center">Price</th>
                        <th className="text-center">Address</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDeliveries.map((delivery) => (
                        <tr key={delivery.id}>
                          <td className="text-center">{delivery.id}</td>
                          <td className="text-center">{delivery.customerID}</td>
                          <td className="text-center">{delivery.sellerID}</td>
                          <td className="text-center">{delivery.itemID}</td>
                          <td className="text-center">{delivery.price}</td>
                          <td className="text-center">{delivery.address}</td>
                          <td className="btn-container text-center">
                              <Button className="btn-success mb-2" onClick={() => handleAccept(delivery.id)}>Accept</Button>
                           
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
  );
};

export default OrdersTables;

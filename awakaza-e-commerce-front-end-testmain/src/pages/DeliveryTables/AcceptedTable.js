import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Alert,
} from "reactstrap";

const AcceptedTable = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:5000/delivery_accepted?username=${username}`);
        setDeliveries(response.data);
      } catch (error) {
        console.log(error);
        setError('Error fetching delivery history');
      }
    };
    fetchData();
  }, []);

  const renderTableRows = () => {
    if (deliveries.length === 0) {
      return (
        <tr>
          <td colSpan="7" className="text-center">No deliveries found.</td>
        </tr>
      );
    }

    return deliveries.map((delivery, index) => (
      <tr key={index}>
        <td className="text-center">{delivery.id}</td>
        <td className="text-center">{delivery.customerID}</td>
        <td className="text-center">{delivery.sellerID}</td>
        <td className="text-center">{delivery.itemID}</td>
        <td className="text-center">{delivery.price}</td>
        <td className="text-center">{delivery.address}</td>
        <td className="text-center">{delivery.deliverycost || 0}</td>
      </tr>
    ));
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="h4">Accepted Deliveries</CardTitle>
                  {error && <Alert color="danger">{error}</Alert>}
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead className="table-light">
                        <tr>
                          <th className="text-center">ID</th>
                          <th className="text-center">Customer ID</th>
                          <th className="text-center">Seller ID</th>
                          <th className="text-center">Item ID</th>
                          <th className="text-center">Price (Rs.)</th>
                          <th className="text-center">Address</th>
                          <th className="text-center">Delivery Cost (Rs.)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderTableRows()}
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

export default AcceptedTable;

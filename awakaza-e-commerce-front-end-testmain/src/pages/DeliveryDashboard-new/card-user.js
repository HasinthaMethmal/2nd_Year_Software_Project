import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
} from "reactstrap";
import axios from "axios";

function CardUser(props) {
  const [username, setUsername] = useState("");
  const [completed, setCompleted] = useState(0);
  const [inprogress, setInprogress] = useState(0);
  const [customers, setCustomers] = useState(0);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Make an API call to fetch the completed value from the database
    axios.get(`http://localhost:5000/delivery_accepted?username=${username}`)
      .then(response => {
        setCompleted(response.data.length);
      })
      .catch(error => console.error(error));

    // Make an API call to fetch the inprogress value from the database
    axios.get(`http://localhost:3306/delivery_inprogress?username=${username}`)
      .then(response => {
        setInprogress(response.data.length);
      })
      .catch(error => console.error(error));
  }, [username]);

  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <Row>
                <Col lg="4">
                  <div className="d-flex">
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <h5 className="mb-1">
                          {(() => {
                            const currentTime = new Date().getHours();
                            if (currentTime >= 5 && currentTime < 12) {
                              return `Good Morning ${username} !`;
                            } else if (currentTime >= 12 && currentTime < 18) {
                              return `Good Afternoon ${username} !`;
                            } else {
                              return `Good Evening ${username} !`;
                            }
                          })()}
                        </h5>
                        <p className="mb-0">Delivery User</p>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg="4" className="align-self-center">
                  <div className="text-lg-center mt-4 mt-lg-0">
                    <Row>
                      <Col xs="4">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            Completed
                          </p>
                          <h5 className="mb-0">{completed}</h5>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            Inprogress
                          </p>
                          <h5 className="mb-0">{inprogress}</h5>
                        </div>
                      </Col>
                      <Col xs="4">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            No.of Customers
                          </p>
                          <h5 className="mb-0">{customers}</h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default CardUser;
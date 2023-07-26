import React from "react";
import { Row, Col, Card } from "reactstrap";
import profileImg from "../../assets/images/profile-img.png";

function CardWelcome(props) {
  return (
    <React.Fragment>
      <Col xl="4">
        <Card className="bg-primary bg-soft">
          <div>
            <Row>
              <Col xs="7">
                <div className="text-primary p-3">
                  <h5 className="text-primary">Welcome Back !</h5>
                  <a href="http://www.awakaza.com" target="_blank" rel="noopener noreferrer">Visit Awakaza.com</a>
                  <ul className="ps-3 mb-0">
                    <li className="py-0">Contact us for More (0332227284)</li>
                  </ul>
                </div>
              </Col>
              <Col xs="5" className="align-self-end">
                <img src={profileImg} alt="" className="img-fluid" />
              </Col>
            </Row>
          </div>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default CardWelcome;
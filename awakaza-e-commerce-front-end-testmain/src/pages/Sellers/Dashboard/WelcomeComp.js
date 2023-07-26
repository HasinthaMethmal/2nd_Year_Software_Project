import React, { useState } from "react"

import { Row, Col, Card, CardBody,Modal } from "reactstrap"

import Rating from "react-rating";


import profileImg from "../../../assets/images/profile-img.png"

const WelcomeComp = (props) => {
  const [viewModal, setViewModal] = useState(false)

  const showDetails =() =>{
         setViewModal(!viewModal)
  }
  console.log(props)
  return (
    
    <React.Fragment>
      <Card className="overflow-hidden">
        <div className="bg-primary bg-soft">
          <Row>
            <Col xs="7">
              <div className="text-primary p-3">
                <h5 className="text-primary">Welcome Back !</h5>
                <p> Dashboard</p>
              </div>
            </Col>
            
          </Row>
        </div>
        <CardBody className="pt-0">
          <Row>
            <Col sm="4">
              <div className="avatar-md profile-user-wid mb-4">
                <img
                  src="https://cdn.dribbble.com/users/458522/screenshots/15340062/media/9649f98e58d325bcac6fa81816369ab0.png?compress=1&resize=1000x750&vertical=top"
                  alt=""
                  className="img-thumbnail rounded-circle "
                />
              </div>
              <h3 className=" text-truncate">{props.data.store_name}</h3>
              <p className="text-muted mb-0 text-truncate">{props.data.description}</p>
            </Col>

            <Col sm="8">
              <div className="pt-4">
                <Row>
                  <Col xs="6">
                    <h5 className="font-size-15">125</h5>
                    <p className="text-muted mb-0">Products</p>
                  </Col>
                  <Col xs="6">
                  
                          <Rating
                            max={5}
                            initialRating= {3}
                            emptySymbol="mdi mdi-star-outline text-muted"
                            fullSymbol="mdi mdi-star text-primary"
                            className="rating-symbol-background"
                          />
                        
                    <p className="text-muted mb-0">seller Rating</p>
                  </Col>
                </Row>
                <div className="mt-4">
                 <button
                          className="btn btn-primary waves-effect waves-light btn-sm "
                          onClick={showDetails}
                        >
                        View Profole
                        </button>

                 <Modal
                      isOpen={viewModal}
                      toggle={() => {
                        showDetails();
                      }}
                    >
                      <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myModalLabel">
                        {props.data.store_name}
                        </h5>
                        <button
                          type="button"
                          onClick={() => {
                            setViewModal(false);
                          }}
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>
                        <b>Description</b>:  {props.data.description}<br/><br/>
                        <b>Address</b>:  {props.data.address}

                        </p>
                        
                        
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={() => {
                            showDetails()
                          }}
                          className="btn btn-secondary "
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        
                      </div>
                    </Modal>   
                
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </React.Fragment>
  )
}
export default WelcomeComp

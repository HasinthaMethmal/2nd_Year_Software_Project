import React, { useState } from 'react'
import axios from 'axios'
import { Row,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Modal,
    Card,
    CardBody,
    CardTitle,
    Label,
    Button,
    Form,
    Input,
    InputGroup,
    Col 
           } from 'reactstrap'

function RemoveCategory(props) {
  const [categoryId,setCategoryId] = useState()
  const [message,setMessage] = useState()
  const [error,setError] = useState()
// validate category id fields
  const validate = () =>{
    if (!categoryId){
      setError("please Enter a Category ID")
      return false
    // } else if(!Number.isInteger(categoryId)){
    //   setError("ID cannot Have Decimal values")
    //   return false

    }
    return true
  }

  const deleteCategory = (event) =>{
  event.preventDefault()
  if(!validate()){
    return;
  }
//send category id to backend
    axios.patch("http://localhost:5000/Admin/Deletecategory",{

    category_Id: categoryId ,
   

    }).catch((error) =>{
      setError(error.response.data.message);
      console.log(error)
    }).then((response) =>{
      setMessage(response.data.message)
      setError("")

    })
  }
  return (
    <div>
        <Card>
                <CardBody>
                  
                  <div>
                   
                    <Modal
                      isOpen
                      
                    >
                      <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myModalLabel">
                          Remove Category
                        </h5>
                        <button
                          type="button"
                          onClick={() =>{
                            props.onHide()
                            props.reload()
                          }}
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                      <Card>
                <CardBody>
                 
                  <Form>
                    
                    <Row className="mb-4">
                      <Label
                      className="col-sm-3 col-form-label"
                      >
                      Category Id
                      </Label>
                      <Col sm={9}>
                        <Input
                          
                          className="form-control"
                          id="horizontal-Input"
                          placeholder="Enter category Id"
                          onChange={(e) =>{
                          
                            setCategoryId(e.target.value)}}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <p style={{color:"blue"}}>{message}</p>
                      <p style={{color:"red"}}>{error}</p>
                    </Row>

                    <Row className="justify-content-end">
                      <Col sm={9}>
                        <div>
                          
                            
                          <Button
                            type="submit"
                            color="primary"
                            className="w-md"
                            onClick={deleteCategory}
                          >
                            Remove
                          </Button>

                        </div>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
              
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          onClick={() =>{
                            props.onHide()
                            props.reload()
                          }}
                          className="btn btn-secondary "
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        
                      </div>
                    </Modal>
                  </div>
                </CardBody>
              </Card>
    </div>
  )
}

export default RemoveCategory
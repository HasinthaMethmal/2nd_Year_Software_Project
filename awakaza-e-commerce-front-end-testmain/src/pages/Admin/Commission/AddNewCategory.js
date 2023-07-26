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

function AddNewCategory(props) {
  const [categoryName,setCategoryName] = useState()
  const [message,setMessage] = useState()
  const [error,setError] = useState()

  // category name field validation
  const validate = () =>{
    if (!categoryName){
      setError("please Enter a Category Name")
      return false
    } else if(categoryName.length>25){
      setError("Maximum Characters: 25")
      return false

    }
    return true
  }

  const addCategory = (e) =>{

    e.preventDefault()
    
    if(!validate()){
      return;
    }
    // send new category data to backend
    axios.post("http://localhost:5000/Admin/Addcategory",{

    category_name: categoryName ,
   

    }).catch((error) =>{
      setError(error.response.data.message);
      console.log(error)
    }).then((response) =>{
      setMessage(response.data.message)
      setError('')

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
                          Add New Category
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
                      Category Name
                      </Label>
                      <Col sm={9}>
                        <Input
                          
                          className="form-control"
                          id="horizontal-Input"
                          placeholder="Enter category name"
                          onChange={(e) =>{
                          
                            setCategoryName(e.target.value)}}
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
                            onClick={addCategory}
                          >
                            Add 
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
                          }
                          }
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

export default AddNewCategory
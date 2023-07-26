import axios from 'axios';
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
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

function UpdateCommission(props) {

  const [commissionRate,SetCommissionRate] =useState()
  const [message,setMessage] = useState()
  const [error, setError] = useState('');
//validate commission rate field
  const validateInput = () => {
    if (!commissionRate) {
      setError('Please enter a commission rate');
      return false;
      //  input value to be between 0-100
    } else if (commissionRate < 0 || commissionRate > 100) {
      setError('Commission rate must be between 0 and 100');
      return false;
    }else if(typeof commissionRate !== 'number' && isNaN(commissionRate)){
      setError('Commission rate should only contain numbers');
      return false;
    }
    return true;
  };

  const changeCommission = (e) =>{
    e.preventDefault()

    if (!validateInput()) return;
    // send updated commission rate to backend for an existing category
    axios.patch("http://localhost:5000/Admin/Updatecommission",{

      commision_rate: commissionRate/100,
      commission_id: props.data.commission_id

    }).catch((error) =>{
      setError(error.response.data.message);
      console.log(error)
    }).then((response) =>{
      setMessage(response.data.message)
      setError("")

    })
  }
  
  const addCommission = (e) =>{
    e.preventDefault()
    if (!validateInput()) return;
     // send  commission rate to backend for an new category
    axios.post("http://localhost:5000/Admin/Addcommission",{

    commission_rate: commissionRate/100,
    category_id: props.data.category_Id

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
      <Row>
      <Card>
                <CardBody>
                  <div>
                    <Modal
                      isOpen
                    >
                      <div className="modal-header">
                        <h5 className="modal-title mt-0" id="myModalLabel">
                          Update Commission
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
                  <CardTitle className="mb-4">Update Commisson</CardTitle>
                  <Form>
                    <Row className="mb-4">
                      <Label
                        // htmlFor="horizontal-firstname-Input"
                        className="col-sm-3 col-form-label"
                      >
                        Category
                      </Label>
                      <Col sm={9}>
                        <Label><h4>{props.data.category_name}</h4></Label>
                      </Col>
                    </Row>
                    <Row className="mb-4">
                      <Label
                      type= "number 0-100"
                        htmlFor="horizontal-email-Input"
                        className="col-sm-3 col-form-label"
                      >
                        Rate
                      </Label>
                      <Col sm={9}>
                        <Input
                          
                          className="form-control"
                          id="horizontal-Input"
                          placeholder="Enter New Commission Rate (0-100)"
                          onChange={(e) =>{
                          
                            SetCommissionRate(e.target.value)}}
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
                          {
                            props.data.commission_id ? <Button
                            type="submit"
                            color="primary"
                            className="w-md"
                            onClick={changeCommission}
                          >
                            update
                          </Button> : 
                          <Button
                            type="submit"
                            color="primary"
                            className="w-md"
                            onClick={addCommission}
                          >
                            Add 
                          </Button>

                          }
                          
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
      </Row>
    </div>
  )
}

export default UpdateCommission
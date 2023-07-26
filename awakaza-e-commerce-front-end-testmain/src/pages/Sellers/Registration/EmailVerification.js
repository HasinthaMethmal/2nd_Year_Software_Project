import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardBody, Col, Container, Row,Input } from "reactstrap"




const EmailVerification = (props) => {
  const[error,setError] = useState()
  const[message,setMessage] = useState()
  const[otp,setOtp] =useState()
  const[buttonView,setButtonView]= useState(true)
  const navigate = useNavigate()

  //meta title
  document.title="Email Verification | Awakaza E-commerce"
  useEffect(() =>{
    //send verification email 
    verifyMail();
   
  },[])

  const verifyMail = () =>{
    axios.post("http://localhost:5000/Seller/VerificationEmail",{
      email: props.email
    }).catch((error) =>{
      setError(error.response.data.message);
      console.log(error)
    }).then((res) =>{
      
      if(res.data.success ==1){
        setMessage(res.data.message)
        setError("")
      }
        
      

      

    })
  }

  //redirect to homepage
  const redrect = () =>{
    navigate("/seller/login")
  }
  

  const verificationMail= () =>{
    //send entered otp to backend for verification
    axios.post("http://localhost:5000/Seller/ConformEmail",{

      email: props.email,
      otp:otp

    }).then((res) =>{
      if(res.data.success ==0){
        setError(res.data.message)
      }else{
        setMessage(res.data.message)
        setError("")
        //hide verify button & reveal done button
        setButtonView(false)

      }

    })

  }

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row>
            <Col lg={12}>
              <div className="text-center mb-5 text-muted">
                
                <p className="mt-3">Email Verification</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card>
                <CardBody>
                  <div className="p-2">
                    <div className="text-center">
                      <div className="avatar-md mx-auto">
                        <div className="avatar-title rounded-circle bg-light">
                          <i className="bx bxs-envelope h1 mb-0 text-primary"></i>
                        </div>
                      </div>
                      <div className="p-2 mt-4">
                        <h4>Verify your email</h4>
                        <p>
                          sending verification email to verify Your Email{" "}
                          <span className="fw-semibold">
                            {props.email}
                          </span>
                          
                        </p>
                        <p>  Please Enter the OTP below</p>
                        <div>
                        <Input
                          
                          className="form-control"
                          id="horizontal-Input"
                          placeholder="Enter OTP here"
                          onChange={(e) =>{
                          
                            setOtp(e.target.value)}}
                        />
                        </div>

                        <div>
                          <p style={{color:"red"}}>{error}</p>
                          <p style={{color:"green"}}>{message}</p>
                        </div>
                        <div className="mt-4">
                          {
                          buttonView ?
                          <button 
                          onClick={verificationMail}
                          className="btn btn-success w-md">
                          Verify email
                          </button>:
                          <button 
                          onClick={redrect}
                          className="btn btn-success w-md">
                          Done
                          </button>
                        }
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Didn&apos;t receive an email ?{" "}
                  
                    {" "}
                    <p>Resend</p>{" "}
                  {" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Awakaza E-Commerce
                 
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}
export default EmailVerification

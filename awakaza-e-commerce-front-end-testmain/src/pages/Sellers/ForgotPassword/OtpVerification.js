import axios from "axios"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardBody, Col, Container, Row,Input } from "reactstrap"
import { success } from "toastr"
import Cookies from "universal-cookie"




const OtpVerification = (props) => {
  const[error,setError] = useState()
  const[message,setMessage] = useState()
  const[otp,setOtp] =useState()
  const[buttonView,setButtonView]= useState(true)
  const navigate = useNavigate()
  const cookie = new Cookies()
  

  //meta title
  document.title="Forgot Password | Verify email"
 

  //redirect to homepage
  const redirect = () =>{
    navigate("/seller/login")
  }
  

  const verificationMail= () =>{
    //send entered otp to backend for verification
    axios.post("http://localhost:5000/Seller/forgotpassword",{
      email: props.email,
      otp:otp

    }).catch((error) =>{
      if(error.response.data.success ==0){
        setError(error.response.data.message);
        
      }else if(error.response.data.success == 0.1){
        setError(error.response.data.message);
        setButtonView(false)
      }
      
      console.log(error)
    }).then((res) =>{
      console.log(res.data)
      if(res.data.success ==1){
        setMessage(res.data.message)
        setError("")
        cookie.set("resettoken",res.data.token)
        props.next();

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
                         verification email sent to verify Your Email{" "}
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
                          continue
                          </button>:

                          <button 
                          onClick={redirect}
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
                  <a href=""  className="fw-medium text-primary">
                    {" "}
                    Resend{" "}
                  </a>{" "}
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
export default OtpVerification;

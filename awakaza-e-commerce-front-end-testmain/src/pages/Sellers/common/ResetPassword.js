import React, { useEffect, useState } from "react";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Link,useNavigate } from "react-router-dom";

import { Row, Col, CardBody, Card, Container, Form, Label, Input, FormFeedback } from "reactstrap";
import axios from "axios";
import Cookies from "universal-cookie";



const SellerResetPassword = (props) => {

  //meta title
  document.title="Forgot Password | Reset your Password";

  const[error,setError] = useState()
  const[message,setMessage] = useState()
  const[buttonView,setButtonView]= useState(true)
  const navigate = useNavigate()
  const cookie = new Cookies();

  const redirect = () =>{
    navigate("/seller/login")
  }

  //form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
     
      password: '',
      conformPassword:''
    },
    validationSchema: Yup.object({
      password: Yup.string().min(8).max(20).required("Please Enter Your Password"),
      conformPassword: Yup.string().oneOf([Yup.ref("password"),null],"passwords do not match").required("Please Conform Your Password"),
    }),
    onSubmit: (values) => {
      console.log(values);
      console.log(cookie.get("resettoken"))
      axios.patch("http://localhost:5000/Seller/resetpassword",{
        password: values.password,
        email: props.email, 
      },{
        headers:{ 
          'authorization': `Bearer ${cookie.get("resettoken")}`
        }
      }).catch((error) =>{
        setError(error.response.data.message);
        console.log(error)
      }).then((res) =>{
        if(res.data.success === 1){
          setError("")
          setMessage(res.data.message)
          cookie.remove("resettoken")
          setButtonView(false)
        }
      })
    }
   
  });
  
  return (
    <React.Fragment>    
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <h5>{props.email}</h5>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Reset Password</h5>
                        <p>Enter your New Password </p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                     
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-light">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src=""
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                    <Link to="/" className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src=""
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    </Link>
                  </div>
                  </div>
                  <div className="p-2">
                    <Form className="form-horizontal"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="password"
                          type="password"
                          placeholder="Enter password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.password || ""}
                          invalid={
                            validation.touched.password && validation.errors.password ? true : false
                          }
                        />
                        {validation.touched.password && validation.errors.password ? (
                          <FormFeedback type="invalid">{validation.errors.password}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Conform Password</Label>
                        <Input
                          name="conformPassword"
                          type="password"
                          placeholder="Re-Enter password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.conformPassword || ""}
                          invalid={
                            validation.touched.conformPassword && validation.errors.conformPassword ? true : false
                          }
                        />
                        {validation.touched.conformPassword && validation.errors.conformPassword ? (
                          <FormFeedback type="invalid">{validation.errors.conformPassword}</FormFeedback>
                        ) : null}
                      </div>
                      <div>
                      <p style={{color:"red"}}>{error}</p>
                          <p style={{color:"green"}}>{message}</p>
                      </div>
                      <div className="mt-4 d-grid">
                      {
                          buttonView ?
                          <button 
                          type="submit"
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
                      
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  © {new Date().getFullYear()} Awakaza E-Commerce
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

    </React.Fragment>
  );
};

export default SellerResetPassword;

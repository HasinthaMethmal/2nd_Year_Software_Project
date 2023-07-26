import React,{useState} from "react";


// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Link } from "react-router-dom";

import { Row, Col, CardBody, Card, Container, Form, Label, Input, FormFeedback } from "reactstrap";
import axios from "axios";

const SellerReg = (props) => {

  const[error,setError] =useState()
 

  //meta title
  document.title="Register | Awakaza E-Commerce";

  //form validation
  const validation = useFormik({
    

    initialValues: {
      email: '',
      Firstname: '',
      Lastname: '',
      contact_no:'',
      password: '',
      conformPassword:''
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      Firstname: Yup.string().required("Please Enter Your First Name"),
      Lastname: Yup.string().required("Please Enter Your LastName"),
      contact_no: Yup.number(10,"value should be a Number").required("Please Enter Your Contact Number"),
      password: Yup.string().required('please enter your password').min(8).max(20)
      // .matches(/^(?=.*[A-Za-z0-9])(?=.*[@$!%*#?&])[A-Za-z0-9@$!%*#?&]{8,}$/,'please enter atleast one special character') 
      ,
      conformPassword: Yup.string().oneOf([Yup.ref("password"),null],"passwords do not match").required("Please Conform Your Password"),

    }),
    
    
    onSubmit: (values) => {
      props.email(values.email)
    // send seller data to backend to save on db
      axios.post("http://localhost:5000/Seller/Addseller",{
        first_name:values.Firstname,
        last_name: values.Lastname,
        password: values.password,
        contact_no:values.contact_no,
        email:values.email
      }).catch((error) =>{
        setError(error.response.data.message);
        console.log(error)
      }).then((response) =>{
        if(response.data.success==1){
          props.next()
        } 
          // To render create store
         
        
        

      })
    }
  });
  return (
    <React.Fragment>{     
      <div className="account-pages my-5 pt-sm-5">
        {
       
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Register as a Seller</h5>
                        <p>create your account now.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                  <div className="auth-logo">
                    
                    
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light">
                          <img
                            src="https://awakaza.com/wp-content/uploads/2022/11/awakaza-logo.png"
                            alt=""
                            className="rounded-circle"
                            height="34"
                          />
                        </span>
                      </div>
                    
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
                        <Label className="form-label">FirstName</Label>
                        <Input
                          name="Firstname"
                          type="text"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.Firstname || ""}
                          invalid={
                            validation.touched.Firstname && validation.errors.Firstname ? true : false
                          }
                        />
                        {validation.touched.Firstname && validation.errors.Firstname ? (
                          <FormFeedback type="invalid">{validation.errors.Firstname}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">LastName</Label>
                        <Input
                          name="Lastname"
                          type="text"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.Lastname || ""}
                          invalid={
                            validation.touched.Lastname && validation.errors.Lastname ? true : false
                          }
                        />
                        {validation.touched.Lastname && validation.errors.Lastname ? (
                          <FormFeedback type="invalid">{validation.errors.Lastname}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Contact Number</Label>
                        <Input
                          name="contact_no"
                          type="text"
                          placeholder="Enter contact Number"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.contact_no || ""}
                          invalid={
                            validation.touched.contact_no && validation.errors.contact_no ? true : false
                          }
                        />
                        {validation.touched.contact_no && validation.errors.contact_no ? (
                          <FormFeedback type="invalid">{validation.errors.contact_no}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.email || ""}
                          invalid={
                            validation.touched.email && validation.errors.email ? true : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                        ) : null}
                      </div>

                      
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
                      </div>

                      <div className="mt-4 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                          
                        >
                          Next
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <h5 className="font-size-14 mb-3">Sign up using</h5>

                        <ul className="list-inline">
                          <li className="list-inline-item">
                            <Link
                              to="#"
                              className="social-list-item bg-primary text-white border-primary"
                            >
                              <i className="mdi mdi-facebook" />
                            </Link>
                          </li>{" "}
                          <li className="list-inline-item">
                            <Link
                              to="#"
                              className="social-list-item bg-info text-white border-info"
                            >
                              <i className="mdi mdi-twitter" />
                            </Link>
                          </li>{" "}
                          <li className="list-inline-item">
                            <Link
                              to="#"
                              className="social-list-item bg-danger text-white border-danger"
                            >
                              <i className="mdi mdi-google" />
                            </Link>
                          </li>
                        </ul>
                      </div>

                      
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link
                    to="/seller/login"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} Awakaza E-Commerce
                
                </p>
              </div>
            </Col>
          </Row>
        </Container>
}
 
      </div>
}
    </React.Fragment>
  );
};

export default SellerReg;

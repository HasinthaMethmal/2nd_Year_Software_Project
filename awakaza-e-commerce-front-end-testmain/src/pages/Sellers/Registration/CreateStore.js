import React, { useEffect, useState } from "react";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Link } from "react-router-dom";

import { Row, Col, CardBody, Card, Container, Form, Label, Input, FormFeedback } from "reactstrap";
import axios, { Axios } from "axios";

// import images

const CreateStore = (props) => {
  const [data,setData] =useState({})
  const [error,setError] = useState()

   
  useEffect(() =>{
    //get relavent seller data from db
    console.log(props.email)
    axios.get("http://localhost:5000/Seller/Getseller",{
      params:{
        email:props.email
      }
    }).then((res)=>{
      setData(res.data.message)
       console.log(res.data)
    })
    
  },[])
  console.log(data.seller_id)

  //meta title
  document.title="Register | Awakaza E-Commerce";

  //form validation
  const validation = useFormik({
  
    // enableReinitialize: true,

    initialValues: {
      store_name: '',
      description: '',
      address: '',
    },
    validationSchema: Yup.object({
      store_name: Yup.string().required("Please Enter Your Store Name").max(30),
      description: Yup.string().required("Please Enter Your Store Description").max(300),
      address: Yup.string().required("Please Enter Your Password").max(150),
    }),
    onSubmit: (values) => {
      //send store data to backend
      axios.post("http://localhost:5000/Seller/Addstore",{

        store_name: values.store_name,
        seller_id: data.seller_id,
        description: values.description,
        address:values.address
      }).catch((error) =>{
        setError(error.response.data.message);
        console.log(error)
      }).then((response) =>{
        if(response.data.success==1){
          props.next()
        } 
          // to render create store
         
        
      })
    }
   
  });
  
  return (
    <React.Fragment>    
      <div className="account-pages my-5 pt-sm-5">
        {/* <h4>{props.email}</h4> */}
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Create Store</h5>
                        <p>Create your store here</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src='' alt="" className="img-fluid" />
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
                        <Label className="form-label">Store Name</Label>
                        <Input
                          id="store_name"
                          name="store_name"
                          className="form-control"
                          placeholder="Enter your Store Name"
                          type="text"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.store_name || ""}
                          invalid={
                            validation.touched.store_name && validation.errors.store_name ? true : false
                          }
                        />
                        {validation.touched.store_name && validation.errors.store_name ? (
                          <FormFeedback type="invalid">{validation.errors.store_name}</FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Description</Label>
                        <Input
                          name="description"
                          type="text"
                          placeholder="Enter Store description"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.description || ""}
                          invalid={
                            validation.touched.description && validation.errors.description ? true : false
                          }
                        />
                        {validation.touched.description && validation.errors.description ? (
                          <FormFeedback type="invalid">{validation.errors.description}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Address</Label>
                        <Input
                          name="address"
                          type="text"
                          placeholder="Enter Address"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.address || ""}
                          invalid={
                            validation.touched.address && validation.errors.address ? true : false
                          }
                        />
                        {validation.touched.address && validation.errors.address ? (
                          <FormFeedback type="invalid">{validation.errors.address}</FormFeedback>
                        ) : null}
                      </div>
                      <div><p>{error}</p></div>

                      <div className="mt-4 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Next
                        </button>
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
      </div>

    </React.Fragment>
  );
};

export default CreateStore;

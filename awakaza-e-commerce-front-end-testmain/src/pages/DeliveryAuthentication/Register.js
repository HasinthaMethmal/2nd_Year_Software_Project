import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToasts } from 'react-toast-notifications';
import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import profileImg from "../../assets/images/profile-img.png";
import awakazalogopng from "../../assets/images/awakaza-logo.png";

const Register = () => {
  document.title = "Register | Awakaza Delivery";
  const { addToast } = useToasts();
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      username: "",
      password: "",
      fullName: "",
      nic: "",
      address: "",
      mobile: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      password: Yup.string().required("Please Enter Your Password"),
      fullName: Yup.string().required("Please Enter Your Full Name"),
      nic: Yup.number().required("Please Enter Your NIC"),
      address: Yup.string().required("Please Enter Your Address"),
      mobile: Yup.string()
        .required("Please Enter Your Mobile Phone Number")
        .matches(/^\+?[0-9]{10}$/, "Please enter a valid mobile phone number"),
    }),

    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/delivery_users", values)
        .then((response) => {
          console.log(response);
          addToast("Registration successful.", { appearance: 'success' });
        })
        .catch((error) => {
          console.error(error);
          if (error.response && error.response.data.error === "Duplicate email or username") {
            addToast("Email or Username already exists. Please use a different one.", { appearance: 'error' });
          } else {
            addToast("Registration failed. Please try again later.", { appearance: 'error' });
          }
        });
    }
  });

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={8} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Register</h5>
                        <p>Free Awakaza Delivery Account</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profileImg} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <div className="auth-logo">
                      <Link to="/" className="auth-logo-dark">
                        <div className="avatar-md profile-user-wid mb-4">
                          <span className="avatar-title rounded-circle bg-light">
                            <img
                              src={awakazalogopng}
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
                        <Label className="form-label">Username</Label>
                        <Input
                          name="username"
                          type="text"
                          placeholder="Enter username"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.username || ""}
                          invalid={
                            validation.touched.username && validation.errors.username ? true : false
                          }
                        />
                        {validation.touched.username && validation.errors.username ? (
                          <FormFeedback type="invalid">{validation.errors.username}</FormFeedback>
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
                        <Label className="form-label">Full Name</Label>
                        <Input
                          name="fullName"
                          type="text"
                          placeholder="Enter full name"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.fullName || ""}
                          invalid={validation.touched.fullName && validation.errors.fullName ? true : false}
                          onKeyPress={(event) => {
                            if (!/[a-zA-Z\s]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                        />
                        {validation.touched.fullName && validation.errors.fullName ? (
                          <FormFeedback type="invalid">{validation.errors.fullName}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">NIC</Label>
                        <Input
                          name="nic"
                          type="number"
                          placeholder="Enter NIC"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.nic || ""}
                          invalid={
                            validation.touched.nic && validation.errors.nic ? true : false
                          }
                        />
                        {validation.touched.nic && validation.errors.nic ? (
                          <FormFeedback type="invalid">{validation.errors.nic}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Address</Label>
                        <Input
                          name="address"
                          type="text"
                          placeholder="Enter address"
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
                      <div className="mb-3">
                        <Label className="form-label">Mobile Phone Number</Label>
                        <Input
                          name="mobile"
                          type="tel"
                          placeholder="Enter mobile phone number"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.mobile || ""}
                          invalid={validation.touched.mobile && validation.errors.mobile ? true : false}
                          pattern="[0-9]{10}"
                          onKeyPress={(event) => {
                            if (!/[0-9+]/.test(event.key)) {
                              event.preventDefault();
                            }
                            if (event.target.value.length >= 10) {
                              event.preventDefault();
                            }
                          }}
                        />
                        {validation.touched.mobile && validation.errors.mobile ? (
                          <FormFeedback type="invalid">{validation.errors.mobile}</FormFeedback>
                        ) : null}
                      </div>
                      <div className="mt-4 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Register
                        </button>
                      </div>
                      <div className="mt-4 text-center">
                        <p className="mb-0">
                          By registering you agree to the Awakaza{" "}
                          <Link to="#" className="text-primary">
                            Terms of Use
                          </Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Already have an account ?{" "}
                  <Link
                    to="/login"
                    className="fw-medium text-primary"
                  >
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()}  All Rights Reserved |  Developed by <a href="https://circlebook.site" target="_blank" rel="noopener noreferrer">Circlebook</a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Register;
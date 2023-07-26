import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

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
  Button,
} from "reactstrap";

import profileImg from "../../../assets/images/profile-img.png";
import awakazalogopng from "../../../assets/images/awakaza-logo.png";

const AdminRegister = () => {
  document.title = "Register";
  const { addToast } = useToasts();

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      username: "",
      passwordn: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      username: Yup.string().required("Please Enter Your Username"),
      passwordn: Yup.string().required("Please Enter Your Password"),
    }),

    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/user/register", values)
        .then((response) => {
          console.log(response);
          addToast("Registration successful.", { appearance: "success" });
        })
        .catch((error) => {
          console.error(error);
          if (
            error.response &&
            error.response.data.error === "Duplicate email or username"
          ) {
            addToast(
              "Email or Username already exists. Please use a different one.",
              { appearance: "error" }
            );
          } else {
            addToast("Registration failed. Please try again later.", {
              appearance: "error",
            });
          }
        });
    },
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
                        <p>Free Awakaza Account</p>
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
                              width="120"
                            />
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="p-2">
                    <Form
                      className="form-horizontal"
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
                            validation.touched.email && validation.errors.email
                              ? true
                              : false
                          }
                        />
                        {validation.touched.email && validation.errors.email ? (
                          <FormFeedback type="invalid">
                            {validation.errors.email}
                          </FormFeedback>
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
                            validation.touched.username &&
                            validation.errors.username
                              ? true
                              : false
                          }
                        />
                        {validation.touched.username &&
                        validation.errors.username ? (
                          <FormFeedback type="invalid">
                            {validation.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>
                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <Input
                          name="passwordn"
                          type="password"
                          placeholder="Enter password"
                          onChange={validation.handleChange}
                          onBlur={validation.handleBlur}
                          value={validation.values.passwordn || ""}
                          invalid={
                            validation.touched.passwordn &&
                            validation.errors.passwordn
                              ? true
                              : false
                          }
                        />
                        {validation.touched.passwordn &&
                        validation.errors.passwordn ? (
                          <FormFeedback type="invalid">
                            {validation.errors.passwordn}
                          </FormFeedback>
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
                  <Link to="/admin/login" className="fw-medium text-primary">
                    {" "}
                    Login
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} All Rights Reserved | Developed
                  by{" "}
                  <a
                    href="https://github.com/DinushaGihan"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dinusha
                  </a>
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AdminRegister;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

// Redux
import { Link } from "react-router-dom";

import {
  Row,
  Col,
  CardBody,
  Card,
  Container,
  Form,
  Input,
  Label,
  FormFeedback,
} from "reactstrap";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// import images
import profile from "../../../assets/images/profile-img.png";
import awakazalogopng from "../../../assets/images/awakaza-logo.png";

const AdminLogin = () => {
  document.title = "Login";
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // Form validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      username: "",
      passwordn: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Please Enter Your username"),
      passwordn: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/user/newlogin", values)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", values.username);
          localStorage.setItem("authUser", true); // set authUser item to true
          // addToast("Login successful !", { appearance: 'success' });
          navigate("/admin/dashboard");
        })
        .catch((error) => {
          console.error(error);
          addToast("Username or password Incorrect !", { appearance: "error" });
        });
    },
  });

  return (
    <React.Fragment>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col className="col-7">
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to Awakaza </p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div className="auth-logo">
                    <Link to="/" className="auth-logo-dark">
                      <div className="avatar-md profile-user-wid mb-4">
                        <span className="avatar-title rounded-circle bg-light ">
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
                        <Label className="form-label">Username</Label>
                        <Input
                          name="username"
                          className="form-control"
                          placeholder="Enter username"
                          type="text"
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
                          <FormFeedback type="invalid"> r3
                            {validation.errors.username}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="mb-3">
                        <Label className="form-label">Password</Label>
                        <div className="input-group auth-pass-inputgroup">
                          <Input
                            name="passwordn"
                            value={validation.values.passwordn || ""}
                            type={show?"text":"password" }
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            invalid={
                              validation.touched.passwordn &&
                              validation.errors.passwordn
                                ? true
                                : false
                            }
                          />
                          <button
                            onClick={() => setShow(!show)}
                            className="btn btn-light "
                            type="button"
                            id="password-addon"
                          >
                            <i className="mdi mdi-eye-outline"></i>
                          </button>
                        </div>
                        {validation.touched.passwordn &&
                        validation.errors.passwordn ? (
                          <FormFeedback type="invalid">
                            {validation.errors.passwordn}
                          </FormFeedback>
                        ) : null}
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3 d-grid">
                        <button
                          className="btn btn-primary btn-block "
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      <div className="mt-4 text-center">
                        <Link to="/Forgotpw" className="text-muted">
                          <i className="mdi mdi-lock me-1" /> Forgot your
                          password ?
                        </Link>
                      </div>
                    </Form>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Don&apos;t have an account ?{" "}
                  <Link to="/register" className="fw-medium text-primary">
                    {" "}
                    Signup now{" "}
                  </Link>{" "}
                </p>
                <p>
                  © {new Date().getFullYear()} All Rights Reserved | Developed
                  by {" "}
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

export default AdminLogin;
import React, { useEffect } from "react";
import { Row, Col, CardBody, Card, Alert, Container, Input, Label, Form, FormFeedback, Button } from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// action
import {
  registerUser,
  registerUserFailed,
  resetRegisterFlag
} from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useHistory } from "react-router-dom";


import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import Logo from "../../Components/Common/Logo";

const Register = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email_user: '',
            userName_user: '',
            password_user: '',
        },
        validationSchema: Yup.object({
            email_user: Yup.string().required("Please Enter Your Email"),
            userName_user: Yup.string().required("Please Enter Your Username"),
            password_user: Yup.string().required("Please Enter Your Password"),
            confirm_password_user: Yup.string().when("password_user", {
                is: val => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref("password_user")],
                    "Confirm Password Isn't Match"
                )
            })
        }),
        onSubmit: (values) => {
            dispatch(registerUser(values));
        }
    });

    const { error, registrationError, success } = useSelector(state => ({
      registrationError: state.Account.registrationError,
      success: state.Account.success,
      error: state.Account.error
    }));


    useEffect(() => {
      dispatch(registerUserFailed(""));
    }, [dispatch]);


    useEffect(() => {
      if (success) {
        setTimeout(() => history.push("login"), 3000);
      }

      setTimeout(() => {
        dispatch(resetRegisterFlag());
      }, 3000);

    }, [dispatch, success, error, history]);


    document.title = `Sign Up | ${process.env.REACT_APP_TITLE_PAGE}`;

    return (
      <React.Fragment>
        <ParticlesAuth>
          <div className="auth-page-content">
            <Container>
              <Logo />
              <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                  <Card className="mt-4">
                    <CardBody className="p-4">
                      <div className="text-center mt-2">
                        <h5 className="text-primary">Crear Nueva Cuenta</h5>
                        <p className="text-muted">Obtenga su usuario</p>
                      </div>
                      <div className="p-2 mt-4">
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                          className="needs-validation"
                          action="#"
                        >
                          {success && success ? (
                            <>
                              {toast("Serás redirigido a la página de Login...", {
                                position: "top-right",
                                hideProgressBar: false,
                                className: "bg-success text-white",
                                progress: undefined,
                                toastId: ""
                              })}
                              <ToastContainer autoClose={2000} limit={1} />
                              <Alert color="success">
                                Cuenta Creada Satisfactoriamente, serás redirigido a la página de Login...
                              </Alert>
                            </>
                          ) : null}

                          {error && registrationError ? (
                            <Alert color="danger">
                              <div>{registrationError}</div>
                            </Alert>
                          ) : null}

                          <div className="mb-3">
                            <Label htmlFor="useremail" className="form-label">
                              Email <span className="text-danger">*</span>
                            </Label>
                            <Input
                              id="email"
                              name="email_user"
                              className="form-control"
                              placeholder="Enter email address"
                              type="email"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email_user || ""}
                              invalid={
                                validation.touched.email_user &&
                                validation.errors.email_user
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email_user &&
                            validation.errors.email_user ? (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.email_user}</div>
                              </FormFeedback>
                            ) : null}
                          </div>
                          <div className="mb-3">
                            <Label htmlFor="username" className="form-label">
                              Username <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="userName_user"
                              type="text"
                              placeholder="Enter username"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.userName_user || ""}
                              invalid={
                                validation.touched.userName_user &&
                                validation.errors.userName_user
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.userName_user &&
                            validation.errors.userName_user ? (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.userName_user}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Label
                              htmlFor="userpassword"
                              className="form-label"
                            >
                              Password <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="password_user"
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.password_user || ""}
                              invalid={
                                validation.touched.password_user &&
                                validation.errors.password_user
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.password_user &&
                            validation.errors.password_user ? (
                              <FormFeedback type="invalid">
                                <div>{validation.errors.password_user}</div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          <div className="mb-2">
                            <Label
                              htmlFor="confirmPassword"
                              className="form-label"
                            >
                              Confirm Password{" "}
                              <span className="text-danger">*</span>
                            </Label>
                            <Input
                              name="confirm_password_user"
                              type="password"
                              placeholder="Confirm Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={
                                validation.values.confirm_password_user || ""
                              }
                              invalid={
                                validation.touched.confirm_password_user &&
                                validation.errors.confirm_password_user
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.confirm_password_user &&
                            validation.errors.confirm_password_user ? (
                              <FormFeedback type="invalid">
                                <div>
                                  {validation.errors.confirm_password_user}
                                </div>
                              </FormFeedback>
                            ) : null}
                          </div>

                          {/* <div className="mb-4">
                            <p className="mb-0 fs-12 text-muted fst-italic">
                              Pronto su usuario será activado por ADWISE.
                              <Link
                                to="#"
                                className="text-primary text-decoration-underline fst-normal fw-medium"
                              >
                                {" "}
                                Terminos y condiciones
                              </Link>
                            </p>
                          </div> */}

                          <div className="mt-4">
                            <button
                              className="btn btn-success w-100"
                              type="submit"
                            >
                              Sign Up
                            </button>
                          </div>
                        </Form>
                      </div>
                    </CardBody>
                  </Card>
                  <div className="mt-4 text-center">
                    <p className="mb-0">
                      Ya tengo una Cuenta{" "}
                      <Link
                        to="/login"
                        className="fw-semibold text-primary text-decoration-underline"
                      >
                        {" "}
                        Login{" "}
                      </Link>{" "}
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </ParticlesAuth>
      </React.Fragment>
    );
};

export default Register;

import React from "react";
import * as Yup from "yup";
import { Card, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import SubmitButton from "../SubmitButton";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const RegistrationForm = (props) => {
  const { t } = useTranslation();

  const containerVariants = {
    hidden: { opacity: 0, x: "-100vw" },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2, duration: 0.5 },
    },
  };

  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        userName: Yup.string()
          .min(3, t("validation:atLeast", { number: 3 }))
          .max(15, t("validation:lessThan", { number: 15 }))
          .required(t("validation:required")),
        email: Yup.string()
          .email(t("validation:invalidEmail"))
          .required(t("validation:required")),
        password: Yup.string()
          .min(5, t("validation:atLeast", { number: 5 }))
          .max(15, t("validation:lessThan", { number: 15 }))
          .required(t("validation:required")),
      })}
      onSubmit={props.onSubmit}
    >
      {(formik) => (
        <Col  sm={10} md={8} lg={6}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="roundedBorder mt-4  boxShadow bg-warning p-3">
              <Card.Header className="fs-4 rounded-pill m-2 bg-white  text-center  text-dark">
                {t("registrationForm")} ✍️
              </Card.Header>
              <motion.div
                className="m-2 p-4 bg-white border rounded-3"
                variants={itemVariants}
              >
                <Form onSubmit={formik.handleSubmit}>
                  <Form.Group className="mb-3" controlId="userName">
                    <Form.Label>{t("userName")} 👤</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={t("enterUserName")}
                      name="userName"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.userName}
                      disabled={props.isSubmitted}
                      isValid={
                        formik.touched.userName &&
                        !formik.errors.userName &&
                        formik.values.userName
                      }
                      isInvalid={
                        (formik.touched.userName && formik.errors.userName) ||
                        formik.errors.register
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.userName}
                    </Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.register}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>{t("email")} 📧</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t("enterEmail")}
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      disabled={props.isSubmitted}
                      isValid={
                        formik.touched.email &&
                        !formik.errors.email &&
                        formik.values.email
                      }
                      isInvalid={formik.touched.email && formik.errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>{t("password")} 🔒</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder={t("password")}
                      name="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      disabled={props.isSubmitted}
                      isValid={
                        formik.touched.password &&
                        !formik.errors.password &&
                        formik.values.password
                      }
                      isInvalid={formik.touched.password && formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <SubmitButton isSubmitted={props.isSubmitted}
                    isSubmitting={formik.isSubmitting}
                    name={t("register")}
                  />
                </Form>
              </motion.div>
            </Card>
          </motion.div>
        </Col>
      )}
    </Formik>
  );
};

export default RegistrationForm;

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { loginSuccess } from "./authSlice";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const user = await login(values);
        dispatch(loginSuccess(user));
        navigate("/home");
      } catch (error) {
        setError(error.message);
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="container" style={{ width: "340px", marginTop: "30vh" }}>
      <h3 className="text-center">SSO Login</h3>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Enter username"
            {...formik.getFieldProps("username")}
            isInvalid={formik.touched.username && formik.errors.username}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            {...formik.getFieldProps("password")}
            isInvalid={formik.touched.password && formik.errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        {error && <div className="text-danger mb-3">{error}</div>}

        <div className="d-grid gap-2 mt-4">
          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;

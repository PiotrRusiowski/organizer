import React from "react";
import RegisterForm from "../components/RegisterForm";
import { routes } from "../routes";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <>
      <h1>Register</h1>
      <RegisterForm />
      <p>
        You already have account? Go to <br />
        <Link to={routes.login}>login page</Link>
      </p>
    </>
  );
};

export default RegisterPage;

import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/startForm/LoginForm";
import { routes } from "../routes";

const LoginPage = () => {
  return (
    <>
      <h1>Login</h1>
      <LoginForm />
      <p>
        You don't have account? Go to <br />
        <Link to={routes.register}>register page</Link>
      </p>
    </>
  );
};

export default LoginPage;

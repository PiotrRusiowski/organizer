import React from "react";
import { Switch, Route } from "react-router-dom";
import { routes } from "../routes";
import LoginPage from "../views/LoginPage";
import RegisterPage from "../views/RegisterPage";

const UnloggedUserTemplate = () => {
  return (
    <>
      <Switch>
        <Route exact path={routes.login} component={LoginPage} />
        <Route path={routes.register} component={RegisterPage} />
      </Switch>
    </>
  );
};

export default UnloggedUserTemplate;

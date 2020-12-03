import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../views/Home";
import { routes } from "../routes";
import Tasks from "../views/Tasks";
import Events from "../views/Events";
import Calendar from "../views/Calendar";

const MainTemplate = () => {
  return (
    <>
      <Dashboard>
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route path={routes.tasks} component={Tasks} />
          <Route path={routes.events} component={Events} />
          <Route path={routes.calendar} component={Calendar} />
        </Switch>
      </Dashboard>
    </>
  );
};

export default MainTemplate;

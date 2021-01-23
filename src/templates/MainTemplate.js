import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../views/Home";
import { routes } from "../routes";
import Tasks from "../views/Tasks";
import Calendar from "../views/Calendar";
import WalletsHistory from "../components/budgetComponents/WalletsHistory/WalletsHistory";
import CreateNewBudgets from "../views/CreateNewBudgets";

const MainTemplate = () => {
  return (
    <>
      <Dashboard>
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route path={routes.tasks} component={Tasks} />
          <Route path={routes.createNewBudgets} component={CreateNewBudgets} />
          <Route path={routes.calendar} component={Calendar} />
          <Route path={routes.walletsHistory} component={WalletsHistory} />
        </Switch>
      </Dashboard>
    </>
  );
};

export default MainTemplate;

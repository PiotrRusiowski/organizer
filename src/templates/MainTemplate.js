import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../views/Home";
import { routes } from "../routes";
import Tasks from "../views/Tasks";
import Note from "../views/Note";
import CreateNewBudgets from "../views/CreateNewBudgets";
import WalletsHistoryView from "../views/WalletsHistoryView";

const MainTemplate = () => {
  return (
    <>
      <Dashboard>
        <Switch>
          <Route exact path={routes.home} component={Home} />
          <Route path={routes.tasks} component={Tasks} />
          <Route path={routes.createNewBudgets} component={CreateNewBudgets} />
          <Route path={routes.note} component={Note} />
          <Route path={routes.walletsHistory} component={WalletsHistoryView} />
        </Switch>
      </Dashboard>
    </>
  );
};

export default MainTemplate;

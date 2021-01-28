import React from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard/Dashboard";
import Home from "../views/Home";
import { routes } from "../routes";
import Tasks from "../views/Tasks";
import Note from "../views/Note";
import CreateNewBudgets from "../views/CreateNewBudgets";
import WalletsHistoryView from "../views/WalletsHistoryView";
import styled from "styled-components";
import SingleNote from "../components/notesComponents/SingleNote";

const MainTemplate = () => {
  const StyledContainer = styled.div`
    height: 90vh;
    display: flex;
    margin: 10vh 5vh;
  `;
  return (
    <>
      <Dashboard>
        <Switch>
          <StyledContainer>
            <Route exact path={routes.home} component={Home} />
            <Route path={routes.tasks} component={Tasks} />
            <Route
              path={routes.createNewBudgets}
              component={CreateNewBudgets}
            />
            <Route exact path={routes.note} component={Note} />
            <Route path={routes.singleNote} component={SingleNote} />
            <Route
              path={routes.walletsHistory}
              component={WalletsHistoryView}
            />
          </StyledContainer>
        </Switch>
      </Dashboard>
    </>
  );
};

export default MainTemplate;

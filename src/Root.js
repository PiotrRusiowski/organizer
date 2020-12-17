import React, { useEffect } from "react";
import MainTemplate from "./templates/MainTemplate";
import UnloggedUserTemplate from "./templates/UnloggedUserTemplate";
import { connect } from "react-redux";
import { setCurrentUser as setCurrentUserAction } from "./actions";
import { auth } from "./fireBaseConfig";

const Root = ({ currentUser, setCurrentUser, tasksList }) => {
  const checkIfUserIsLogged = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        localStorage.setItem("currentUser", user.uid);
        console.log(currentUser);
      } else {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
        console.log(currentUser);
      }
    });
  };

  const setTasksListToLocalStorage = () => {
    localStorage.setItem("tasksList", JSON.stringify(tasksList));
  };

  useEffect(() => {
    setTasksListToLocalStorage();
  }, [tasksList]);

  useEffect(() => {
    checkIfUserIsLogged();
  }, [currentUser]); //dodawanie do local storage, onAuthStateChanged kiedy się wywołuje?

  return <>{currentUser ? <MainTemplate /> : <UnloggedUserTemplate />}</>;
};

const mapStateToProps = (state) => ({
  currentUser: state.currentUser,
  tasksList: state.tasksList,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

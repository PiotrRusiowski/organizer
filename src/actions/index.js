import { actionTypes } from "./actionTypes";

export const setUserEmail = (email) => {
  return {
    type: actionTypes.setUserEmail,
    payload: email,
  };
};
export const setUserPassword = (password) => {
  return {
    type: actionTypes.setUserPassword,
    payload: password,
  };
};

export const setCurrentUser = (user) => {
  return {
    type: actionTypes.setCurrentUser,
    payload: user,
  };
};
export const addNewTask = (newTask) => {
  return {
    type: actionTypes.addNewTask,
    payload: newTask,
  };
};
export const deleteTasks = (taskIds) => {
  return {
    type: actionTypes.deleteTasks,
    payload: taskIds,
  };
};
export const setDeleteAlertOpen = () => {
  return {
    type: actionTypes.setDeleteAlertOpen,
    payload: true,
  };
};
export const setDeleteAlertClose = () => {
  return {
    type: actionTypes.setDeleteAlertClose,
    payload: false,
  };
};
export const deleteSingleTask = (id) => {
  return {
    type: actionTypes.deleteSingleTask,
    payload: id,
  };
};
export const editTask = (id) => {
  return {
    type: actionTypes.editTask,
    payload: id,
  };
};
export const saveTask = (todo) => {
  return {
    type: actionTypes.saveTask,
    payload: { ...todo },
  };
};
export const setEditTaskName = (value) => {
  return {
    type: actionTypes.setEditTaskName,
    payload: value,
  };
};

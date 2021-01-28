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
export const setDeleteAlertOpen = (id) => {
  return {
    type: actionTypes.setDeleteAlertOpen,
    payload: {
      isOpen: true,
      selectedWalletTaskId: id,
    },
  };
};
export const setDeleteAlertClose = () => {
  return {
    type: actionTypes.setDeleteAlertClose,
    payload: false,
  };
};
export const deleteSingleTask = () => {
  return {
    type: actionTypes.deleteSingleTask,
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

export const sortTasksByDate = (sortedTasks) => {
  return {
    type: actionTypes.sortTasksByDate,
    payload: sortedTasks,
  };
};
export const sortTasksByName = (sortedTasks) => {
  return {
    type: actionTypes.sortTasksByName,
    payload: sortedTasks,
  };
};
export const sortTasksByPiority = (sortedTasks) => {
  return {
    type: actionTypes.sortTasksByPiority,
    payload: sortedTasks,
  };
};
export const openBudgetModalAndSelectWallet = (walletId) => {
  return {
    type: actionTypes.openBudgetModalAndSelectWallet,
    payload: walletId,
  };
};
export const closeBudgetModal = () => {
  return {
    type: actionTypes.closeBudgetModal,
  };
};

export const setBudgetOperation = (budgetOperation) => {
  return {
    type: actionTypes.setBudgetOperation,
    payload: budgetOperation,
  };
};
export const addNewBudget = (IcomesOutcomes, id) => {
  return {
    type: actionTypes.addNewBudget,
    payload: { IcomesOutcomes, id },
  };
};
export const addNewWallet = (newWallet) => {
  return {
    type: actionTypes.addWallet,
    payload: newWallet,
  };
};
export const deleteSingleWallet = () => {
  return {
    type: actionTypes.deleteSingleWallet,
  };
};

export const setWalletCollapsed = (walletId) => {
  return {
    type: actionTypes.setWalletCollapsed,
    payload: walletId,
  };
};
export const deleteIncome = (id, incomeValue) => {
  return {
    type: actionTypes.deleteIncome,
    payload: { id, incomeValue },
  };
};
export const setSelectedWallet = (id) => {
  return {
    type: actionTypes.setSelectedWallet,
    payload: id,
  };
};
export const openWalletModal = () => {
  return {
    type: actionTypes.openWalletModal,
    payload: true,
  };
};

export const setMonthlyIncome = (singleIncome) => {
  return {
    type: actionTypes.setMonthlyIncome,
    payload: singleIncome,
  };
};
export const deleteOutcome = (id, outcomeValue) => {
  return {
    type: actionTypes.deleteOutcome,
    payload: { id, outcomeValue },
  };
};
export const addWalletBalnaceToTotal = () => {
  return {
    type: actionTypes.addWalletBalnaceToTotal,
  };
};
export const sentToHistory = (id) => {
  return {
    type: actionTypes.sentToHistory,
    payload: id,
  };
};
export const addNote = (note) => {
  return {
    type: actionTypes.addNote,
    payload: note,
  };
};
export const setSelectedArchiveWallet = (id) => {
  return {
    type: actionTypes.setSelectedArchiveWallet,
    payload: id,
  };
};
export const deleteArchiveWallet = (id) => {
  return {
    type: actionTypes.deleteArchiveWallet,
    payload: id,
  };
};
export const returnToBudget = (id) => {
  return {
    type: actionTypes.returnToBudget,
    payload: id,
  };
};
export const editNoteTitle = (newTitle) => {
  return {
    type: actionTypes.editNoteTitle,
    payload: newTitle,
  };
};
export const selectNote = (id) => {
  return {
    type: actionTypes.selectNote,
    payload: id,
  };
};

import { actionTypes } from "../actions/actionTypes";

const getTasksListFromLocalStorage = () => {
  let tasksListLocalStorage;

  if (localStorage.getItem("tasksList")) {
    tasksListLocalStorage = JSON.parse(localStorage.getItem("tasksList"));
  } else {
    tasksListLocalStorage = [];
  }

  return tasksListLocalStorage;
};

const initialState = {
  isBudgetModalOpen: false,
  userEmail: "",
  userPassword: "",
  isUserAccountCreated: false,
  currentUser: null,

  editedTaskName: "",

  tasksList: getTasksListFromLocalStorage(),
  wallets: [
    {
      walletId: 1,
      walletName: "food",
      walletBalance: 1000,
      outcomes: 0,
      incomes: 0,
    },

    {
      walletId: 2,
      walletName: "house",
      walletBalance: 2000,
      outcomes: 0,
      incomes: 0,
    },
  ],
  selectedWallet: null,
  isDeleteAlertOpen: false,
};
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.setUserEmail:
      return {
        ...state,
        userEmail: payload,
      };
    case actionTypes.setUserPassword:
      return {
        ...state,
        userPassword: payload,
      };

    case actionTypes.setCurrentUser:
      return {
        ...state,
        currentUser: payload,
      };
    case actionTypes.addNewTask:
      return {
        ...state,
        tasksList: [...state.tasksList, payload],
      };

    case actionTypes.deleteTasks:
      const filteredTasks = state.tasksList.filter((task) => {
        return !payload.includes(task.id);
      });
      console.log(payload);
      return {
        ...state,
        tasksList: [...filteredTasks],
      };
    case actionTypes.setDeleteAlertClose:
      return {
        ...state,
        isDeleteAlertOpen: payload,
      };
    case actionTypes.setDeleteAlertOpen:
      return {
        ...state,
        isDeleteAlertOpen: payload,
      };
    case actionTypes.deleteSingleTask:
      const filteredTasksList = state.tasksList.filter(
        (task) => task.id !== payload
      );
      return {
        ...state,
        tasksList: [...filteredTasksList],
      };
    case actionTypes.editTask:
      const mappedTasksList = state.tasksList.map((task) => {
        if (payload === task.id) {
          task.isEditing = true;
        }
        return task;
      });
      return {
        ...state,
        tasksList: [...mappedTasksList],
      };

    case actionTypes.saveTask:
      const editedTaskNameArray = state.tasksList.map((task) => {
        if (payload.id === task.id) {
          return payload;
        }
        return task;
      });
      return {
        ...state,
        tasksList: [...editedTaskNameArray],
      };

    case actionTypes.sortTasksByDate:
      return {
        ...state,
        tasksList: [...payload],
      };
    case actionTypes.sortTasksByName:
      return {
        ...state,
        tasksList: [...payload],
      };

    case actionTypes.sortTasksByPiority:
      return {
        ...state,
        tasksList: [...payload],
      };
    case actionTypes.openBudgetModalAndSelectWallet:
      const findetWallet = state.wallets.find(
        (wallet) => payload === wallet.walletId
      );
      return {
        ...state,
        isBudgetModalOpen: true,
        selectedWallet: findetWallet,
      };
    case actionTypes.closeBudgetModal:
      return {
        ...state,
        isBudgetModalOpen: false,
      };
    default:
      return state;
  }
};
export default reducer;

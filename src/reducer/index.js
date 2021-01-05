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
  selectedBugdetOperation: null,
  userEmail: "",
  userPassword: "",
  isUserAccountCreated: false,
  currentUser: null,
  selectedWallet: "",
  isDeleteAlertOpen: false,
  editedTaskName: "",
  tasksList: getTasksListFromLocalStorage(),
  // selectedWalletId: "",
  // selectedTaskId: "",
  selectedWalletTaskId: "",

  walletsList: [
    {
      walletId: 1,
      walletName: "food",
      walletBalance: 1000,
      outcomes: 0,
      incomes: 0,
      incomesList: [],
      outcomesList: [],
    },

    {
      walletId: 2,
      walletName: "house",
      walletBalance: 2000,
      outcomes: 0,
      incomes: 0,
      incomesList: [],
      outcomesList: [],
    },
  ],
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
      console.log(payload);
      return {
        ...state,
        isDeleteAlertOpen: payload.isOpen,
        selectedWalletTaskId: payload.selectedWalletTaskId,
      };
    case actionTypes.deleteSingleTask:
      const filteredTasksList = state.tasksList.filter(
        (task) => task.id !== state.selectedWalletTaskId
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
      const findetWallet = state.walletsList.find(
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

    case actionTypes.setBudgetOperation:
      return {
        ...state,
        selectedBugdetOperation: payload,
      };

    case actionTypes.addNewBudget:
      const mappedWallets = state.walletsList.map((wallet) => {
        console.log();
        if (wallet.walletId === payload.id) {
          if (state.selectedBugdetOperation === "incomes") {
            wallet.walletBalance =
              wallet.walletBalance + payload.IcomesOutcomes.value;
            wallet.incomes = payload.IcomesOutcomes.value;
            wallet.incomesList = [
              ...wallet.incomesList,
              payload.IcomesOutcomes,
            ];
          } else if (state.selectedBugdetOperation === "outcomes") {
            wallet.walletBalance =
              wallet.walletBalance - payload.IcomesOutcomes.value;
            wallet.outcomes = payload.IcomesOutcomes.value;
            wallet.outcomesList = [
              ...wallet.outcomesList,
              payload.IcomesOutcomes,
            ];
          }
        }
        return wallet;
      });

      return {
        ...state,
        walletsList: [...mappedWallets],
        selectedBugdetOperation: null,
      };

    case actionTypes.addWallet:
      return {
        ...state,
        walletsList: [...state.walletsList, payload],
      };

    default:
      return state;
    case actionTypes.deleteSingleWallet:
      const filteredWalletsList = state.walletsList.filter(
        (wallet) => state.selectedWalletTaskId !== wallet.walletId

        //payload.id!==wallet.walletId
      );

      return {
        ...state,
        walletsList: [...filteredWalletsList],
      };
  }
};
export default reducer;

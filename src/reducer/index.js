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
  selectedBugdetOperation: "",
  userEmail: "",
  userPassword: "",
  isUserAccountCreated: false,
  currentUser: null,
  isDeleteAlertOpen: false,
  editedTaskName: "",
  tasksList: getTasksListFromLocalStorage(),
  selectedWalletTaskId: "",
  totalBalance: 0,
  monthlyIncome: 0,
  selectedWallet: "",
  doneWallets: [],
  monthlyIncomesList: [],
  archiveWallets: [],
  selectedHistoryWallet: "",

  walletsList: [
    {
      walletId: 1,
      walletName: "food",
      walletBalance: 1000,
      outcomes: 0,
      incomes: 0,
      incomesList: [],
      outcomesList: [],
      isCollapse: false,
    },
  ],

  //notes
  notesList: [],
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
            console.log("INCOMES");
            wallet.walletBalance =
              wallet.walletBalance + payload.IcomesOutcomes.value;
            wallet.incomes = wallet.incomes + payload.IcomesOutcomes.value;
            wallet.incomesList = [
              ...wallet.incomesList,
              payload.IcomesOutcomes,
            ];
          } else if (state.selectedBugdetOperation === "outcomes") {
            wallet.walletBalance =
              wallet.walletBalance - payload.IcomesOutcomes.value;
            wallet.outcomes = wallet.outcomes - payload.IcomesOutcomes.value;
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
        selectedBugdetOperation: "",
      };

    case actionTypes.addWallet:
      return {
        ...state,
        // totalBalance: state.totalBalance + payload.walletBalance,
        walletsList: [...state.walletsList, payload],
        totalBalance: state.totalBalance - payload.walletBalance,
      };

    case actionTypes.setWalletCollapsed:
      const newWallets = state.walletsList.map((wallet) => {
        if (wallet.walletId === payload) {
          wallet.isCollapse = !wallet.isCollapse;
        }
        return wallet;
      });
      return {
        ...state,
        walletsList: [...newWallets],
      };

    case actionTypes.deleteSingleWallet:
      // const selectedWallet = state.walletsList.find(
      //   (wallet) => payload === wallet.Id
      // );

      let deletedWalletBallance = 0;

      const filteredWalletsList = state.walletsList.filter((wallet) => {
        if (state.selectedWalletTaskId === wallet.walletId) {
          deletedWalletBallance = wallet.walletBalance;
        }
        return state.selectedWalletTaskId !== wallet.walletId;
      });
      return {
        ...state,
        walletsList: [...filteredWalletsList],
        totalBalance: state.totalBalance + deletedWalletBallance,
        // totalBalance: state.totalBalance - selectedWallet.walletBalance,
      };
    case actionTypes.deleteIncome:
      const filterWalletsList = state.walletsList.map((wallet) => {
        const filteredIncomesList = wallet.incomesList.filter(
          (income) => income.id !== payload.id
        );
        wallet.incomesList = filteredIncomesList;
        wallet.walletBalance = wallet.walletBalance - payload.incomeValue;
        wallet.incomes = wallet.incomes - payload.incomeValue;
        return wallet;
      });
      return {
        ...state,
        walletsList: [...filterWalletsList],
      };
    case actionTypes.setSelectedWallet:
      const setSelectedWallet = state.walletsList.find(
        (wallet) => payload === wallet.walletId
      );

      return {
        ...state,
        selectedWallet: setSelectedWallet,
      };
    case actionTypes.selectedWallet:
      const setSelectedHistoryWallet = state.archiveWallets.find(
        (wallet) => payload === wallet.walletId
      );
      return {
        ...state,
        selectedHistoryWallet: setSelectedHistoryWallet,
      };

    case actionTypes.openWalletModal:
      return {
        ...state,
        isBudgetModalOpen: true,
      };
    case actionTypes.setMonthlyIncome:
      return {
        ...state,
        monthlyIncome: state.monthlyIncome + payload.incomeValue,
        totalBalance: state.totalBalance + payload.incomeValue,
        monthlyIncomesList: [...state.monthlyIncomesList, payload],
      };

    case actionTypes.deleteOutcome:
      const filterWalletsListDeleteOutcome = state.walletsList.map((wallet) => {
        const filteredOutcomesList = wallet.outcomesList.filter(
          (outcome) => outcome.id !== payload.id
        );
        wallet.outcomesList = filteredOutcomesList;
        wallet.outcomes = wallet.outcomes + payload.outcomeValue;
        wallet.walletBalance = wallet.walletBalance + payload.outcomeValue;

        return wallet;
      });
      return {
        ...state,
        walletsList: [...filterWalletsListDeleteOutcome],
      };
    case actionTypes.sentToHistory:
      const findedWallet = state.walletsList.find(
        (wallet) => payload === wallet.walletId
      );
      const walletsListAfterHistoryAdd = state.walletsList.filter(
        (wallet) => payload !== wallet.walletId
      );
      return {
        ...state,
        archiveWallets: [...state.archiveWallets, findedWallet],
        walletsList: walletsListAfterHistoryAdd,
        totalBalance: state.totalBalance + findedWallet.walletBalance,
      };
    case actionTypes.addNote:
      return {
        ...state,
        notesList: [...state.notesList, payload],
      };

    default:
      return state;
  }
};
export default reducer;

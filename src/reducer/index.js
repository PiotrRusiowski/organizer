import { actionTypes } from "../actions/actionTypes";

const initialState = {
  userEmail: "",
  userPassword: "",
  isUserAccountCreated: false,
  currentUser: null,
  editedTask: {
    id: 1,
    name: "pierwsze zadananie",
    finishDate: "23/11/2020",
    priority: "low",
    isEditing: false,
  },
  editedTaskName: "",
  tasksList: [
    {
      id: 1,
      name: "pierwsze zadananie",
      finishDate: "23/11/2020",
      priority: "low",
      isEditing: false,
    },
  ],
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
        // return payload !== task.id;
      });
      console.log(payload);
      return {
        ...state,
        tasksList: filteredTasks,
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
        tasksList: filteredTasksList,
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
        tasksList: mappedTasksList,
      };

    case actionTypes.setEditTaskName:
      const newEditedTask = {
        id: 1,
        name: payload,
        finishDate: "23/11/2020",
        priority: "low",
        isEditing: false,
      };
      return {
        ...state,
        // editedTask: newEditedTask,
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
        tasksList: editedTaskNameArray,
      };

    default:
      return state;
  }
};
export default reducer;

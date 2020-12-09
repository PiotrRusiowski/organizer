import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import {
  deleteTasks as deleteTasksAction,
  setDeleteAlertOpen,
  editTask as editTaskAction,
  saveTask as saveTaskAction,
  setEditTaskName as setEditTaskNameAction,
  sortTasksByDate as sortTasksByDateAction,
} from "../../actions";
import EditIcon from "@material-ui/icons/Edit";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import Alert from "./Alert";
import SaveIcon from "@material-ui/icons/Save";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Task name",
  },
  {
    id: "finishDate",
    numeric: true,
    disablePadding: false,
    label: "finish date",
  },
  { id: "priority", numeric: true, disablePadding: false, label: "priority" },
];

const head = {
  id: "finishDate",
  numeric: true,
  disablePadding: false,
  label: "finish date",
};

/////////////////
const EnhancedTableHead = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    tasksList,
    sortTasksByDate,
  } = props;

  const [dateSortDirection, setDateSortDirection] = useState("desc");

  const sortHandler = (property) => (event) => {
    onRequestSort(event, property);
    console.log("SORT", property);
  };

  const sortTasksListByDate = () => {
    const tasksListAfterSorting = tasksList.sort((taskOne, taskTwo) => {
      const taskOneDateArray = taskOne.finishDate.split("/").reverse();

      const taskOneDateString = taskOneDateArray.join("/");

      const taskOneDateAfterFormat = new Date(taskOneDateString);

      const taskTwoDateArray = taskTwo.finishDate.split("/").reverse();

      const taskTwoDateString = taskTwoDateArray.join("/");

      const taskTwoDateAfterFormat = new Date(taskTwoDateString);

      return taskOneDateAfterFormat - taskTwoDateAfterFormat;
    });
    sortTasksByDate(tasksListAfterSorting);
    setDateSortDirection("asc");
    //KIERUNEK STRZAŁKI
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>

        <TableCell
          key={head.id}
          align={head.numeric ? "right" : "left"}
          padding={head.disablePadding ? "none" : "default"}
          sortDirection={orderBy === head.id ? order : false}
        >
          <TableSortLabel
            active={orderBy === head.id}
            direction={dateSortDirection}
            onClick={sortTasksListByDate}
          >
            {head.label}
            {orderBy === head.id ? (
              <span className={classes.visuallyHidden}>
                {order === "desc" ? "sorted descending" : "sorted ascending"}
              </span>
            ) : null}
          </TableSortLabel>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.prmiary.main,
        },
  title: {
    flex: "1 1 100%",
    // color: "black",
  },
}));
///////////////////
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected, deleteTasks, selected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          // variant="subtitle1"
          // component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Task List
        </Typography>
      )}

      {
        numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete">
              <DeleteIcon onClick={() => deleteTasks(selected)} />
            </IconButton>
          </Tooltip>
        ) : null
        // <Tooltip title="Filter list">
        //   <IconButton aria-label="filter list">
        //     <FilterListIcon />
        //   </IconButton>
        // </Tooltip>
      }
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },
  table: {
    minWidth: 750,
    backgroundColor: "white",
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  container: {
    display: "grid",
    gridTemplateColumns: "repeat(12, 1fr)",
    gridGap: theme.spacing(3),
  },
  tabeleCell: {
    borderBottom: "none",
  },
}));

const MaterialTaskList2 = ({
  tasksList,
  deleteTasks,
  deleteAlertOpen,
  editTask,
  saveTask,
  setEditTaskName,
  sortTasksByDate,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dateAfterEdit, setDateAfterEdit] = useState(new Date());

  const dates = ["04/12/2020", "05/01/2021", "10/03/2021"];
  const dates2 = [
    {
      name: "first",
      date: "04/12/2020",
    },
    {
      name: "second",
      date: "10/03/2021",
    },
    {
      name: "thrid",
      date: "05/01/2021",
    },
  ];

  console.log(dates2);
  //WAŻNE
  const newnew = dates2.sort((a, b) => {
    const sortedA = a.date.split("/").reverse();

    const sortedAString = sortedA.join("/");

    const aAfterFormat = new Date(sortedAString);

    const sortedB = b.date.split("/").reverse();

    const sortedBString = sortedB.join("/");

    const bAfterFormat = new Date(sortedBString);
    console.log("aAfterFormat", sortedBString);
    console.log("sortedBString", sortedAString);

    console.log(aAfterFormat, "-------", bAfterFormat);
    console.log(aAfterFormat - bAfterFormat);
    return aAfterFormat - bAfterFormat;
  });

  console.log(dates2);
  console.log(newnew);

  // const newArrayDates2 = dates2.map((date) => {
  //   const stringAfterSplit = date.split("/").reverse();

  //   const perfectDate = stringAfterSplit.join("/");

  // });

  const stringAfterSplit = dates[0].split("/").reverse();
  console.log(stringAfterSplit);
  const perfectDate = stringAfterSplit.join("/");
  console.log(perfectDate);
  const dateAfterNewFormat = new Date(perfectDate);
  console.log(dateAfterNewFormat);

  const stringAfterSplit2 = dates[1].split("/").reverse();
  console.log(stringAfterSplit2);
  const perfectDate2 = stringAfterSplit2.join("/");
  console.log(perfectDate2);
  const dateAfterNewFormat2 = new Date(perfectDate2);
  console.log(dateAfterNewFormat2);

  const newDates = [dateAfterNewFormat, dateAfterNewFormat2];
  console.log(newDates);

  newDates.sort((a, b) => {
    return a - b;
  });

  console.log("data po sortowaniu", newDates);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (e) => {
    if (e.target.checked) {
      const tasksIdArray = tasksList.map((task) => task.id);

      setSelected(tasksIdArray);
    } else {
      setSelected([]);
    }
  };

  const selectTask = (event, taskId) => {
    if (selected.includes(taskId)) {
      const filteredSelected = selected.filter((id) => id !== taskId);

      setSelected(filteredSelected);
    } else {
      setSelected([...new Set([...selected, taskId])]);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (id) => selected.includes(id);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, tasksList.length - page * rowsPerPage);

  const handleEditTodo = (id, e) => {
    e.preventDefault();

    const todoNameInputValue = e.target.editTodoNameInput.value;
    console.log(todoNameInputValue);

    const todoPrioritySelectValue = e.target.editTodoPrioritySelect.value;
    console.log(dateAfterEdit);
    console.log(todoPrioritySelectValue);
    const newFinishDate = moment(dateAfterEdit).format("DD/MM/YYYY");
    console.log(typeof newFinishDate);
    const todoAfterEdit = {
      id,
      name: todoNameInputValue,
      finishDate: newFinishDate,
      priority: todoPrioritySelectValue,
      isEditing: false,
    };

    saveTask(todoAfterEdit);
  };

  const editTodoDate = (date) => {
    setDateAfterEdit(date);
  }; ///////////???????????

  console.log("TUTAJ", tasksList);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          deleteTasks={deleteTasks}
          selected={selected}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={tasksList.length}
              tasksList={tasksList}
              sortTasksByDate={sortTasksByDate}
            />
            <TableBody>
              {stableSort(tasksList, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((task, index) => {
                  const isItemSelected = isSelected(task.id);

                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                      <TableRow
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={task.id}
                        selected={isItemSelected}
                        hover
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ "aria-labelledby": labelId }}
                            onClick={(event) => selectTask(event, task.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <form onSubmit={(e) => handleEditTodo(task.id, e)}>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              className={classes.tabeleCell}
                            >
                              {task.isEditing ? (
                                <TextField
                                  name="editTodoNameInput"
                                  defaultValue={task.name}
                                />
                              ) : (
                                task.name
                              )}
                            </TableCell>

                            <TableCell
                              align="right"
                              className={classes.tabeleCell}
                            >
                              {task.isEditing ? (
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                  <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Task deadline"
                                    name="editDateCalendar"
                                    format="dd/MM/yyyy"
                                    // defaultValue={new Date()}
                                    onChange={editTodoDate}
                                    KeyboardButtonProps={{
                                      "aria-label": "change date",
                                    }}
                                  />
                                </MuiPickersUtilsProvider>
                              ) : (
                                task.finishDate
                              )}
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classes.tabeleCell}
                            >
                              {task.isEditing ? (
                                <FormControl
                                  variant="outlined"
                                  className={classes.formControl}
                                >
                                  <InputLabel id="prioritySelect">
                                    {task.priority}
                                  </InputLabel>
                                  <Select
                                    defaultValue={task.priority}
                                    labelId="prioritySelect"
                                    id="prioritySelect"
                                    name="editTodoPrioritySelect"
                                    label="Priority"
                                  >
                                    <MenuItem value={"low"}>Low</MenuItem>
                                    <MenuItem value={"medium"}>Medium</MenuItem>
                                    <MenuItem value={"high"}>High</MenuItem>
                                  </Select>
                                </FormControl>
                              ) : (
                                task.priority
                              )}
                            </TableCell>

                            <TableCell
                              align="right"
                              className={classes.tabeleCell}
                            >
                              {task.isEditing ? (
                                <Tooltip title="Save">
                                  <button
                                    style={{
                                      background: "transparent",
                                      border: "none",
                                    }}
                                    type="submit"
                                  >
                                    <IconButton>
                                      <SaveIcon />
                                    </IconButton>
                                  </button>
                                </Tooltip>
                              ) : (
                                <Tooltip title="Edit">
                                  <IconButton>
                                    <EditIcon
                                      onClick={() => editTask(task.id)}
                                    />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </TableCell>

                            <TableCell
                              align="right"
                              className={classes.tabeleCell}
                            >
                              <Tooltip title="Delete">
                                <IconButton aria-label="delete">
                                  <DeleteIcon onClick={deleteAlertOpen} />
                                </IconButton>
                              </Tooltip>
                            </TableCell>
                          </form>
                        </TableCell>
                      </TableRow>

                      <Alert taskId={task.id} />
                    </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tasksList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
};
const mapStateToProps = (state) => ({
  tasksList: state.tasksList,
});
const mapDispatchToProps = (dispatch) => ({
  deleteTasks: (taskIds) => dispatch(deleteTasksAction(taskIds)),
  deleteAlertOpen: () => dispatch(setDeleteAlertOpen()),
  editTask: (taskId) => dispatch(editTaskAction(taskId)),
  saveTask: (todo) => dispatch(saveTaskAction(todo)),
  setEditTaskName: (value) => dispatch(setEditTaskNameAction(value)),
  sortTasksByDate: (sortedTasks) =>
    dispatch(sortTasksByDateAction(sortedTasks)),
});
export default connect(mapStateToProps, mapDispatchToProps)(MaterialTaskList2);

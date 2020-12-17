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
  sortTasksByName as sortTasksByNameAction,
  sortTasksByPiority as sortTasksByPiorityAction,
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
import Grid from "@material-ui/core/Grid";

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
const useHeadStyles = makeStyles((theme) => ({
  tableRow: {
    // width: "500px",
    // backgroundColor: "black",
  },
  tableCellContainer: {
    display: "grid",
    gridTemplateColumns: "30px 1fr 150px 82px 70px",
    // backgroundColor: "green",
    columnGap: "12px",
    padding: "0px",
    paddingBottom: "10px",
    paddingTop: "10px",
    margin: "0px",
  },
  tableCell: {
    borderBottom: "none",
    alignSelf: "center",
    padding: "0px",
  },
  checkbox: {
    width: "10px",
    borderBottom: "none",
    margin: "0px",
    padding: "0px",
    alignSelf: "center",
  },
}));
const EnhancedTableHead = (props) => {
  const {
    onSelectAllClick,
    numSelected,
    rowCount,
    tasksList,
    sortTasksByDate,
    sortTasksByName,
    sortTasksByPiority,
  } = props;

  const [dateSortDirection, setDateSortDirection] = useState("desc");
  const [nameSortDirection, setNameSortDirection] = useState("desc");
  const [prioritySortDirection, setPrioritySortDirection] = useState("desc");

  const classes = useHeadStyles();
  const sortTasksListByDate = () => {
    const tasksListAfterSorting = tasksList.sort((taskOne, taskTwo) => {
      const taskOneDateArray = taskOne.finishDate.split("/").reverse();

      const taskOneDateString = taskOneDateArray.join("/");

      const taskOneDateAfterFormat = new Date(taskOneDateString);

      const taskTwoDateArray = taskTwo.finishDate.split("/").reverse();

      const taskTwoDateString = taskTwoDateArray.join("/");

      const taskTwoDateAfterFormat = new Date(taskTwoDateString);

      if (dateSortDirection === "desc") {
        setDateSortDirection("asc");
        return taskOneDateAfterFormat - taskTwoDateAfterFormat;
      } else {
        setDateSortDirection("desc");
        return taskTwoDateAfterFormat - taskOneDateAfterFormat;
      }
    });
    sortTasksByDate(tasksListAfterSorting);
  };

  const sortTasksListByName = () => {
    if (nameSortDirection === "desc") {
      const sortedTasksList = tasksList.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });

      sortTasksByName(sortedTasksList);
      setNameSortDirection("asc");
    } else {
      const sortedTasksList = tasksList
        .sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        })
        .reverse();
      sortTasksByName(sortedTasksList);
      setNameSortDirection("desc");
    }
  };

  const sortTasksListByPriority = () => {
    if (prioritySortDirection === "desc") {
      const sortedTasksList = tasksList.sort(
        (a, b) => a.priority.priorityValue - b.priority.priorityValue
      );

      sortTasksByPiority(sortedTasksList);
      setPrioritySortDirection("asc");
    } else {
      const sortedTasksList = tasksList.sort(
        (a, b) => b.priority.priorityValue - a.priority.priorityValue
      );
      sortTasksByPiority(sortedTasksList);
      setPrioritySortDirection("desc");
    }
  }; /////////////////???

  return (
    <TableHead>
      <TableRow className={classes.tableRow}>
        <TableCell className={classes.tableCellContainer}>
          <TableCell className={classes.checkbox}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
            />
          </TableCell>
          <TableCell className={classes.tableCell} key={1}>
            <TableSortLabel
              direction={nameSortDirection}
              onClick={sortTasksListByName}
            >
              task name
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableCell} key={3}>
            <TableSortLabel
              direction={dateSortDirection}
              onClick={sortTasksListByDate}
            >
              finish date
            </TableSortLabel>
          </TableCell>
          <TableCell className={classes.tableCell} key={2}>
            <TableSortLabel
              onClick={sortTasksListByPriority}
              direction={prioritySortDirection}
            >
              priority
            </TableSortLabel>
          </TableCell>

          <TableCell className={classes.tableCell}></TableCell>
        </TableCell>
      </TableRow>
    </TableHead>
  );
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
        <Typography className={classes.title}>
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

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon onClick={() => deleteTasks(selected)} />
          </IconButton>
        </Tooltip>
      ) : null}
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
  tableCell: {
    borderBottom: "none",
    alignSelf: "center",
    padding: "0px",
    margin: "0px",
  },
  tableCellContainer: {
    padding: "0px",
    paddingTop: "5px",
    paddingBottom: "5px",
    margin: "0px",
    width: "100%",
  },
  checkbox: {
    width: "10px",
    borderBottom: "none",
    margin: "0px",
    padding: "0px",
    alignSelf: "center",
  },
  calendar: {
    width: "140px",
    // backgroundColor: "white",
    padding: "0px",
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
  sortTasksByName,
  sortTasksByPiority,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("calories");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dateAfterEdit, setDateAfterEdit] = useState(new Date());

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

    const todoPrioritySelectValue = JSON.parse(
      e.target.editTodoPrioritySelect.value
    );
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
  };

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
              sortTasksByName={sortTasksByName}
              sortTasksByPiority={sortTasksByPiority}
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
                        <TableCell className={classes.tableCellContainer}>
                          <form
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "30px 1fr 150px 70px 35px 35px",
                              columnGap: "12px",
                              justifyItems: "left",
                              overflow: "hidden",
                            }}
                            onSubmit={(e) => handleEditTodo(task.id, e)}
                          >
                            <TableCell className={classes.checkbox}>
                              <Checkbox
                                checked={isItemSelected}
                                inputProps={{ "aria-labelledby": labelId }}
                                onClick={(event) => selectTask(event, task.id)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                              className={classes.tableCell}
                            >
                              {task.isEditing ? (
                                <TextField
                                  style={{ marginTop: "20px" }}
                                  name="editTodoNameInput"
                                  defaultValue={task.name}
                                />
                              ) : (
                                task.name
                              )}
                            </TableCell>

                            <TableCell
                              align="right"
                              className={classes.tableCell}
                            >
                              {task.isEditing ? (
                                <>
                                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                      className={classes.calendar}
                                      margin="normal"
                                      id="date-picker-dialog"
                                      label="Task deadline"
                                      format="dd/MM/yyyy"
                                      onChange={editTodoDate}
                                      KeyboardButtonProps={{
                                        "aria-label": "change date",
                                      }}
                                    />
                                  </MuiPickersUtilsProvider>
                                </>
                              ) : (
                                task.finishDate
                              )}
                            </TableCell>
                            <TableCell
                              align="right"
                              className={classes.tableCell}
                            >
                              {task.isEditing ? (
                                <FormControl
                                  className={classes.formControl}
                                  style={{ marginTop: "8px" }}
                                >
                                  <InputLabel
                                    id="demo-controlled-open-select-label"
                                    className={classes.inputLabel}
                                  >
                                    prioryty
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    label="prioryty"
                                    name="editTodoPrioritySelect"
                                    defaultValue={JSON.stringify({
                                      priorityName: "low",
                                      priorityValue: 1,
                                    })}
                                    // className={classes.select}
                                  >
                                    <MenuItem
                                      className={classes.menuItem}
                                      value={JSON.stringify({
                                        priorityName: "low",
                                        priorityValue: 1,
                                      })}
                                    >
                                      Low
                                    </MenuItem>
                                    <MenuItem
                                      value={JSON.stringify({
                                        priorityName: "medium",
                                        priorityValue: 2,
                                      })}
                                    >
                                      Medium
                                    </MenuItem>
                                    <MenuItem
                                      value={JSON.stringify({
                                        priorityName: "high",
                                        priorityValue: 3,
                                      })}
                                    >
                                      High
                                    </MenuItem>
                                  </Select>
                                </FormControl>
                              ) : (
                                task.priority.priorityName
                              )}
                            </TableCell>

                            <TableCell
                              align="right"
                              className={classes.tableCell}
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
                                    <IconButton
                                      style={{
                                        padding: "0",
                                        marginRight: "auto",
                                      }}
                                    >
                                      <SaveIcon />
                                    </IconButton>
                                  </button>
                                </Tooltip>
                              ) : (
                                <Tooltip title="Edit">
                                  <IconButton
                                    style={{
                                      padding: "0",
                                    }}
                                  >
                                    <EditIcon
                                      onClick={() => editTask(task.id)}
                                    />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </TableCell>

                            <TableCell className={classes.tableCell}>
                              <Tooltip title="Delete">
                                <IconButton
                                  aria-label="delete"
                                  style={{ padding: "0" }}
                                >
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
  sortTasksByName: (sortedTasks) =>
    dispatch(sortTasksByNameAction(sortedTasks)),
  sortTasksByPiority: (sortedTasks) =>
    dispatch(sortTasksByPiorityAction(sortedTasks)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MaterialTaskList2);

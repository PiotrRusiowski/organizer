import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { connect } from "react-redux";
import { addNewTask as addNewTaskAction } from "../../actions";
import moment from "moment";
import Box from "@material-ui/core/Box";

import styled from "styled-components";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  input: {
    width: "150px",
    height: "20px",
    marginBottom: "20px",
    marginRight: "10px",
  },

  btn: {
    backgroundColor: theme.palette.secondary.main,
    height: "40px",
    margin: "0px",
  },
  select: {
    height: "40px",
    marginBottom: "100px",
    color: "black",
  },
  formControl: {
    width: "120px",
    marginBottom: "5px",
  },

  calendar: {
    width: "150px",
    // backgroundColor: "white",
    padding: "0px",
  },
  form: {
    marginTop: "50px",
    marginBottom: "10px",
    flexDirection: "column",
  },
  formContainer: {
    display: "flex",
    alignItems: "center",

    width: "350px",
    justifyContent: "space-between",
  },
}));

const TaskForm = ({ addNewTask }) => {
  const classes = useStyles();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const deadline = moment(selectedDate).format("DD/MM/YYYY");

    console.log(deadline);
    console.log(JSON.parse(e.target.prioritySelect.value));

    const priorityObject = JSON.parse(e.target.prioritySelect.value);

    const newTask = {
      id: uuidv4(),
      name: e.target.name.value,
      priority: priorityObject,
      finishDate: deadline,
      isEditing: false,
    };

    addNewTask(newTask);

    e.target.reset();
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="300px"
        >
          <TextField
            id="outlined-basic"
            label="dodaj zadanie"
            className={classes.input}
            name="name"
            required
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              className={classes.calendar}
              margin="normal"
              id="date-picker-dialog"
              label="Task deadline"
              format="dd/MM/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width="300px"
        >
          <FormControl className={classes.formControl}>
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
              name="prioritySelect"
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

          <Button variant="contained" className={classes.btn} type="submit">
            AddTask
          </Button>
        </Box>
      </form>
    </>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewTask: (newTask) => dispatch(addNewTaskAction(newTask)),
  };
};
export default connect(null, mapDispatchToProps)(TaskForm);

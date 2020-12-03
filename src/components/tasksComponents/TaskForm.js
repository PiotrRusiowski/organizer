import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  headingOne: {
    fontSize: "36px",
    color: "blue",
    textAlign: "center",
  },
  input: {
    width: "20vw",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  btn: {
    backgroundColor: theme.palette.secondary.main,
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

    const newTask = {
      id: uuidv4(),
      name: e.target.name.value,
      priority: e.target.prioritySelect.value,
      finishDate: deadline,
      isEditing: false,
    };

    if (e.target.name.value === "") {
      return;
    } else addNewTask(newTask);
  };
  return (
    <>
      <Typography variant="h3" className={classes.headingOne}>
        Add new task
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="dodaj zadanie"
          variant="outlined"
          className={classes.input}
          name="name"
        />

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
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

        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="prioritySelect">Priority</InputLabel>
          <Select
            labelId="prioritySelect"
            id="prioritySelect"
            name="prioritySelect"
            label="Priority"
          >
            <MenuItem value={"low"}>Low</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"high"}>High</MenuItem>
          </Select>
        </FormControl>

        <FormControlLabel
          value="priority"
          control={<Checkbox color="primary" />}
          label="piorytet"
          labelPlacement="priority"
        />
        <Button variant="contained" className={classes.btn} type="submit">
          AddTask
        </Button>
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

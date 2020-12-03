import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import MaterialTaskList from "./MaterialTaskList";
import MaterialTaskList2 from "./MaterialTaskList2";

const TasksList = ({ tasksList }) => {
  return (
    <>
      <MaterialTaskList2 />
      {/* <MaterialTaskList /> */}
      <Container maxWidth="sm">
        <Typography
          component="div"
          style={{ backgroundColor: "#cfe8fc", height: "100vh" }}
        >
          <Typography variant="h3" color="primary">
            Tasks
          </Typography>
          <ul>
            9
            {tasksList.map(({ id, name, finishDate, priority }) => (
              <li key={id}>
                <Typography variant="h6"> {name}</Typography>
                <Typography variant="h6">{finishDate}</Typography>
                <Typography variant="h6">{priority}</Typography>
              </li>
            ))}
          </ul>
        </Typography>
      </Container>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    tasksList: state.tasksList,
  };
};

export default connect(mapStateToProps)(TasksList);

import React from "react";
import TaskForm from "../components/tasksComponents/TaskForm";
import TaskList from "../components/tasksComponents/TasksList";
import Container from "@material-ui/core/Container";

const Tasks = () => {
  return (
    <div>
      <Container maxWidth="md">
        <TaskForm />
        <TaskList />
      </Container>
    </div>
  );
};

export default Tasks;

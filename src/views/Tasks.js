import React from "react";
import TaskForm from "../components/tasksComponents/TaskForm";
import MaterialTaskList2 from "../components/tasksComponents/MaterialTaskList2";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
const Tasks = () => {
  const StyledFormContainer = styled(Container)`
    width: 65%;
  `;
  return (
    <div>
      <Container maxWidth="md">
        <TaskForm />
        <MaterialTaskList2 />
      </Container>
    </div>
  );
};

export default Tasks;

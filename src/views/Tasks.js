import React from "react";
import TaskForm from "../components/tasksComponents/TaskForm";
import MaterialTaskList2 from "../components/tasksComponents/MaterialTaskList2";
import Container from "@material-ui/core/Container";
import styled from "styled-components";
const Tasks = () => {
  const StyledFormContainer = styled(Container)`
    width: 75%;
  `;
  return (
    <div>
      <StyledFormContainer>
        <TaskForm />
        <MaterialTaskList2 />
      </StyledFormContainer>
    </div>
  );
};

export default Tasks;

import React from "react";
import TaskForm from "../components/tasksComponents/TaskForm";
import MaterialTaskList2 from "../components/tasksComponents/MaterialTaskList2";

import styled from "styled-components";

const StyledFormContainer = styled.div`
  width: 68%;
  margin: auto;
`;

const Tasks = () => {
  return (
    <>
      <StyledFormContainer>
        <TaskForm />
        <MaterialTaskList2 />
      </StyledFormContainer>
    </>
  );
};

export default Tasks;

import React from "react";
import AddBudget from "../components/budgetComponents/AddBudget";
import BudgetForm from "../components/budgetComponents/BudgetForm/BudgetForm";
import DataChart from "../components/budgetComponents/dataChart/DataChart";
import WalletList from "../components/budgetComponents/walletList/WalletList";
import styled from "styled-components";

const Events = () => {
  const StyledEvents = styled.div`
    display: flex;
  `;
  return (
    <StyledEvents>
      <WalletList />
      <AddBudget />
      <BudgetForm />
      <DataChart />
    </StyledEvents>
  );
};

export default Events;

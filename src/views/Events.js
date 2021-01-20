import React from "react";
import AddBudget from "../components/budgetComponents/AddBudget";
import DataChart from "../components/budgetComponents/dataChart/DataChart";
import WalletList from "../components/budgetComponents/walletList/WalletList";
import styled from "styled-components";
import BudgetHeader from "../components/budgetComponents/BudgetHeader/BudgetHeader";

const Events = () => {
  const StyledEvents = styled.div`
    display: flex;
  `;
  return (
    <StyledEvents>
      <div>
        <BudgetHeader />
        <WalletList />
      </div>

      <AddBudget />
      <DataChart />
    </StyledEvents>
  );
};

export default Events;

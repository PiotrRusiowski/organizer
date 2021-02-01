import React from "react";
import AddBudget from "../components/budgetComponents/AddBudget";
import DataChart from "../components/budgetComponents/dataChart/DataChart";
import WalletList from "../components/budgetComponents/walletList/WalletList";
import styled from "styled-components";
import BudgetHeader from "../components/budgetComponents/BudgetHeader/BudgetHeader";

const CreateNewBudgets = () => {
  const StyledEvents = styled.div`
    display: flex;
    flex-direction: column;
  `;
  return (
    <>
      <StyledEvents>
        <BudgetHeader />

        <div>
          <WalletList />
          <DataChart />
        </div>
        <AddBudget />
      </StyledEvents>
    </>
  );
};

export default CreateNewBudgets;

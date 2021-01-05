import React from "react";
import AddBudget from "../components/budgetComponents/AddBudget";
import BudgetForm from "../components/budgetComponents/BudgetForm/BudgetForm";
import WalletList from "../components/budgetComponents/walletList/WalletList";

const Events = () => {
  return (
    <>
      <WalletList />
      <AddBudget />
      <BudgetForm />
    </>
  );
};

export default Events;

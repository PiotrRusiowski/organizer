import React from "react";
import AddBudget from "../components/budgetComponents/AddBudget";
import WalletList from "../components/budgetComponents/walletList/WalletList";

const Events = () => {
  return (
    <>
      <WalletList />
      <AddBudget />
    </>
  );
};

export default Events;

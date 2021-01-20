import React from "react";

import { connect } from "react-redux";
import { addNewWallet as addNewWalletAction } from "../../../actions";
import { v4 as uuidv4 } from "uuid";
import FormCard from "../FormCard/FormCard";

const AddWallet = ({ addWallet }) => {
  const handleAddWallet = (e) => {
    e.preventDefault();
    const newWallet = {
      walletId: uuidv4(),
      walletName: e.target.name.value,
      walletBalance: parseInt(e.target.amount.value),
      outcomes: 0,
      incomes: 0,
      incomesList: [],
      outcomesList: [],
    };

    addWallet(newWallet);

    e.target.reset();
  };
  return <FormCard type="addWallet" handleSubmit={handleAddWallet} />;
};
const mapDispatchToProps = (dispatch) => ({
  addWallet: (newWallet) => dispatch(addNewWalletAction(newWallet)),
});

export default connect(null, mapDispatchToProps)(AddWallet);

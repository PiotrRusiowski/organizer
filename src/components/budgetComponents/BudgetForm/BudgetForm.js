import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { connect } from "react-redux";
import { addNewWallet as addNewWalletAction } from "../../../actions";
import { v4 as uuidv4 } from "uuid";

const BudgetForm = ({ addWallet }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const newWallet = {
      walletId: uuidv4(),
      walletName: e.target.name.value,
      walletBalance: parseInt(e.target.balance.value),
      outcomes: 0,
      incomes: 0,
      incomesList: [],
      outcomesList: [],
    };

    addWallet(newWallet);

    e.target.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        width="300px"
        marginTop="50px"
      >
        <TextField
          id="outlined-basic"
          label="wallet name"
          name="name"
          required
        />
        <TextField
          id="outlined-basic"
          label="balance"
          name="balance"
          type="number"
          required
        />
      </Box>

      <Button variant="contained" type="submit">
        addWallet
      </Button>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addWallet: (newWallet) => dispatch(addNewWalletAction(newWallet)),
});

export default connect(null, mapDispatchToProps)(BudgetForm);

import React from "react";

import Dialog from "@material-ui/core/Dialog";

import {
  closeBudgetModal,
  setBudgetOperation as setBudgetOperationAction,
  addNewBudget as addNewBudgetAction,
} from "../../actions";
import { connect } from "react-redux";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },

  formControl: {
    width: "240px",
    marginBottom: "5px",
  },
}));

const AddBudget = ({
  closeModal,
  isBudgetModalOpen,
  selectedWallet,
  selectedBugdetOperation,
  setBudgetOperation,
  addNewBudget,
}) => {
  const { walletBalance, walletName, walletId } = selectedWallet;
  const classes = useStyles();
  const handleAddBudget = (e) => {
    e.preventDefault();
    const IcomesOutcomes = {
      name: e.target.nameOfValue.value,
      value: parseInt(e.target.value.value),
    };
    // const value = parseInt(e.target.value.value);
    const id = walletId;

    addNewBudget(IcomesOutcomes, id);
  };
  return (
    <Dialog
      open={isBudgetModalOpen}
      onClose={closeModal}
      aria-labelledby="form-dialog-title"
    >
      <div style={{ width: "60vw", height: "60vh" }}>
        <ul>
          <li>
            <h2>WalletName:</h2>
            {walletName}
          </li>
          <li>
            <h4>WalletBalance:</h4>
            {walletBalance}
          </li>
        </ul>
        <FormControl className={classes.formControl}>
          <InputLabel
            id="demo-controlled-open-select-label"
            className={classes.inputLabel}
          >
            Choose balance operation:
          </InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="balanceOperation"
            name="balanceOperationSelect"
            onChange={(e) => setBudgetOperation(e.target.value)}
          >
            <MenuItem className={classes.menuItem} value="outcomes">
              Outcomes
            </MenuItem>
            <MenuItem value="incomes">incomes</MenuItem>
          </Select>
        </FormControl>

        {selectedBugdetOperation === null ? null : (
          <form onSubmit={(e) => handleAddBudget(e)}>
            <input
              type="number"
              placeholder={`value ${selectedBugdetOperation}`}
              name="value"
            />
            <input
              type="text"
              placeholder={`type name of ${selectedBugdetOperation}`}
              name="nameOfValue"
            />
            <button type="submit">add {selectedBugdetOperation}</button>
          </form>
        )}
      </div>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  isBudgetModalOpen: state.isBudgetModalOpen,
  selectedWallet: state.selectedWallet,
  selectedBugdetOperation: state.selectedBugdetOperation,
});
const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeBudgetModal()),
  setBudgetOperation: (budgetOperation) =>
    dispatch(setBudgetOperationAction(budgetOperation)),
  addNewBudget: (IcomesOutcomes, id) =>
    dispatch(addNewBudgetAction(IcomesOutcomes, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBudget);

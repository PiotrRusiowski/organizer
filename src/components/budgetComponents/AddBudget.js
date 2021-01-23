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
import { v4 as uuidv4 } from "uuid";

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

    const amount = e.target.value.value;

    if (amount.includes("-")) {
      const formatedAmount = amount.slice(1, amount.length);
      const IcomesOutcomes = {
        id: uuidv4(),
        name: e.target.nameOfValue.value,
        value: parseFloat(formatedAmount),
      };
      const id = walletId;

      addNewBudget(IcomesOutcomes, id);
    } else {
      const IcomesOutcomes = {
        id: uuidv4(),
        name: e.target.nameOfValue.value,
        value: parseFloat(amount),
      };
      const id = walletId;

      addNewBudget(IcomesOutcomes, id);
    }

    e.target.reset();
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
            value={selectedBugdetOperation}
            onChange={(e) => {
              setBudgetOperation(e.target.value);
            }}
          >
            <MenuItem className={classes.menuItem} value="outcomes">
              Outcomes
            </MenuItem>
            <MenuItem value="incomes">incomes</MenuItem>
          </Select>
        </FormControl>

        {selectedBugdetOperation === "" ? null : (
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

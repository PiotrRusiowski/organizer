import React from "react";
import { connect } from "react-redux";
import { setMonthlyIncome as setMonthlyIncomeAction } from "../../../actions";
import { v4 as uuidv4 } from "uuid";
import FormCard from "../FormCard/FormCard";

const AddIncomes = ({ setMonthlyIncome, incomesList }) => {
  const handleMonthlyIncome = (e) => {
    const singleIncome = {
      incomeId: uuidv4(),
      incomeName: e.target.name.value,
      incomeValue: parseInt(e.target.amount.value),
    };
    setMonthlyIncome(singleIncome);
  };
  return (
    <>
      <FormCard incomesList={incomesList} handleSubmit={handleMonthlyIncome} />
    </>
  );
};
const mapStateToProps = (state) => ({
  incomesList: state.monthlyIncomesList,
});
const mapDispatchToProps = (dispatch) => ({
  setMonthlyIncome: (singleIncome) =>
    dispatch(setMonthlyIncomeAction(singleIncome)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddIncomes);

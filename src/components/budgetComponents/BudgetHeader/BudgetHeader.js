import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { setMonthlyIncome as setMonthlyIncomeAction } from "../../../actions";

const BudgetHeader = ({ totalBalance, monthlyIncome, setMonthlyIncome }) => {
  const StyledHeader = styled.div`
    margin-top: 80px;
  `;

  const handleMonthlyIncome = (e) => {
    let monthlyIncome = parseInt(e.target.IncomeValue.value);
    setMonthlyIncome(monthlyIncome);
  };
  return (
    <StyledHeader>
      <h3>Monthly income: </h3>
      <form onSubmit={handleMonthlyIncome}>
        <input name="IncomeValue" type="number"></input>
        <button type="submit">ok</button>
      </form>
      <h4>
        Total Balance:
        {totalBalance} $
      </h4>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => ({
  monthlyIncome: state.monthlyIncome,
  totalBalance: state.totalBalance,
});
const mapdDispatchToProps = (dispatch) => ({
  setMonthlyIncome: (monthlyIncome) =>
    dispatch(setMonthlyIncomeAction(monthlyIncome)),
});

export default connect(mapStateToProps, mapdDispatchToProps)(BudgetHeader);

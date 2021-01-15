import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import AddIncomes from "../AddIncomes/AddIncomes";

const BudgetHeader = ({ totalBalance, monthlyIncome }) => {
  const StyledHeader = styled.div`
    margin-top: 80px;
  `;

  return (
    <StyledHeader>
      <AddIncomes />
      <h3>Monthly income: {monthlyIncome} </h3>
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

export default connect(mapStateToProps)(BudgetHeader);

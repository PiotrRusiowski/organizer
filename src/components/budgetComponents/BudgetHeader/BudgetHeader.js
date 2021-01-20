import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import AddIncomes from "../AddIncomes/AddIncomes";
import AddWallet from "../AddWallet/AddWallet";

const BudgetHeader = ({ totalBalance, monthlyIncome }) => {
  const StyledHeader = styled.div`
    margin-top: 80px;
    display: flex;
    flex-direction: column;
  `;
  const StyledForm = styled.div`
    display: flex;
  `;
  return (
    <StyledHeader>
      <div>
        <h3>Monthly income: {monthlyIncome} </h3>
        <h4>
          Total Balance:
          {totalBalance} $
        </h4>
      </div>
      <StyledForm>
        <AddIncomes />
        <AddWallet />
      </StyledForm>
    </StyledHeader>
  );
};

const mapStateToProps = (state) => ({
  monthlyIncome: state.monthlyIncome,
  totalBalance: state.totalBalance,
});

export default connect(mapStateToProps)(BudgetHeader);

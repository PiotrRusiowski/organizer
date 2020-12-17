import React from "react";
import { connect } from "react-redux";
import { openBudgetModalAndSelectWallet } from "../../../actions";

const WalletList = ({ walletsList, openModalAndSelectWallet }) => {
  return (
    <div>
      <ul>
        {walletsList.map(
          ({ walletId, walletName, walletBalance, outcomes, incomes }) => (
            <li key={walletId}>
              <h4>{walletName}</h4>
              <h5>Balance: {walletBalance}$</h5>
              <p>Outcomes: {outcomes}$</p>
              <p>Incomes: {incomes}$</p>
              <button onClick={() => openModalAndSelectWallet(walletId)}>
                add incomes or outcomes
              </button>
            </li>
          )
        )}
      </ul>

      {/* 
    <ul>
           {walletsList.map((wallet) => {
               const {walletName, walletId} = wallet
               return (
                   <li key={walletId}>
                       <h4>{walletName}</h4>
                   </li>
               )
           })} 
        </ul>   */}
    </div>
  );
};
const mapStateToProps = (state) => ({
  walletsList: state.wallets,
});
const mapDispatchToProps = (dispatch) => ({
  openModalAndSelectWallet: (walletId) =>
    dispatch(openBudgetModalAndSelectWallet(walletId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WalletList);

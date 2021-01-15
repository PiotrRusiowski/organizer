import React, { useEffect } from "react";
import { connect } from "react-redux";
import SingleWallet from "../singleWallet/SingleWallet";
import { addWalletBalnaceToTotal as addWalletBalnaceToTotalAction } from "../../../actions";

const WalletList = ({ walletsList, addWalletBalnaceToTotal }) => {
  // useEffect(() => {
  //   addWalletBalnaceToTotal();
  // }, [walletsList]);
  return (
    <div>
      <ul>
        {walletsList.map((wallet) => (
          <>
            <SingleWallet {...wallet} />
          </>
        ))}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => ({
  walletsList: state.walletsList,
});
const mapDispatchToProps = (dispatch) => ({
  // addWalletBalnaceToTotal: () => dispatch(addWalletBalnaceToTotalAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletList);

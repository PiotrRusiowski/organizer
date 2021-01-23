import React, { useEffect } from "react";
import { connect } from "react-redux";
import SingleWallet from "../singleWallet/SingleWallet";
import { selectedWallet as selectedWalletAction } from "../../../actions";

const WalletList = ({ walletsList, selectedWallet }) => {
  return (
    <div>
      <ul>
        {walletsList.map((wallet) => (
          <>
            <SingleWallet {...wallet} selectedWallet={selectedWallet} />
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
  selectedWallet: (id) => dispatch(selectedWalletAction(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletList);

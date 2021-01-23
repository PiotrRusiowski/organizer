import React from "react";
import { connect } from "react-redux";
import SingleWallet from "../singleWallet/SingleWallet";

const WalletsHistory = ({ archiveWallets, selectedWallet }) => {
  return (
    <div>
      <ul>
        {archiveWallets.map((wallet) => (
          <SingleWallet {...wallet} selectedWallet={selectedWallet} />
        ))}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => ({
  archiveWallets: state.archiveWallets,
  selectedWallet: state.selectedWalled,
});

export default connect(mapStateToProps)(WalletsHistory);

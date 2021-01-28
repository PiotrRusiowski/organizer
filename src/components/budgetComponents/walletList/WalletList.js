import React, { useEffect } from "react";
import { connect } from "react-redux";
import SingleWallet from "../singleWallet/SingleWallet";
import {
  setSelectedWallet as setSelectedWalletAction,
  sentToHistory as sentToHistoryAction,
} from "../../../actions";
import WalletPopper from "../singleWallet/WalletPopper";

const WalletList = ({
  walletsList,
  setSelectedWallet,
  selectedWallet,
  sentToHistory,
}) => {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (event, walletId) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
    setSelectedWallet(walletId);
  };
  const type = "walletsList";
  return (
    <div>
      <ul>
        {walletsList.map((wallet) => (
          <>
            <WalletPopper
              anchorEl={anchorEl}
              open={open}
              handleClose={handleClose}
              selectedWallet={selectedWallet}
              sentToHistory={sentToHistory}
              type={type}
            />

            <SingleWallet {...wallet} handleOpenModal={handleOpenModal} />
          </>
        ))}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => ({
  walletsList: state.walletsList,
  selectedWallet: state.selectedWallet,
});
const mapDispatchToProps = (dispatch) => ({
  setSelectedWallet: (id) => dispatch(setSelectedWalletAction(id)),
  sentToHistory: (walletId) => dispatch(sentToHistoryAction(walletId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletList);

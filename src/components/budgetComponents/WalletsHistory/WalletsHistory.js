import React from "react";
import { connect } from "react-redux";
import SingleWallet from "../singleWallet/SingleWallet";
import { selectedWallet as selectedWalletAction } from "../../../actions";
import WalletPopper from "../singleWallet/WalletPopper";

const WalletsHistory = ({ archiveWallets, selectedHistoryWallet }) => {
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  //////
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  ///////
  const handleOpenModal = (event, walletId) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
    selectedHistoryWallet(walletId);
  };
  return (
    <div>
      <ul>
        <WalletPopper
          anchorEl={anchorEl}
          open={open}
          handleClose={handleClose}
        />
        {archiveWallets.map((wallet) => (
          <SingleWallet
            {...wallet}
            selectedWallet={selectedHistoryWallet}
            handleOpenModal={handleOpenModal}
          />
        ))}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => ({
  archiveWallets: state.archiveWallets,
});
// const mapDispatchToProps = (dispatch) => ({
//   selectedHistoryWallet: (id) => dispatch(selectedWalletAction(id)),
// });
export default connect(mapStateToProps)(WalletsHistory);

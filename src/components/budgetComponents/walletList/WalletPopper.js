import React from "react";
import Popper from "@material-ui/core/Popper";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import {
  openWalletModal as openWalletModalAction,
  setDeleteAlertOpen,
} from "../../../actions";
import { connect } from "react-redux";

const WalletPopper = ({
  anchorEl,
  open,
  selectedWallet,
  openWalletModal,
  deleteAlertOpen,
}) => {
  const { walletId } = selectedWallet;
  return (
    <Popper open={open} anchorEl={anchorEl} placement="right" transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <Typography>
              <ul>
                <li>
                  <button onClick={() => openWalletModal()}>
                    incomes or outcomes
                  </button>
                </li>
                <li>
                  <button onClick={() => deleteAlertOpen(walletId)}>X</button>
                </li>
                <button>edit</button>
              </ul>
            </Typography>
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};
const mapStateToProps = (state) => ({
  selectedWallet: state.selectedWallet,
});
const mapDispatchToProps = (dispatch) => ({
  openWalletModal: () => dispatch(openWalletModalAction()),
  deleteAlertOpen: (walletId) => dispatch(setDeleteAlertOpen(walletId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletPopper);
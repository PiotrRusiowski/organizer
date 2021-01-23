import React from "react";

import {
  openWalletModal as openWalletModalAction,
  sentToHistory as sentToHistoryAction,
  setDeleteAlertOpen,
} from "../../../actions";
import { connect } from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import SendIcon from "@material-ui/icons/Send";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "rgba(0, 0, 0, 0.54)",
    marginRight: 8,
  },
}));
const WalletPopper = ({
  anchorEl,
  open,
  selectedWallet,
  openWalletModal,
  deleteAlertOpen,
  sentToHistory,
  handleClose,
}) => {
  const classes = useStyles();
  const { walletId } = selectedWallet;
  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            openWalletModal();
            handleClose();
          }}
        >
          Incomes/outcomes
        </MenuItem>
        <MenuItem
          onClick={() => {
            sentToHistory(walletId);
            handleClose();
          }}
        >
          {/* <ListItemIcon className={classes.icon}> */}
          <SendIcon className={classes.icon} />
          {/* </ListItemIcon> */}
          <ListItemText primary="Sent to history" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteAlertOpen(walletId);
            handleClose();
          }}
        >
          Delete wallet
        </MenuItem>
      </Menu>
    </>
  );
};
const mapStateToProps = (state) => ({});
const mapDispatchToProps = (dispatch) => ({
  sentToHistory: (walletId) => dispatch(sentToHistoryAction(walletId)),
  openWalletModal: () => dispatch(openWalletModalAction()),
  deleteAlertOpen: (walletId) => dispatch(setDeleteAlertOpen(walletId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletPopper);

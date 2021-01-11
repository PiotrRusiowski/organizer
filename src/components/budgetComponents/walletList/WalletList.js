import React from "react";
import { connect } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";

import { red } from "@material-ui/core/colors";

import SingleWallet from "../singleWallet/SingleWallet";
import DataChart from "../dataChart/DataChart";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 250,
    marginTop: "20px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  cardHeader: {
    padding: "15px 15px 0px",
  },
  cardContent: {
    padding: "0px 15px",
  },
  cardActions: {
    padding: "0px 15px",
  },
  typography: {
    padding: "10px 0px",
  },
}));

const WalletList = ({
  walletsList,
  // setWalletCollapsed,
  // deleteIncome,
  totalBalance,
  monthlyIncome,
  // selectedWallet,
}) => {
  // const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);
  // const [open, setOpen] = React.useState(false);
  // const [placement, setPlacement] = React.useState();

  // const handleOpenModal = (event, walletId) => {
  //   setAnchorEl(event.currentTarget);
  //   setOpen(!open);
  //   selectedWallet(walletId);
  // };

  return (
    <div>
      <DataChart />
      <h3>
        Monthly income:
        <input type="number" defaultValue={monthlyIncome}></input>
      </h3>
      <h4>
        Total Balance:
        {totalBalance} $
      </h4>
      <button>ok</button>

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
  totalBalance: state.totalBalance,
  monthlyIncome: state.monthlyIncome,
});
// const mapDispatchToProps = (dispatch) => ({
//   deleteAlertOpen: (walletId) => dispatch(setDeleteAlertOpen(walletId)),
//   setWalletCollapsed: (walletId) => dispatch(setWalletCollapsed(walletId)),
//   deleteIncome: (id) => dispatch(deleteIncomeAction(id)),
//   selectedWallet: (id) => dispatch(selectedWalletAction(id)),
// });
export default connect(mapStateToProps)(WalletList);

import React from "react";
import { connect } from "react-redux";
import {
  setDeleteAlertOpen,
  setWalletCollapsed,
  deleteIncome as deleteIncomeAction,
  selectedWallet as selectedWalletAction,
  deleteOutcome as deleteOutcomeAction,
} from "../../../actions";
import Alert from "../../tasksComponents/Alert";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";

import WalletPopper from "../walletList/WalletPopper";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

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

const SingleWallet = ({
  setWalletCollapsed,
  deleteIncome,
  selectedWallet,
  walletId,
  walletName,
  walletBalance,
  outcomes,
  incomes,
  incomesList,
  outcomesList,
  isCollapse,
  deleteOutcome,
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleOpenModal = (event, walletId) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
    selectedWallet(walletId);
  };

  return (
    <li key={walletId}>
      <WalletPopper anchorEl={anchorEl} open={open} />

      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {walletName.charAt(0).toUpperCase() + walletName.substring(1, 2)}
            </Avatar>
          }
          action={
            <div className={classes.root}>
              <IconButton
                aria-label="settings"
                onClick={(e) => handleOpenModal(e, walletId)}
              >
                <MoreVertIcon />
              </IconButton>
            </div>
          }
          title={walletName}
          subheader={
            <>
              Balance:
              <span style={{ color: walletBalance > 0 ? "green" : "red" }}>
                {walletBalance}$
              </span>
            </>
          }
        ></CardHeader>

        <CardContent className={classes.cardContent}>
          <Typography variant="body2" color="textSecondary" component="p">
            <>Outcomes: {outcomes}$</>
            <br />
            <>Incomes: {incomes}$</>
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: isCollapse,
            })}
            onClick={() => setWalletCollapsed(walletId)}
            aria-expanded={isCollapse}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={isCollapse} timeout="auto" unmountOnExit>
          <CardContent>
            {incomesList.length || outcomesList.length > 0 ? (
              <>
                <ul>
                  {incomesList.map((income) => (
                    <li>
                      <p>
                        {income.name}
                        <span style={{ color: "green" }}>{income.value}$</span>
                      </p>
                      <button onClick={() => deleteIncome(income.id)}>X</button>
                    </li>
                  ))}
                </ul>
                {outcomesList.lenght > 0 ? <Divider /> : ""}
                <ul>
                  {outcomesList.map((outcome) => (
                    <li>
                      <p>
                        {outcome.name}
                        <span style={{ color: "red" }}>-{outcome.value}$</span>
                      </p>
                      <button onClick={() => deleteOutcome(outcome.id)}>
                        X
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <Typography variant="body2" color="textSecondary" component="p">
                You don't have any incomes and outcomes
              </Typography>
            )}
          </CardContent>
        </Collapse>
      </Card>
      <Alert />
    </li>
  );
};
const mapDispatchToProps = (dispatch) => ({
  deleteAlertOpen: (walletId) => dispatch(setDeleteAlertOpen(walletId)),
  setWalletCollapsed: (walletId) => dispatch(setWalletCollapsed(walletId)),
  deleteIncome: (id) => dispatch(deleteIncomeAction(id)),
  deleteOutcome: (id) => dispatch(deleteOutcomeAction(id)),
  selectedWallet: (id) => dispatch(selectedWalletAction(id)),
});
export default connect(null, mapDispatchToProps)(SingleWallet);

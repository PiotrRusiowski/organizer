import React from "react";
import { connect } from "react-redux";
import {
  openBudgetModalAndSelectWallet,
  setDeleteAlertOpen,
} from "../../../actions";
import Alert from "../../tasksComponents/Alert";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
}));

const WalletList = ({
  walletsList,
  openModalAndSelectWallet,
  deleteAlertOpen,
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
      <ul>
        {walletsList.map(
          ({
            walletId,
            walletName,
            walletBalance,
            outcomes,
            incomes,
            incomesList,
            outcomesList,
          }) => (
            <>
              <li key={walletId}>
                <Alert walletId={walletId} />
                <Card className={classes.root}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        {walletName.charAt(0).toUpperCase() +
                          walletName.substring(1, 2)}
                      </Avatar>
                    }
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={walletName}
                    subheader={<>Balance: {walletBalance}$</>}
                  />

                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      <p>Outcomes: {outcomes}$</p>
                      <p>Incomes: {incomes}$</p>
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <button onClick={() => openModalAndSelectWallet(walletId)}>
                      add incomes or outcomes
                    </button>
                    <button
                      onClick={() => (
                        deleteAlertOpen(walletId), console.log(walletId)
                      )}
                    >
                      X
                    </button>
                    <IconButton
                      className={clsx(classes.expand, {
                        [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  </CardActions>
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <ul>
                        {incomesList.map((income) => (
                          <li>
                            <p>
                              {income.name}
                              <span style={{ color: "green" }}>
                                +{income.value}$
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                      <Divider />

                      <ul>
                        {outcomesList.map((outcome) => (
                          <li>
                            <p>
                              {outcome.name}
                              <span style={{ color: "red" }}>
                                -{outcome.value}$
                              </span>
                            </p>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Collapse>
                </Card>
              </li>
            </>
          )
        )}
      </ul>
    </div>
  );
};
const mapStateToProps = (state) => ({
  walletsList: state.walletsList,
});
const mapDispatchToProps = (dispatch) => ({
  openModalAndSelectWallet: (walletId) =>
    dispatch(openBudgetModalAndSelectWallet(walletId)),
  deleteAlertOpen: (walletId) => dispatch(setDeleteAlertOpen(walletId)),
  // deleteSingleWallet: (id) => dispatch(deleteSingleWalletAction(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(WalletList);

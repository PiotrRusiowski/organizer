import React from "react";
import { connect } from "react-redux";
import { setMonthlyIncome as setMonthlyIncomeAction } from "../../../actions";
import TextField from "@material-ui/core/TextField";
import { v4 as uuidv4 } from "uuid";
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
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import { TrendingUpRounded } from "@material-ui/icons";
import WalletPopper from "../walletList/WalletPopper";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import clsx from "clsx";

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

const AddIncomes = ({ setMonthlyIncome, incomesList }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();

  const handleOpenModal = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  const handleMonthlyIncome = (e) => {
    const singleIncome = {
      incomeId: uuidv4(),
      incomeName: e.target.incomeName.value,
      incomeValue: parseInt(e.target.incomeValue.value),
    };
    setMonthlyIncome(singleIncome);
  };
  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          className={classes.cardHeader}
          title={"monthlyIncome"}
          subheader={
            <>
              <ul>
                <li>total balance</li>
                <li>monthly income</li>
              </ul>
            </>
          }
        ></CardHeader>

        <CardContent className={classes.cardContent}>
          <form onSubmit={handleMonthlyIncome}>
            <TextField
              width="50px"
              name="incomeValue"
              type="number"
              placeholder="value"
              required
            />
            <TextField
              name="incomeName"
              type="text"
              placeholder="income name"
              required
            />
            <button type="submit">ok</button>
          </form>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <p>see income list</p>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: open,
            })}
            onClick={handleOpenModal}
            aria-expanded={open}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <CardContent>
            <ul>
              {incomesList.map((income) => (
                <li>
                  <p>{income.incomeName}</p>
                  <p>{income.incomeValue}</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};
const mapStateToProps = (state) => ({
  incomesList: state.monthlyIncomesList,
});
const mapDispatchToProps = (dispatch) => ({
  setMonthlyIncome: (singleIncome) =>
    dispatch(setMonthlyIncomeAction(singleIncome)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddIncomes);

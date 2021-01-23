import React, { useState } from "react";
import { connect } from "react-redux";
import { setMonthlyIncome as setMonthlyIncomeAction } from "../../../actions";
import TextField from "@material-ui/core/TextField";
import { v4 as uuidv4 } from "uuid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 250,
    marginTop: "20px",
  },
  addWalletCard: {
    maxWidth: 250,
    marginTop: "20px",
    height: "150px",
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

const FormCard = ({ handleSubmit, type, incomesList }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleShowDropdown = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(!open);
  };

  return (
    <>
      <Card
        className={type === "addWallet" ? classes.addWalletCard : classes.card}
      >
        <CardHeader
          className={classes.cardHeader}
          title={
            <form onSubmit={handleSubmit}>
              <TextField
                width="50px"
                name="amount"
                type="number"
                placeholder="value"
                required
              />
              <TextField
                name="name"
                type="text"
                placeholder="income name"
                required
              />
              <Button size="small" color="primary" type="submit">
                {type === "addWallet" ? "add new wallet" : "add income"}
              </Button>
            </form>
          }
        ></CardHeader>

        {type === "addWallet" ? null : (
          <>
            <CardActions disableSpacing className={classes.cardActions}>
              <Typography variant="body2" color="textSecondary" component="p">
                see income list
              </Typography>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: open,
                })}
                onClick={handleShowDropdown}
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
          </>
        )}
      </Card>
    </>
  );
};

export default FormCard;

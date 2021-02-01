import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import AddIncomes from "../AddIncomes/AddIncomes";
import AddWallet from "../AddWallet/AddWallet";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  shift: { backgroundColor: "yellow" },
  box: { width: "75vw" },
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

////
const BudgetHeader = ({ totalBalance, monthlyIncome }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [value, setValue] = React.useState(2);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledHeader = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
  `;

  const StyledForm = styled.div`
    display: flex;
  `;
  return (
    <>
      <Box className={classes.box}>
        <div className={classes.root}>
          <AppBar position="static" color="white">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
              <Tab label="Item Three" {...a11yProps(2)} />
              <Tab label="Item Four" {...a11yProps(3)} />
              <Tab label="Item Five" {...a11yProps(4)} />
              <Tab label="Item Six" {...a11yProps(5)} />
              <Tab label="Item Seven" {...a11yProps(6)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Item One
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
          <TabPanel value={value} index={3}>
            Item Four
          </TabPanel>
          <TabPanel value={value} index={4}>
            Item Five
          </TabPanel>
          <TabPanel value={value} index={5}>
            Item Six
          </TabPanel>
          <TabPanel value={value} index={6}>
            Item Seven
          </TabPanel>
        </div>
      </Box>
      <div>
        <h3>Monthly income: {monthlyIncome} </h3>
        <h4>
          Total Balance:
          {totalBalance} $
        </h4>
      </div>
      <StyledForm>
        <AddIncomes />
        <AddWallet />
      </StyledForm>
    </>
  );
};

const mapStateToProps = (state) => ({
  monthlyIncome: state.monthlyIncome,
  totalBalance: state.totalBalance,
});

export default connect(mapStateToProps)(BudgetHeader);

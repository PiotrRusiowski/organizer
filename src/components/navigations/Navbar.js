import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../routes";
import { auth } from "../../fireBaseConfig";
import { connect } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AssignmentIcon from "@material-ui/icons/Assignment";
import styled from "styled-components";
import taskIcon from "../../assecs/icons/taskIcon.png";
import chartIcon from "../../assecs/icons/chartIcon.png";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";

const useStyles = makeStyles((theme) => ({
  listItem: {
    fontSize: "15px",
  },
  listItemText: {
    fontSize: "8px",
  },
}));

const Navbar = ({ currentUser }) => {
  const classes = useStyles();

  const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 15px;
  `;
  const StyledIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 30px;
  `;

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <StyledLink to={routes.home}>
        <ListItem button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>

          <ListItemText disableTypography primary="Home" />
        </ListItem>
      </StyledLink>

      <StyledLink to={routes.note}>
        <ListItem
          button
          // selected={true}
          // style={{ backgroundColor: selected ? "yellow" : "none" }}
        >
          <ListItemIcon>
            <StyledIcon />
          </ListItemIcon>
          <ListItemText disableTypography primary="Note" />
        </ListItem>
      </StyledLink>

      <StyledLink to={routes.tasks}>
        <ListItem button>
          <StyledIcon src={taskIcon} />
          <ListItemText disableTypography primary="Tasks" />
        </ListItem>
      </StyledLink>

      <StyledLink>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <StyledIcon src={chartIcon} />
          </ListItemIcon>
          <ListItemText disableTypography primary="My budget" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </StyledLink>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <StyledLink to={routes.createNewBudgets}>
            <ListItem button>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText disableTypography primary="Create new budget" />
            </ListItem>
          </StyledLink>
          <StyledLink to={routes.walletsHistory}>
            <ListItem button>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText disableTypography primary="Wallets history" />
            </ListItem>
          </StyledLink>
        </List>
      </Collapse>
      <ListItem button>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={`${currentUser.email}`} />
      </ListItem>
      <li>
        <button onClick={() => auth.signOut()}>log out</button>
      </li>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};
export default connect(mapStateToProps)(Navbar);

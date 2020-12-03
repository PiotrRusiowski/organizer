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

const Navbar = ({ currentUser }) => {
  const useStyles = makeStyles((theme) => ({
    listItem: {
      // "&:hover": {
      //   background: "black",
      // },
    },
  }));
  const classes = useStyles();

  const StyledLink = styled(Link)`
    color: white;
    text-decoration: none;
  `;
  const StyledIcon = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 30px;
  `;

  return (
    <>
      <StyledLink>
        <ListItem className={classes.listItem} button>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </StyledLink>

      <StyledLink to={routes.calendar}>
        <ListItem button>
          <ListItemIcon>
            <StyledIcon />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItem>
      </StyledLink>

      <StyledLink to={routes.tasks}>
        <ListItem button>
          <StyledIcon src={taskIcon} />
          <ListItemText primary="Tasks" />
        </ListItem>
      </StyledLink>

      <StyledLink to={routes.events}>
        <ListItem button>
          <ListItemIcon>
            <StyledIcon src={chartIcon} />
          </ListItemIcon>
          <ListItemText primary="Events" />
        </ListItem>
      </StyledLink>


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

// import React from "react";

// export const mainListItems = <div></div>;

// export const secondaryListItems = (
//   <div>
//     <ListSubheader inset>Saved reports</ListSubheader>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Current month" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Last quarter" />
//     </ListItem>
//     <ListItem button>
//       <ListItemIcon>
//         <AssignmentIcon />
//       </ListItemIcon>
//       <ListItemText primary="Year-end sale" />
//     </ListItem>
//   </div>
// );

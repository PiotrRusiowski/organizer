import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { connect } from "react-redux";

const NotesList = ({ notesList }) => {
  return (
    <div>
      <ul>
        {notesList.map((note) => {
          return (
            <ListItem button>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary={note.noteTitle} />
            </ListItem>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notesList: state.notesList,
});
export default connect(mapStateToProps)(NotesList);

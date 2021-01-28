import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { selectNote as selectNoteAction } from "../../actions";

const NotesList = ({ notesList, selectNote }) => {
  return (
    <div>
      <ul>
        {notesList.map((note) => {
          return (
            <Link
              onClick={() => selectNote(note.id)}
              to={{
                pathname: `/note/${note.noteTitle}`,
                state: {
                  note,
                },
              }}
              // activeStyle={{ fontSize: "200px" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary={note.noteTitle} />
              </ListItem>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  notesList: state.notesList,
});
const mapDispatchToProps = (dispatch) => ({
  selectNote: (id) => dispatch(selectNoteAction(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(NotesList);

import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { addNote as addNoteAction } from "../../actions";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    minWidth: 400,
    minHeight: 400,
  },
});
const StyledNoteConcent = styled.textarea`
  border: none;
  width: 100px;
  height: 100px;
`;
const AddNote = ({ addNote }) => {
  const classes = useStyles();

  const handleAddNote = (e) => {
    e.preventDefault();
    const note = {
      id: uuidv4(),
      noteTitle: e.target.noteTitle.value,
      noteContent: e.target.noteContent.value,
    };
    addNote(note);

    e.target.reset();
  };
  return (
    <form onSubmit={handleAddNote} style={{ marginTop: "50px" }}>
      <input type="text" placeholder="title" name="noteTitle" />
      <div style={{ width: "400px", height: "400px" }}>
        <Card className={classes.root}>
          <StyledNoteConcent name="noteContent" type="text"></StyledNoteConcent>
        </Card>
      </div>
      <button type="submit">add note</button>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(addNoteAction(note)),
});
export default connect(null, mapDispatchToProps)(AddNote);

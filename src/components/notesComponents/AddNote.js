import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { addNote as addNoteAction } from "../../actions";

const AddNote = ({ addNote }) => {
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
    <form onSubmit={handleAddNote} style={{ marginTop: "100px" }}>
      <input type="text" placeholder="title" name="noteTitle" />
      <textarea name="noteContent" cols="80" type="text" rows="36"></textarea>
      <button type="submit">add note</button>
    </form>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(addNoteAction(note)),
});
export default connect(null, mapDispatchToProps)(AddNote);

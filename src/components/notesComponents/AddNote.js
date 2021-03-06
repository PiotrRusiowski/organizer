import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { addNote as addNoteAction } from "../../actions";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { CardHeader } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    padding: 2,
    width: "100%",
    height: "100%",
  },
  cardHeader: {
    padding: "15px",
    margin: "10px",
  },
  card: {
    margin: "10px",
  },
});

const StyledNoteConcent = styled.textarea`
  border: none;
  width: 100%;
  height: 100%;
  border: none;
  overflow: auto;
  outline: none;
  padding: 10px;
`;
const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50vw;
  height: 80vh;
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
    <Box
      display="flex"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <StyledForm onSubmit={handleAddNote}>
        <Card className={classes.card}>
          <CardHeader
            className={classes.cardHeader}
            title={
              <>
                <Box display="flex" flexDirection="column">
                  <TextField
                    name="name"
                    placeholder="income name"
                    required
                    type="text"
                    placeholder="title"
                    name="noteTitle"
                  />

                  <Button
                    size="small"
                    color="primary"
                    type="submit"
                    type="submit"
                  >
                    add note
                  </Button>
                </Box>
              </>
            }
          ></CardHeader>
        </Card>
        <Card className={classes.root}>
          <StyledNoteConcent
            name="noteContent"
            type="text"
            placeholder="note..."
          ></StyledNoteConcent>
        </Card>
      </StyledForm>
    </Box>
  );
};
const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(addNoteAction(note)),
});
export default connect(null, mapDispatchToProps)(AddNote);

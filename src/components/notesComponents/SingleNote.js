import React from "react";
import { v4 as uuidv4 } from "uuid";
import { connect } from "react-redux";
import { editNoteTitle as editNoteTitleAction } from "../../actions";
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
const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50vw;
  height: 80vh;
`;

const SingleNote = ({ location, editNoteTitle, selectedNote }) => {
  const classes = useStyles();
  const { noteTitle, noteContent } = location.state.note;
  const handleChange = (e) => {
    editNoteTitle(e.target.value);
  };
  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <StyledWrapper>
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
                    onChange={handleChange}
                    value={selectedNote.noteTitle}
                  />
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
            value={noteContent}
          ></StyledNoteConcent>
        </Card>
      </StyledWrapper>
    </Box>
  );
};
const mapStateToProps = (state) => ({
  selectedNote: state.selectedNote,
});
const mapDispatchToProps = (dispatch) => ({
  editNoteTitle: (newTitle) => dispatch(editNoteTitleAction(newTitle)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleNote);

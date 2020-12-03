import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import {
  setDeleteAlertClose,
  deleteSingleTask as deleteSingleTaskAction,
} from "../../actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = ({
  deleteAlertClose,
  isDeleteAlertOpen,
  taskId,
  deleteSingleTask,
}) => {
  return (
    <div>
      <Dialog
        open={isDeleteAlertOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={deleteAlertClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Are you sure to delete this task?"}
        </DialogTitle>

        <DialogActions>
          <Button
            onClick={deleteAlertClose}
            color="primary"
            variant="contained"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              deleteAlertClose();
              deleteSingleTask(taskId);
            }}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
const mapStateToProps = (state) => ({
  isDeleteAlertOpen: state.isDeleteAlertOpen,
});
const mapDispatchToProps = (dispatch) => ({
  deleteAlertClose: () => dispatch(setDeleteAlertClose()),
  deleteSingleTask: (id) => dispatch(deleteSingleTaskAction(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Alert);
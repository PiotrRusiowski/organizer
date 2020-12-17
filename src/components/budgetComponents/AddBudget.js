import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { closeBudgetModal } from "../../actions";
import { connect } from "react-redux";

const AddBudget = ({ closeModal, isBudgetModalOpen }) => {
  return (
    <Dialog
      open={isBudgetModalOpen}
      onClose={closeModal}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="primary">
          Cancel
        </Button>
        <Button onClick={closeModal} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => ({
  isBudgetModalOpen: state.isBudgetModalOpen,
});
const mapDispatchToProps = (dispatch) => ({
  closeModal: () => dispatch(closeBudgetModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBudget);

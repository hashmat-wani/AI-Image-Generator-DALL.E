import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  DialogActions,
  DialogContent,
  Slide,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forwardRef, useContext } from "react";
import { deactivateAccount } from "../../../state/userSlice";
import { STATUS } from "../../../utils";
import { backdropContext } from "../../../context/BackdropContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeactivateAccPopup({
  openDialog,
  setOpenDialog,
  status,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toggleBackdrop } = useContext(backdropContext);

  const handleConfirm = () => {
    const args = { navigate, handleClose, toggleBackdrop };
    dispatch(deactivateAccount(args));
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  return (
    <div>
      <Dialog
        sx={{
          ".MuiDialog-container .MuiPaper-root": {
            width: "400px",
            margin: "10px",
            minWidth: "300px",
          },
        }}
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Deactivate account</DialogTitle>
        <DialogContent>
          <Typography mb="7px">
            Are you sure you want to deactivate your account.
          </Typography>
          <Typography variant="small">
            You can reactivate your account by logging back in and your all
            posts will be visible back to community.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button disabled={status === STATUS.LOADING} onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={status === STATUS.LOADING} onClick={handleConfirm}>
            {status === STATUS.LOADING ? "Deactivating..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

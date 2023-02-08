import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Button,
  DialogActions,
  DialogContent,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { forwardRef, useState } from "react";
import { deleteAccount } from "../../../state/userSlice";
import { STATUS } from "../../../utils";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteAccPopup({
  openDialog,
  setOpenDialog,
  user,
  status,
}) {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(deleteAccount(handleClose));
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
        <DialogTitle color="#ff6b60">Delete account</DialogTitle>
        <DialogContent>
          <Typography>
            Are you absolutely sure you want to delete your account?
          </Typography>

          <Typography fontSize="13px" my="7px">
            By deleting account, you'll lose everything related to your account
            including your posts you've ever shared to community.
          </Typography>

          <Typography fontSize="16px" my="15px">
            This action cannot be undone.
          </Typography>
          <Typography mb="12px" mt="20px">
            If you're sure, confirm by typing your Email below:
          </Typography>
          <TextField
            size="small"
            fullWidth
            required
            label="Type your email to confirm"
            helperText={user?.email}
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={status === STATUS.LOADING} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={status === STATUS.LOADING || input !== user?.email}
            onClick={handleConfirm}
            sx={{ color: "#ff6b60" }}
          >
            {status === STATUS.LOADING ? "Deleting..." : "Delete everything"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { Button, DialogContent, Slide, Typography } from "@mui/material";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FlexBox } from "./FlexBox";
import { sendEmail } from "../state/userSlice";
import { STATUS } from "../utils";
import { forwardRef } from "react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VerifyEmailAlert({
  emailVerificationAlert,
  setEmailVerificationAlert,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );

  const handleClose = () => {
    setEmailVerificationAlert(false);
  };

  const handleVerification = () => {
    dispatch(sendEmail(navigate, handleClose));
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
        open={emailVerificationAlert}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle>Verify your account</DialogTitle>
        <DialogContent>
          <ContactMailIcon
            sx={{
              fontSize: "90px",
              margin: "0 auto 20px",
              display: "block",
            }}
          />
          <Typography fontSize="18px">Hi {user?.firstName},</Typography>
          <Typography my="10px">
            We're happy you signed in. Please confirm your email address and
            start enjoying DALL.E
          </Typography>
          <FlexBox gap="10px" justifyContent="end" mt="40px">
            <Button
              disabled={status === STATUS.LOADING}
              onClick={handleVerification}
              sx={{ fontSize: "11px" }}
              variant="contained"
            >
              {status === STATUS.LOADING ? "Sending mail..." : "Verify now"}
            </Button>
            <Button
              disabled={status === STATUS.LOADING}
              onClick={handleClose}
              sx={{ fontSize: "11px" }}
            >
              Do it later
            </Button>
          </FlexBox>
        </DialogContent>
      </Dialog>
    </div>
  );
}

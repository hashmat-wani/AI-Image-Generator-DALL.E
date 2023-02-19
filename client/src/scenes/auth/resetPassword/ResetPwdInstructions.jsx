import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { sendEmail } from "../../../state/resetPwdSlice";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { STATUS } from "../../../utils";
import logo from "../../../assets/smallLogo.svg";

const ResetPwdInstructions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, status } = useSelector(
    (state) => state.resetPwdReducer,
    shallowEqual
  );

  const resend = () => {
    dispatch(sendEmail({ email, navigate }));
  };

  return (
    <Stack
      sx={{
        minWidth: "320px",
        maxWidth: "360px",
        padding: "20px",
        height: "500px",
        margin: "40px auto",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <img
          style={{ width: "32px", marginBottom: "60px" }}
          src={logo}
          alt="logo"
        />
      </Link>
      <MarkEmailReadIcon sx={{ fontSize: "100px", mb: "15px" }} />

      <Box sx={{ textAlign: "center", my: "10px" }}>
        <Typography variant="h3" my="10px">
          Check your email address
        </Typography>
        <Typography my="20px">
          Please check the email address {email} for instructions to reset your
          password.
        </Typography>
      </Box>

      <Box
        sx={{
          my: 1,
          position: "relative",
          width: "100%",
          height: "45px",
        }}
      >
        <Button
          sx={{
            height: "100%",
          }}
          fullWidth
          variant="contained"
          type="submit"
          disabled={status === STATUS.LOADING}
          onClick={resend}
        >
          Resend email
        </Button>
        {status === STATUS.LOADING && (
          <CircularProgress
            size={20}
            sx={{
              color: "#000000",
              position: "absolute",
              top: "50%",
              left: "50%",
              marginTop: "-12px",
              marginLeft: "-12px",
            }}
          />
        )}
      </Box>
    </Stack>
  );
};

export default ResetPwdInstructions;

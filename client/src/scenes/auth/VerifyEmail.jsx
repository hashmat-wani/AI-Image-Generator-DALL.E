import React from "react";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { shades } from "../../theme";
import { sendEmail, verifyEmail } from "../../state/userSlice";
import { STATUS } from "../../utils";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, status } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );

  const initialValues = {
    otp: "",
  };

  const validationSchema = yup.object().shape({
    otp: yup
      .string()
      .min(4, "Minimum 4 digits")
      .max(4, "Only 4 digits allowed")
      .required("Required"),
  });

  const handleFormSubmit = (values) => {
    const otp = `${values.otp}`;
    const args = { otp, navigate };
    dispatch(verifyEmail(args));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  const { values, errors, handleSubmit, touched, handleBlur, handleChange } =
    formik;

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
      <MarkEmailReadIcon sx={{ fontSize: "100px", mb: "15px" }} />

      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h3" my="10px">
          Please check your email address
        </Typography>
        <Typography>
          We sent <b>email verification</b> code to
        </Typography>
        <Typography>{user?.email}</Typography>
      </Box>

      <Box width="100%" component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.otp}
          error={!!touched.otp && !!errors.otp} //converting value to a boolean
          helperText={touched.otp && errors.otp}
          required
          fullWidth
          name="otp"
          label="OTP"
          variant="standard"
          type="number"
          sx={{ my: "10px" }}
        />
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
          >
            Verify email
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
      </Box>

      <Typography
        sx={{ my: "8px" }}
        color={shades.primary[400]}
        textAlign="center"
      >
        Didn't receive a mail?{" "}
        <Button
          disabled={status === STATUS.LOADING}
          onClick={() => dispatch(sendEmail())}
          sx={{
            padding: 0,
            textTransform: "none",
            textDecoration: "underline",
          }}
        >
          Resend
        </Button>
      </Typography>
    </Stack>
  );
};

export default VerifyEmail;

import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { Link, useNavigate } from "react-router-dom";
import { resetPassword } from "../../../state/resetPwdSlice";
import { shades } from "../../../theme";
import logo from "../../../assets/smallLogo.svg";

const ChangePwd = () => {
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmNewPwd, setShowConfirmNewPwd] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    newPassword: "",
    confirmNewPassword: "",
  };

  const validationSchema = yup.object().shape({
    newPassword: yup
      .string()
      .trim()
      .required("Required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmNewPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("newPassword"), null], "Passwords don't match."),
  });

  const handleFormSubmit = (values, { setSubmitting, resetForm }) => {
    const args = {
      newPassword: values.newPassword.trim(),
      setSubmitting,
      navigate,
      resetForm,
    };
    dispatch(resetPassword(args));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleFormSubmit,
    validationSchema,
  });

  const {
    values,
    errors,
    handleSubmit,
    isSubmitting,
    touched,
    handleBlur,
    handleChange,
  } = formik;

  return (
    <Box
      sx={{
        minWidth: "320px",
        maxWidth: "360px",
        padding: "20px",
        margin: "40px auto auto",
        display: "flex",
        flexDirection: "column",
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
      <Typography color={shades.primary[400]} fontSize="28px" fontWeight="bold">
        Reset your password
      </Typography>
      <Typography my="10px" textAlign="center" color={shades.primary[300]}>
        Enter a new password below to change your password.
      </Typography>
      <Box
        width="100%"
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.newPassword}
          error={!!touched.newPassword && !!errors.newPassword} //converting value to a boolean
          helperText={touched.newPassword && errors.newPassword}
          sx={{
            margin: "8px 0",
          }}
          required
          fullWidth
          name="newPassword"
          label="New Password"
          type={showNewPwd ? "text" : "password"}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowNewPwd((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showNewPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.confirmNewPassword}
          error={!!touched.confirmNewPassword && !!errors.confirmNewPassword} //converting value to a boolean
          helperText={touched.confirmNewPassword && errors.confirmNewPassword}
          sx={{
            margin: "8px 0",
          }}
          required
          fullWidth
          name="confirmNewPassword"
          label="Confirm New-Password"
          type={showConfirmNewPwd ? "text" : "password"}
          autoComplete="new-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowConfirmNewPwd((show) => !show)}
                  onMouseDown={(e) => e.preventDefault()}
                  edge="end"
                >
                  {showConfirmNewPwd ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* signIn button */}
        <Box
          sx={{
            my: 1,
            position: "relative",
            width: "100%",
            height: "53px",
          }}
        >
          <Button
            sx={{
              height: "100%",
            }}
            fullWidth
            variant="contained"
            type="submit"
            disabled={isSubmitting}
          >
            Reset password
          </Button>
          {isSubmitting && (
            <CircularProgress
              size={24}
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
    </Box>
  );
};

export default ChangePwd;

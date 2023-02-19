import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { shades } from "../../theme";
import Oauth from "./Oauth";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useFormik } from "formik";
import * as yup from "yup";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../state/userSlice";
import logo from "../../assets/smallLogo.svg";

export default function SignUp() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    firstName: yup.string().trim().min(3, "Too Short!").required("Required"),
    email: yup.string().trim().email("Invalid email").required("Required"),
    password: yup
      .string()
      .trim()
      .required("Required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: yup
      .string()
      .required("Required")
      .oneOf([yup.ref("password"), null], "Passwords don't match."),
  });

  const handleFormSubmit = (values, { resetForm, setSubmitting }) => {
    const args = { values, resetForm, setSubmitting, navigate };
    dispatch(register(args));
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
        maxWidth: "400px",
        padding: "20px",
        margin: "30px auto auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Link to="/">
        <img
          style={{ width: "32px", marginBottom: "30px" }}
          src={logo}
          alt="logo"
        />
      </Link>
      <Typography color={shades.primary[400]} fontSize="28px" fontWeight="bold">
        Create your account
      </Typography>
      <Box noValidate component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <Grid container spacing={1.9}>
          <Grid item xs={6}>
            <TextField
              required
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.firstName}
              error={!!touched.firstName && !!errors.firstName} //converting value to a boolean
              helperText={touched.firstName && errors.firstName}
              autoComplete="given-name"
              name="firstName"
              fullWidth
              id="firstName"
              label="First Name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.lastName}
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              error={!!touched.email && !!errors.email} //converting value to a boolean
              helperText={touched.email && errors.email}
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              error={!!touched.password && !!errors.password} //converting value to a boolean
              helperText={touched.password && errors.password}
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.confirmPassword}
              error={!!touched.confirmPassword && !!errors.confirmPassword} //converting value to a boolean
              helperText={touched.confirmPassword && errors.confirmPassword}
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="confirm-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              sx={{ marginBottom: 1 }}
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive inspiration, marketing promotions and updates via email."
            />
          </Grid>
        </Grid>

        {/* signUp button */}
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
            Sign Up
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

        <Typography color={shades.primary[400]} textAlign="center">
          Already have an account?{" "}
          <Link style={{ color: "#0066C0" }} to="/signin">
            Sign in
          </Link>
        </Typography>
      </Box>
      <Oauth />
    </Box>
  );
}

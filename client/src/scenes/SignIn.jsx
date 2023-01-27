import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { shades } from "../theme";
import { Link, useNavigate } from "react-router-dom";
import Oauth from "./Oauth";
import { useFormik } from "formik";
import * as yup from "yup";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import { login } from "../state/userSlice";
import { useDispatch } from "react-redux";

export default function SignIn() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().trim().email("Invalid email").required("Required"),
    password: yup.string().trim().required("Required"),
  });

  const handleFormSubmit = (values, { resetForm, setSubmitting }) => {
    setTimeout(
      () => dispatch(login(values, resetForm, setSubmitting, toast, navigate)),
      3000
    );
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
      // border={1}
      sx={{
        maxWidth: "360px",
        padding: "20px",
        margin: "30px auto auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography color={shades.primary[400]} fontSize="28px" fontWeight="bold">
        Welcome back
      </Typography>
      <Box
        // border={1}
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{ mt: 2 }}
      >
        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          error={!!touched.email && !!errors.email} //converting value to a boolean
          helperText={touched.email && errors.email}
          sx={{
            margin: "5px 0",
          }}
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
        />

        <TextField
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          error={!!touched.password && !!errors.password} //converting value to a boolean
          helperText={touched.password && errors.password}
          sx={{
            margin: "5px 0",
          }}
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          autoComplete="current-password"
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
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
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
            Sign in
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
          Don't have an account?{" "}
          <Link
            style={{ color: "#000000", textDecoration: "none" }}
            to="/signup"
          >
            Sign Up
          </Link>
        </Typography>
      </Box>
      <Oauth />
    </Box>
  );
}

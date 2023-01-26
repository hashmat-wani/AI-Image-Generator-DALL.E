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
import { toaster } from "../utils";
import axios from "axios";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";

export default function SignIn() {
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
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
    const { email, password } = values;
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .post("http://localhost:8080/api/v1/auth/login", {
        email: email.trim(),
        password: password.trim(),
      })

      .then((data) => {
        // navigate("/signin");
        // resetForm();
        console.log(data.data);

        toaster(toast, "Success", "You've successfully signed in!", "success");
      })
      .catch((err) => {
        const { message } = err?.response?.data || err;
        toaster(toast, "Failed", message, "error");
        console.log(err?.response?.data?.message || err.message);
      })
      .finally(() => setSubmitting(false));
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
          autoFocus
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            my: 1,
            height: "53px",
          }}
        >
          Sign In
        </Button>
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

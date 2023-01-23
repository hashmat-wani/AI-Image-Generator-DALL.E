import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FlexBox } from "../components/common/FlexBox";
import { shades } from "../theme";
import { Link } from "react-router-dom";
import { Divider } from "@mui/material";
import Oauth from "./Oauth";
export default function SignIn() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      // border={1}
      sx={{
        width: "320px",
        margin: "40px auto auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <Typography color={shades.primary[400]} fontSize="32px" fontWeight="bold">
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
        {/* <TextField
            required
            name="title"
            value={formData.title}
            {...(errors.title
              ? { error: true, label: errors.title }
              : { label: "Title" })}
            variant="outlined"
            size="small"
            onChange={handleFormData}
          /> */}

        <TextField
          sx={{
            margin: "5px 0",
          }}
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
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

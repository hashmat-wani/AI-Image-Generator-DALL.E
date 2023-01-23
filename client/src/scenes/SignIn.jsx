import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { shades } from "../theme";
import { Link } from "react-router-dom";
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

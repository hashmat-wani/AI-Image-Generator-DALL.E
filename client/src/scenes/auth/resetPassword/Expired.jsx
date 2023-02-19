import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import logo from "../../../assets/smallLogo.svg";

const Expired = () => {
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
      <Box
        sx={{
          border: "2px solid#d00e17",
          borderRadius: "50%",
          width: "70px",
          height: "70px",
          display: "grid",
          placeItems: "center",
        }}
      >
        <ClearIcon
          sx={{
            m: 0,
            fontSize: "50px",
            color: "#d00e17",
          }}
        />
      </Box>

      <Box sx={{ textAlign: "center", my: "15px" }}>
        <Typography fontSize="24px" my="10px">
          Link Expired
        </Typography>
        <Typography my="20px">
          To reset your password, return to the{" "}
          <Link style={{ color: "#0066C0" }} to="/signin">
            login
          </Link>{" "}
          page and select "Forgot Your Password" to send a new email.
        </Typography>
      </Box>
    </Stack>
  );
};

export default Expired;

import React from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";

const DisplayAlert = ({ type, title, message, action, cb }) => {
  return (
    <Stack sx={{ width: "100%" }} height="120px" justifyContent="center">
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {message} —{" "}
        <strong onClick={cb} style={{ cursor: "pointer" }}>
          {action}!
        </strong>
      </Alert>
    </Stack>
  );
};

export default DisplayAlert;

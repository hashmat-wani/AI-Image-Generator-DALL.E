import React from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";

const DisplayAlert = ({ type, title, message, action, cb }) => {
  return (
    <Stack sx={{ my: "20px", width: "100%" }} justifyContent="center">
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {message}
        {action && (
          <strong onClick={cb} style={{ cursor: "pointer" }}>
            — {action}!
          </strong>
        )}
      </Alert>
    </Stack>
  );
};

export default DisplayAlert;

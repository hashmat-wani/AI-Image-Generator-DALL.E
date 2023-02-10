import React from "react";
import { LinearProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack height="120px" spacing={2} justifyContent="center">
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
      <LinearProgress color="inherit" />
    </Stack>
  );
}

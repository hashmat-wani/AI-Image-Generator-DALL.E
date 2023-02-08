import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { shades } from "../../../theme";
import DeactivateAccPopup from "./DeactivateAccPopup";

const Deactivate = ({ status }) => {
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Box mb="35px">
      <DeactivateAccPopup {...{ openDialog, setOpenDialog, status }} />
      <Typography color={shades.primary[400]} fontSize="22px">
        Deactivate account
      </Typography>
      <Typography my="2px" color={shades.primary[300]}>
        You can reactivate your account by logging back in.
      </Typography>
      <Box
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          p: "20px",
          mt: "20px",
        }}
      >
        <Typography color={shades.primary[400]} fontSize="16px" mb="20px">
          Deactivate your account
        </Typography>
        <Typography color={shades.primary[300]} my="15px">
          Deactivating your account will hide all your shared posts from a
          showcase community.
        </Typography>
        <Button
          onClick={() => setOpenDialog(true)}
          variant="contained"
          sx={{
            width: { xs: "100%", md: "110px" },
            padding: "9px",
          }}
        >
          Deactivate
        </Button>
      </Box>
    </Box>
  );
};

export default Deactivate;

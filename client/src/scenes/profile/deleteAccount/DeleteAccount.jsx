import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { shades } from "../../../theme";
import DeleteAccPopup from "./DeleteAccPopup";

const DeleteAccount = ({ user, status }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Box>
      <DeleteAccPopup {...{ openDialog, setOpenDialog, user, status }} />

      <Typography color="#ff6b60" fontSize="22px">
        Danger zone
      </Typography>
      <Typography my="2px" color={shades.primary[300]}>
        Irreversible and destructive actions
      </Typography>
      <Box
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
          p: "20px",
          mt: "20px",
        }}
      >
        <Typography color={shades.primary[400]} fontSize="16px" mb="20px">
          Delete your account
        </Typography>
        <Typography color={shades.primary[300]} my="15px">
          Once you delete an account, there is no going back.
        </Typography>
        <Button
          onClick={() => setOpenDialog(true)}
          sx={{
            background: "#ff6b60",
            width: { xs: "100%", md: "110px" },
            padding: "9px",
          }}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteAccount;

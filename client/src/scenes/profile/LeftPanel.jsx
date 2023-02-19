import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { shades } from "../../theme";
import { resolvePath } from "../../utils";
import ChangePassword from "./ChangePassword";
import UpdateAvatar from "./UpdateAvatar";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const LeftPanel = ({ user, status }) => {
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openPwdDialog, setOpenPwdDialog] = useState(false);

  return (
    <Box
      // border={1}
      sx={{
        flex: 1,
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <UpdateAvatar
        {...{ user, status, openAvatarDialog, setOpenAvatarDialog }}
      />
      <ChangePassword {...{ openPwdDialog, setOpenPwdDialog }} />

      {/* AVATAR */}
      <Box
        // border={1}
        p="0 20px 20px"
        position="relative"
      >
        {user?.avatar ? (
          <img
            style={{
              width: "170px",
              height: "170px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={resolvePath(user?.avatar?.url)}
            alt="avatar"
          />
        ) : (
          <Avatar sx={{ bgcolor: green[500], width: "170px", height: "170px" }}>
            <Typography fontSize="106px">
              {user.firstName[0].toUpperCase()}
            </Typography>
          </Avatar>
        )}

        <IconButton
          onClick={() => setOpenAvatarDialog(true)}
          sx={{
            position: "absolute",
            right: 0,
            bottom: "15px",
          }}
        >
          <EditOutlinedIcon />
        </IconButton>
      </Box>

      {/* Details */}
      <Box>
        <Typography textAlign="center" fontSize="15px" fontWeight="bold">
          {user.firstName} {user?.lastName}
        </Typography>
        <Typography textAlign="center" color={shades.primary[300]}>
          Human
        </Typography>
        <Button
          onClick={() => setOpenPwdDialog(true)}
          variant="contained"
          sx={{
            my: "20px",
          }}
        >
          Change password
        </Button>
      </Box>
      <Link style={{ marginTop: "auto" }} to="/terms" target="_blank">
        <Typography color={shades.primary[300]}>Terms</Typography>
      </Link>
    </Box>
  );
};

export default LeftPanel;

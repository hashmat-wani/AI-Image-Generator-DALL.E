import { Avatar, Box, IconButton, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { shades } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UpdateAvatar from "./UpdateAvatar";
import { resolvePath } from "../../utils";
import { green } from "@mui/material/colors";
import ChangePassword from "./ChangePassword";

const Profile = () => {
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);
  const [openPwdDialog, setOpenPwdDialog] = useState(false);

  const { user, status } = useSelector(
    (state) => state.userReducer,
    shallowEqual
  );
  return (
    <>
      {user && (
        <Box
          //   border={1}
          sx={{
            maxWidth: "400px",
            padding: "0px",
            margin: "30px auto auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "20px",
            height: "calc(100vh - 130px)",
          }}
        >
          <UpdateAvatar
            {...{ user, status, openAvatarDialog, setOpenAvatarDialog }}
          />
          <ChangePassword {...{ openPwdDialog, setOpenPwdDialog }} />

          {/* AVATAR */}
          <Box padding="20px" position="relative">
            {user.avatar ? (
              <img
                style={{
                  width: "170px",
                  height: "170px",
                  borderRadius: "50%",
                  objectFit: "contain",
                }}
                src={resolvePath(user.avatar)}
                alt="avatar"
              />
            ) : (
              <Avatar
                sx={{ bgcolor: green[500], width: "170px", height: "170px" }}
              >
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
                mt: "15px",
              }}
            >
              Change password
            </Button>
          </Box>
          <Link style={{ marginTop: "auto" }} to="/terms">
            <Typography color={shades.primary[300]}>Terms</Typography>
          </Link>
        </Box>
      )}
    </>
  );
};

export default Profile;

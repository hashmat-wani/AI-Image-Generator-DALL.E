import { Avatar, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { shades } from "../../theme";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import UpdateAvatar from "./UpdateAvatar";
import { resolvePath } from "../../utils";
import { green } from "@mui/material/colors";

const Profile = () => {
  const [open, setOpen] = React.useState(false);

  const { user } = useSelector((state) => state.userReducer, shallowEqual);
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
          <UpdateAvatar user={user} open={open} setOpen={setOpen} />
          <Box padding="20px" position="relative" border={1}>
            {user.avatar ? (
              <img
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "50%",
                  objectFit: "contain",
                }}
                src={resolvePath(user.avatar)}
                alt="avatar"
              />
            ) : (
              <Avatar
                sx={{ bgcolor: green[500], width: "200px", height: "200px" }}
              >
                <Typography fontSize="106px">
                  {user.firstName[0].toUpperCase()}
                </Typography>
              </Avatar>
            )}

            <IconButton
              onClick={() => setOpen(true)}
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
            <Typography fontSize="15px" fontWeight="bold">
              {user.firstName} {user?.lastName}
            </Typography>
            <Typography textAlign="center" color={shades.primary[300]}>
              Human
            </Typography>
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

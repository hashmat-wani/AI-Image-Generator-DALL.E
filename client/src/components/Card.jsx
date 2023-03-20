import React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { resolvePath } from "../utils";
import { shades } from "../theme";

const Card = ({
  _id,
  image,
  prompt,
  user,
  setOpenPost,
  setOpenPostData,
  community,
  personal,
}) => {
  return (
    <Box
      onClick={() => {
        setOpenPostData({ image, prompt, _id });
        setOpenPost(true);
      }}
      sx={{
        cursor: "pointer",
        ":hover > div": {
          display: { md: "flex" },
        },
      }}
      position="relative"
    >
      <Box
        sx={{
          display: "none",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fafafcf2",
          padding: "15px",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Typography
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: { md: 2, lg: 4 },
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          fontSize="16px"
          fontFamily="'Noto Serif JP', serif"
        >
          {prompt}
        </Typography>

        <Box alignItems="end" display="flex" justifyContent="space-between">
          <Box>
            {user?.avatar ? (
              <Avatar src={resolvePath(user?.avatar?.url)} />
            ) : (
              <Avatar
                sx={{
                  bgcolor: green[500],
                }}
              >
                {user.firstName[0].toUpperCase()}
              </Avatar>
            )}
            <Typography sx={{ mt: "5px" }}>{user?.firstName}</Typography>
          </Box>
          <Typography fontSize="16px" color={shades.primary[300]}>
            {community ? "Click to try" : "Click to view"}
          </Typography>
        </Box>
      </Box>
      <img
        style={{ width: "100%", height: "100%" }}
        src={image.url}
        loading="lazy"
        alt="posts"
      />
    </Box>
  );
};

export default Card;

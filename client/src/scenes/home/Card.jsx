import React, { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { resolvePath } from "../../utils";
import { shades } from "../../theme";
import PostPreviewModal from "./PostPreviewModal";

const Card = ({ image, prompt, user, setOpenPost, setOpenPostData }) => {
  return (
    <>
      <Box
        onClick={() => {
          setOpenPostData({ image, prompt });
          setOpenPost(true);
        }}
        sx={{
          ":hover > div": {
            display: "flex",
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
            cursor: "pointer",
          }}
        >
          <Typography fontSize="16px" fontFamily="'Noto Serif JP', serif">
            {prompt.length >= 100 ? prompt.slice(0, 97) + "..." : prompt}
          </Typography>
          <Box alignItems="end" display="flex" justifyContent="space-between">
            <Box>
              {user?.avatar ? (
                <Avatar src={resolvePath(user?.avatar)} />
              ) : (
                <Avatar
                  sx={{
                    bgcolor: green[500],
                  }}
                >
                  {user.firstName[0].toUpperCase()}
                </Avatar>
              )}
              <Typography>
                {user?.firstName} {user?.lastName}
              </Typography>
            </Box>
            <Typography fontSize="16px" color={shades.primary[300]}>
              Click to try
            </Typography>
          </Box>
        </Box>
        <img
          style={{ width: "100%", height: "100%" }}
          src={image}
          alt="posts"
        />
      </Box>
    </>
  );
};

export default Card;

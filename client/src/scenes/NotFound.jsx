import { Button, styled, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { shades } from "../theme";

const NotFound = () => {
  const { posts } = useSelector((state) => state.postsReducer, shallowEqual);
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 767px)");
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column-reverse", md: "column" }}
      maxWidth="660px"
      px="15px"
      m="auto"
    >
      {/* some dummy image */}
      <Grid mobile={isMobile.toString()}>
        {posts.slice(0, 6).map((post, idx) => (
          <Box
            sx={{
              ":hover > div": {
                display: { sm: "block" },
              },
            }}
            key={idx}
            position="relative"
          >
            <Box
              sx={{
                display: "none",
                backgroundColor: "#fafafcf2",
                padding: "15px",
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <Box
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 5,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                <Typography fontSize="18px" fontFamily="'Noto Serif JP', serif">
                  {post.prompt}
                </Typography>
              </Box>
            </Box>
            <img
              style={{ width: "100%" }}
              src={post.image.url}
              alt="demoimages"
            />
          </Box>
        ))}
      </Grid>

      {/* Details */}
      <Box mt="20px" mb="40px" textAlign="center">
        <Typography fontSize="20px">Page not found</Typography>
        <Typography my={2} fontSize="15px" color={shades.primary[300]}>
          We couldn't find the page you were looking for.
        </Typography>
        <Button
          onClick={() => navigate("/")}
          sx={{
            background: shades.secondary[300],
            textTransform: "none",
            fontSize: "12px",
            padding: "6px 10px",
          }}
        >
          Return to homepage
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;

const Grid = styled(Box)(({ mobile }) => ({
  margin: "20px 0",
  display: "grid",
  gap: "15px",
  gridTemplateColumns: `${
    mobile === "true" ? "repeat(2, 1fr)" : "repeat(3, 1fr)"
  }`,
}));

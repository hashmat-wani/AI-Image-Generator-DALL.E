import { Box, styled, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FlexBox } from "../../components/common/FlexBox";
import { shades } from "../../theme";
import { downloadImage } from "../../utils/getRandomPrompt";
import { shallowEqual, useSelector } from "react-redux";

const SingleImageDashboard = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const navigate = useNavigate();
  const { photos } = useSelector((state) => state.formReducer, shallowEqual);

  const { id } = useParams();

  let { photo } = photos.find((photo) => photo.id == id);

  return (
    <Box display="flex" flexDirection="column" p="25px 15px" height="100vh">
      <FlexBox justifyContent="space-between">
        {/* back */}
        <FlexBox
          onClick={() => navigate("/search")}
          sx={{
            transition: "0.2s",
            fontWeight: "bold",
            borderRadius: "5px",
            columnGap: "5px",
            p: `${isMobile ? "10px 0" : "10px"}`,
            cursor: "pointer",
            ":hover": {
              background: `${!isMobile && `${shades.secondary[300]}`}`,
            },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: "15px" }} />
          Back
        </FlexBox>

        {/* Share/download desktop version */}
        {!isMobile && (
          <FlexBox columnGap="10px">
            <Btn onClick={() => downloadImage(id, photo)}>Download</Btn>
            <Btn>Share</Btn>
          </FlexBox>
        )}
      </FlexBox>
      <Outlet />
      {isMobile && (
        <Typography variant="small" color={shades.primary[300]}>
          Once you've created the image you want, you can share it with others
          in the community
        </Typography>
      )}
      {isMobile && (
        <FlexBox mt="auto" columnGap="10px">
          <Btn
            mobile={isMobile.toString()}
            p="20px"
            textAlign="center"
            flex={1}
            onClick={() => downloadImage(id, photo)}
          >
            Download
          </Btn>
          <Btn mobile={isMobile.toString()} textAlign="center" flex={1}>
            Share
          </Btn>
        </FlexBox>
      )}
    </Box>
  );
};

export default SingleImageDashboard;

const Btn = styled(Box)(({ mobile }) => ({
  fontWeight: "bold",
  transition: "0.2s",
  cursor: "pointer",
  padding: `${mobile === "true" ? "20px" : "10px"}`,
  background: `${shades.secondary[300]}`,
  borderRadius: "5px",
  ":hover": {
    background: `${shades.secondary[100]}`,
  },
}));

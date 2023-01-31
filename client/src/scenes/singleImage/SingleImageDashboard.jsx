import {
  Box,
  CircularProgress,
  styled,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import React from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FlexBox } from "../../components/FlexBox";
import { shades } from "../../theme";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { downloadImage, STATUS } from "../../utils";
import { createPost } from "../../state/postsSlice";

const SingleImageDashboard = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { formReducer, postsReducer } = useSelector(
    (state) => state,
    shallowEqual
  );
  const { images, prompt } = formReducer;
  const { status } = postsReducer;
  const shareBtnlabel =
    "Once you've created the image you want, you can share it with others in the community";

  const handleShare = () => {
    dispatch(createPost(image, prompt));
  };

  const handleDownload = () => {
    downloadImage(id, image);
  };

  const { id } = useParams();

  let { image } = images.find((node) => node.id == id);

  return (
    <Box
      // border={1}
      display="flex"
      flexDirection="column"
      p={{ xs: "15px 5%", md: "30px 5%" }}
      minHeight="calc(100vh - 70px)"
    >
      <FlexBox mb={{ xs: "15px", md: "30px" }} justifyContent="space-between">
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
            <Btn onClick={handleDownload}>Download</Btn>
            <Box title={shareBtnlabel} position="relative">
              <Btn disabled={status === STATUS.LOADING} onClick={handleShare}>
                Share
              </Btn>
              {status === STATUS.LOADING && (
                <CircularProgress
                  size={18}
                  sx={{
                    position: "absolute",
                    color: "#1d2226",
                    left: "50%",
                    top: "50%",
                    mt: "-11px",
                    ml: "-9px",
                  }}
                />
              )}
            </Box>
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
        <FlexBox pt="30px" mt="auto" columnGap="10px">
          <Box flex={1}>
            <Btn
              fullWidth
              mobile={isMobile.toString()}
              onClick={handleDownload}
            >
              Download
            </Btn>
          </Box>
          <Box flex={1} title={shareBtnlabel} position="relative">
            <Btn
              fullWidth
              mobile={isMobile.toString()}
              disabled={status === STATUS.LOADING}
              onClick={handleShare}
            >
              Share
            </Btn>
            {status === STATUS.LOADING && (
              <CircularProgress
                size={18}
                sx={{
                  position: "absolute",
                  color: "#1d2226",
                  left: "50%",
                  top: "50%",
                  mt: "-10px",
                  ml: "-9px",
                }}
              />
            )}
          </Box>
        </FlexBox>
      )}
    </Box>
  );
};

export default SingleImageDashboard;

const Btn = styled(Button)(({ mobile }) => ({
  fontWeight: "bold",
  transition: "0.2s",
  padding: `${mobile === "true" ? "20px" : "10px"}`,
  background: `${shades.secondary[300]}`,
  borderRadius: "5px",
  ":hover": {
    background: `${shades.secondary[100]}`,
  },
}));

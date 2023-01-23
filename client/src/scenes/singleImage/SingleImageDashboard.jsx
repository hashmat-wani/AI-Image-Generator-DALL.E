import { Box, styled } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { FlexBox } from "../../components/common/FlexBox";
import { shades } from "../../theme";

const SingleImageDashboard = () => {
  return (
    <Box>
      <FlexBox border={1} mb="50px" justifyContent="space-between">
        {/* back */}
        <FlexBox
          // border={1}
          sx={{
            transition: "0.2s",
            fontWeight: "bold",
            borderRadius: "5px",
            columnGap: "5px",
            p: "10px",
            cursor: "pointer",
            ":hover": { background: `${shades.secondary[300]}` },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: "15px" }} />
          Back
        </FlexBox>

        {/* Share/download */}
        <FlexBox columnGap="10px">
          <Btn>Share</Btn>
          <Btn>Download</Btn>
        </FlexBox>
      </FlexBox>
      <Outlet />
    </Box>
  );
};

export default SingleImageDashboard;

const Btn = styled(Box)({
  fontWeight: "bold",
  transition: "0.2s",
  cursor: "pointer",
  padding: "10px",
  background: `${shades.secondary[300]}`,
  borderRadius: "5px",
  ":hover": {
    background: `${shades.secondary[100]}`,
  },
});

import { Divider, Typography } from "@mui/material";
import React from "react";
import { FlexBox } from "../components/common/FlexBox";
import googleLogo from "../assets/googleLogo.png";
import fbLogo from "../assets/fbLogo.png";
import { shades } from "../theme";

const oauth = ["Continue with Google", "Continue with Facebook"];

const Oauth = () => {
  return (
    <>
      <Divider
        sx={{
          my: "15px",
          width: "100%",
        }}
        color="red"
      >
        OR
      </Divider>
      {oauth.map((el, idx) => (
        <FlexBox
          key={idx}
          my="4px"
          width="100%"
          p="13px 15px"
          columnGap="15px"
          sx={{
            border: `1px solid ${shades.primary[200]}`,
            borderRadius: "4px",
          }}
        >
          <img width="25px" src={!idx ? googleLogo : fbLogo} />
          <Typography fontSize="15px" color={shades.primary[400]}>
            {el}
          </Typography>
        </FlexBox>
      ))}
    </>
  );
};

export default Oauth;
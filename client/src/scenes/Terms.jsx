import { Box, styled, Typography } from "@mui/material";
import React from "react";

const Terms = () => {
  return (
    <Box color="#191927" maxWidth="780px" margin="0 auto" padding="64px 20px">
      <Text sx={{ fontSize: "46px" }}>Terms of Use</Text>
      <Typography color="#19192780" sx={{ fontSize: "15px", pt: "10px" }}>
        Last modified February 04, 2023
      </Typography>
      <br />
      <br />
      <Text>Thank you for using OpenAI!</Text>
      <br />
      <Text>
        These Terms of Use apply when you use the products and services of
        OpenAI, L.L.C. or our affiliates, including our application programming
        interface, software, tools, developer services, data, documentation, and
        website (“Services”). The Terms include our Service Terms, Sharing &
        Publication Policy, Usage Policies, and other documentation, guidelines,
        or policies we may provide in writing. By using our Services, you agree
        to these Terms. Our Privacy Policy explains how we collect and use
        personal information.
      </Text>
    </Box>
  );
};

export default Terms;

const Text = styled(Typography)({
  fontSize: "18px",
  fontFamily: "'Noto Serif JP', serif",
});

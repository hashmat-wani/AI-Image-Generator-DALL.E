import { Box, styled, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Box color="#191927" maxWidth="780px" margin="0 auto" padding="64px 20px">
      <Text sx={{ fontSize: "46px" }}>About DALL·E</Text>
      <Typography color="#19192780" sx={{ fontSize: "15px", pt: "10px" }}>
        Updated January 30, 2023
      </Typography>
      <br />
      <br />
      <Text>
        DALL·E is an AI system developed by OpenAI that can create original,
        realistic images and art from a short text description.
      </Text>
      <br />
      <Text>
        It can make realistic and context-aware edits, including inserting,
        removing, or retouching specific sections of an image from a natural
        language description. It can also take an image and make novel and
        creative variations of it inspired by the original.
      </Text>
      <br />
      <TextBold>How DALL·E Works</TextBold>
      <br />
      <ul style={{ paddingLeft: "40px" }}>
        <br />
        <li style={{ "li::marker": { color: "red" } }}>
          <Text>
            DALL·E was trained by learning the relationship between images and
            the text used to describe them.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            It uses a process called diffusion, which starts with a pattern of
            random dots and gradually alters that pattern towards a final
            output.
          </Text>
        </li>
        <br />
      </ul>
      <TextBold>DALL·E Credits</TextBold>
      <br />
      <ul style={{ paddingLeft: "40px" }}>
        <br />
        <li style={{ "li::marker": { color: "red" } }}>
          <Text>
            A credit can be used for one DALL·E request: generating images
            through a text prompt, an edit request, or a variation request.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            You get 50 free credits your first month, and 15 free credits will
            refill every month after that. Free credits don’t roll over, so
            they’ll expire a month after they were granted.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            You can purchase additional credits through your account page.
          </Text>
        </li>
        <br />
      </ul>
      <TextBold>Usage & Rights</TextBold>
      <br />
      <ul style={{ paddingLeft: "40px" }}>
        <br />
        <li style={{ "li::marker": { color: "red" } }}>
          <Text>
            Subject to the Content Policy and Terms, you own the images you
            create with DALL·E, including the right to reprint, sell, and
            merchandise – regardless of whether an image was generated through a
            free or paid credit.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            You can visit the OpenAI API site to use DALL·E programmatically.
          </Text>
        </li>
        <br />
      </ul>
    </Box>
  );
};

export default About;

const Text = styled(Typography)({
  fontSize: "18px",
  fontFamily: "'Noto Serif JP', serif",
});
const TextBold = styled("span")({
  fontSize: "20px",
  fontWeight: "bold",
  fontFamily: "'Noto Serif JP', serif",
});

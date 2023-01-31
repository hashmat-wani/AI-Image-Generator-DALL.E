import { Box, styled, Typography } from "@mui/material";
import React from "react";

const Policy = () => {
  return (
    <Box color="#191927" maxWidth="780px" margin="0 auto" padding="64px 20px">
      <Text sx={{ fontSize: "46px" }}>Content policy</Text>
      <Typography color="#19192780" sx={{ fontSize: "15px", pt: "10px" }}>
        Updated January 29, 2023
      </Typography>
      <br />
      <br />
      <Text>Thank you for trying our generative AI tools!</Text>
      <br />
      <Text>In your usage, you must adhere to our Content Policy:</Text>
      <br />
      <TextBold>
        Do not attempt to create, upload, or share images that are not G-rated
        or that could cause harm.
      </TextBold>
      <br />
      <ul style={{ paddingLeft: "40px" }}>
        <br />
        <li style={{ "li::marker": { color: "red" } }}>
          <Text>
            <TextBold>Hate:</TextBold> hateful symbols, negative stereotypes,
            comparing certain groups to animals/objects, or otherwise expressing
            or promoting hate based on identity.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            <TextBold>Harassment:</TextBold> mocking, threatening, or bullying
            an individual.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            <TextBold>Violence:</TextBold> violent acts and the suffering or
            humiliation of others.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            <TextBold>Self-harm:</TextBold> suicide, cutting, eating disorders,
            and other attempts at harming oneself.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            <TextBold>Sexual:</TextBold> nudity, sexual acts, sexual services,
            or content otherwise meant to arouse sexual excitement.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            <TextBold>Shocking:</TextBold> bodily fluids, obscene gestures, or
            other profane subjects that may shock or disgust.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            <TextBold>Illegal activity:</TextBold> drug use, theft, vandalism,
            and other illegal activities.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            <TextBold>Deception:</TextBold> major conspiracies or events related
            to major ongoing geopolitical events.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            <TextBold>Political:</TextBold> politicians, ballot-boxes, protests,
            or other content that may be used to influence the political process
            or to campaign.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            <TextBold>Public and personal health:</TextBold> the treatment,
            prevention, diagnosis, or transmission of diseases, or people
            experiencing health ailments.
          </Text>
        </li>
        <br />
      </ul>
      <TextBold>Don’t mislead your audience about AI involvement.</TextBold>
      <br />
      <ul style={{ paddingLeft: "40px" }}>
        <br />
        <li style={{ "li::marker": { color: "red" } }}>
          <Text>
            When sharing your work, we encourage you to proactively disclose AI
            involvement in your work.
          </Text>
        </li>
        <br />
        <li>
          <Text>
            You may remove the DALL·E signature if you wish, but you may not
            mislead others about the nature of the work. For example, you may
            not tell people that the work was entirely human generated or that
            the work is an unaltered photograph of a real event.
          </Text>
        </li>
        <br />
      </ul>
      <TextBold>Respect the rights of others.</TextBold>
      <br />
      <ul style={{ paddingLeft: "40px" }}>
        <br />
        <li style={{ "li::marker": { color: "red" } }}>
          <Text>Do not upload images of people without their consent.</Text>
        </li>
        <br />
        <li>
          <Text>
            Do not upload images to which you do not hold appropriate usage
            rights.
          </Text>
        </li>
        <br />
        <li>
          <Text>Do not create images of public figures.</Text>
        </li>
        <br />
      </ul>
    </Box>
  );
};

export default Policy;

const Text = styled(Typography)({
  fontSize: "18px",
  fontFamily: "'Noto Serif JP', serif",
});
const TextBold = styled("span")({
  fontSize: "20px",
  fontWeight: "bold",
  fontFamily: "'Noto Serif JP', serif",
});

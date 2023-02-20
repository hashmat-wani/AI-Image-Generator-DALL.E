import React from "react";
import logo from "../../assets/whiteLogo.svg";
import freecodecampLogo from "../../assets/freecodecampLogo.png";

import { Box, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import TwitterIcon from "@mui/icons-material/Twitter";
import { FlexBox } from "../../components/FlexBox";
import { Link, useLocation } from "react-router-dom";
import { shades } from "../../theme";

const quickLinks = [
  { title: "About", url: "/about" },
  { title: "Content policy", url: "/policies/content-policy" },
  { title: "Terms of Use", url: "terms" },
];

const Footer = () => {
  const { pathname } = useLocation();

  if (["/", "/policies/content-policy", "/about", "/terms"].includes(pathname))
    return (
      <Box
        p="30px 5% 20px"
        backgroundColor={shades.secondary[900]}
        color="white"
      >
        {/* header logo*/}
        <Box>
          <img width="130px" style={{ color: "red" }} src={logo} alt="" />
        </Box>
        {/* content grid items*/}
        <Box
          my="50px"
          sx={{
            display: { xs: "flex", sm: "grid" },
            flexDirection: { xs: "column-reverse" },
            gap: "30px",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
          }}
        >
          {/* Contact Information */}
          <Box>
            <Typography mb="10px" fontWeight="bold">
              Contact
            </Typography>
            <Typography mt="2px" fontSize="15px">
              BTM Layout Bangalore 560076
            </Typography>
            <Typography mt="2px" fontSize="15px">
              <a style={{ fontSize: "15px" }} href="mailto: abc@example.com">
                hashmatwani@icloud.com
              </a>
            </Typography>
            <Typography mt="2px">
              <a style={{ fontSize: "15px" }} href="tel:7006600835">
                +91 7006600835
              </a>
            </Typography>
          </Box>
          {/* Quick Links */}
          <Box>
            <Typography mb="10px" fontWeight="bold">
              Quick Links
            </Typography>
            {quickLinks.map((node, idx) => (
              <Link key={idx} to={node.url} target="_blank">
                <Typography mt="2px" fontSize="15px">
                  {node.title}
                </Typography>
              </Link>
            ))}
          </Box>

          {/* About */}
          <Box>
            <Typography mb="10px" fontWeight="bold">
              About
            </Typography>
            <Typography fontSize="13px">
              DALL·E is an AI system developed by OpenAI that can create
              original, realistic images and art from a short text description.
              DALL·E was trained by learning the relationship between images and
              the text used to describe them. It uses a process called
              diffusion, which starts with a pattern of random dots and
              gradually alters that pattern towards a final output.
            </Typography>
          </Box>
        </Box>
        {/* footer social links*/}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column-reverse", md: "row" },
            alignItems: "center",
            justifyContent: { xs: "center", md: "space-between" },
            gap: "10px",
          }}
        >
          <Typography fontSize="16px" fontFamily="'Noto Serif JP', serif">
            hashtech © 2017–2023
          </Typography>
          <FlexBox gap={4} justifyContent="flex-end">
            <a
              rel="noreferrer"
              href="https://github.com/hashmat-noorani"
              title="github"
              target="_blank"
            >
              <GitHubIcon />
            </a>
            <a
              rel="noreferrer"
              href="https://www.linkedin.com/in/hashmat-noorani/"
              title="Linkedin"
              target="_blank"
            >
              <LinkedInIcon />
            </a>
            <a
              rel="noreferrer"
              href="https://www.facebook.com/hwx.75"
              title="facebook"
              target="_blank"
            >
              <FacebookTwoToneIcon />
            </a>
            <a
              rel="noreferrer"
              href="https://twitter.com/hashmatwani_x"
              title="Twitter"
              target="_blank"
            >
              <TwitterIcon />
            </a>
            <a
              rel="noreferrer"
              href="https://www.freecodecamp.org/HashmatNoorani"
              title="freeCodeCamp"
              target="_blank"
            >
              <img
                style={{ marginTop: "-5px" }}
                width="20px"
                src={freecodecampLogo}
                alt=""
              />
            </a>
          </FlexBox>
        </Box>
      </Box>
    );

  return null;
};

export default Footer;

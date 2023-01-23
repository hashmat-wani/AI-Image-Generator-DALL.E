import React from "react";
import { useTheme, Box, Typography } from "@mui/material";
import { shades } from "../../theme";
const Footer = () => {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box mt="70px" p="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        m="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px 30px 40px)"
      >
        <Box width="clamp(20%,30%,40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            ECOMMERCE
          </Typography>
          <div>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quod
            molestias asperiores quos? Distinctio laborum, libero sed quia vero
            ad, ut perspiciatis dolorum quos dolore nobis reiciendis quae
            impedit consequatur sint!
          </div>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            About Us
          </Typography>
          <Typography mb="30px">Careers</Typography>
          <Typography mb="30px">Our Stores</Typography>
          <Typography mb="30px">Terms & Conditions</Typography>
          <Typography mb="30px">Privacy Policy</Typography>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Costumer Care
          </Typography>
          <Typography mb="30px">Help Center</Typography>
          <Typography mb="30px">Track Your Orders</Typography>
          <Typography mb="30px">Corporate & Bulk Purchasing</Typography>
          <Typography mb="30px">Returns & Refunds</Typography>
        </Box>

        <Box width="clamp(20%,25%,30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Us
          </Typography>
          <Typography mb="30px">
            501 BTM Layout II Stage, Bangalore 560076
          </Typography>
          <Typography mb="30px">Email: ecommerce@hashtech.com</Typography>
          <Typography mb="30px">(+91) 7006600835</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;

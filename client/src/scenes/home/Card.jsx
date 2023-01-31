import { Box } from "@mui/material";

import React from "react";

const Card = ({ image }) => {
  return (
    <Box>
      <img width="100%" height="100%" src={image} alt="" />
    </Box>
  );
};

export default Card;

import { Box } from "@mui/material";

import React from "react";

const Card = ({ post }) => {
  return (
    <Box>
      <img width="100%" height="100%" src={post} alt="" />
    </Box>
  );
};

export default Card;

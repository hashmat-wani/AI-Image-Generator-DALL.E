import { Box, styled, Typography, useMediaQuery } from "@mui/material";

import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FlexBox } from "../../components/FlexBox";
import { updateForm } from "../../state/formSlice";
import { shades } from "../../theme";
import { getRandomPrompt, STATUS } from "../../utils";
import Input from "../../components/Input";
import { Link } from "react-router-dom";

const SearchResult = () => {
  const isMobile = useMediaQuery("(max-width:767px)");

  const dispatch = useDispatch();

  const { images, prompt, status } = useSelector(
    (state) => state.formReducer,
    shallowEqual
  );
  console.log(images);

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    dispatch(updateForm({ prompt: randomPrompt }));
  };

  return (
    <Box p={{ xs: "20px 5%", md: "50px 5%" }}>
      {/* Heading */}
      <FlexBox mb="15px" justifyContent="space-between">
        <Typography color={shades.primary[300]}>
          Edit the detailed description
        </Typography>
        {!isMobile && (
          <Box
            sx={{
              cursor: "pointer",
            }}
            padding="7px 10px"
            backgroundColor="secondary.main"
            fontWeight="bold"
            fontSize="12px"
            borderRadius="5px"
            onClick={handleSurpriseMe}
          >
            Surprise me
          </Box>
        )}
      </FlexBox>
      <Input />
      {/* Photo preview */}
      {status === STATUS.LOADING && "Loading..."}
      {status === STATUS.ERROR && "Error..."}
      {status === STATUS.IDLE && (
        <Box
          mt="50px"
          gap="20px"
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
        >
          {images.length === 0
            ? "no images"
            : images.map((node) => (
                <Link to={`/search/single/${node.id}`} key={node.id}>
                  <Img src={node.image} alt={prompt} />
                </Link>
              ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchResult;

const Img = styled("img")({
  cursor: "pointer",
  width: "100%",
  height: "100%",
  ":hover": {
    transition: "0.3s",
    transform: "scale(0.96,0.96)",
  },
});

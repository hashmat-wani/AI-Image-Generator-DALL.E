import {
  Box,
  IconButton,
  Popover,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import React, { useState } from "react";
import { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FlexBox } from "../../components/common/FlexBox";
import { updateForm } from "../../state/formSlice";
import { shades } from "../../theme";
import { getRandomPrompt } from "../../utils";
import Input from "../home/Input";
import { Link, Outlet, useNavigate } from "react-router-dom";

const SearchResult = () => {
  const isMobile = useMediaQuery("(max-width:767px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { photos, prompt, status } = useSelector(
    (state) => state.formReducer,
    shallowEqual
  );

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    dispatch(updateForm({ prompt: randomPrompt }));
  };

  return (
    <Box p="25px 15px">
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
      {status === "loading" && "Loading..."}
      {status === "idle" && (
        <Box
          mt="50px"
          gap="20px"
          display="grid"
          gridTemplateColumns={{
            xs: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
        >
          {photos.map((p, idx) => (
            <Link to={`/search/single/${p.id}`} key={p.id}>
              <Img src={p.photo} alt={prompt} />
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default SearchResult;

const Img = styled("img")({
  //   border: "1px solid red",
  cursor: "pointer",
  width: "100%",
  height: "100%",
  ":hover": {
    transition: "0.3s",
    transform: "scale(0.96,0.96)",
  },
});

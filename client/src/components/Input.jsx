import {
  Button,
  CircularProgress,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React from "react";
import { shades } from "../theme";
import { FlexBox } from "./FlexBox";
import { getRandomPrompt } from "../utils/getRandomPrompt";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { generatePosts, updateForm } from "../state/formSlice";
import { useNavigate } from "react-router-dom";

const Input = () => {
  const isMobile = useMediaQuery("(max-width:767px)");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt();
    dispatch(updateForm({ prompt: randomPrompt }));
  };

  const { prompt, status } = useSelector(
    (state) => state.formReducer,
    shallowEqual
  );

  const handleGenerate = () => {
    navigate("/search");
    dispatch(generatePosts({ prompt }));
  };

  return (
    <FlexBox
      backgroundColor="white"
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
      borderRadius="8px"
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
    >
      <TextField
        onChange={(e) => dispatch(updateForm({ prompt: e.target.value }))}
        name="prompt"
        multiline={isMobile ? true : false}
        rows={3}
        fullWidth
        value={prompt}
        variant="standard"
        placeholder="An Impressionist oil painting of sunflowerrs in a purple vase..."
        sx={{
          // p: { xs: "13px 14px 40px", md: "9px 14px" },
          p: "9px 14px",
          borderBottom: `${
            isMobile ? `1px solid ${shades.secondary[200]}` : "none"
          }`,
          borderRight: `${
            !isMobile ? `1px solid ${shades.secondary[200]}` : "none"
          }`,
        }}
        InputProps={{
          disableUnderline: true,
        }}
      />
      <Button
        disabled={(!isMobile && prompt.trim() === "") || status === "loading"}
        onClick={isMobile && !prompt.trim() ? handleSurpriseMe : handleGenerate}
        sx={{
          "&:hover": { backgroundColor: "transparent" },
        }}
        style={{
          height: "47.13px",
          textTransform: "none",
          fontSize: "15px",
          fontWeight: "bold",
          color: `${!isMobile && prompt.trim() ? "#fff" : shades.primary[300]}`,
          padding: "0 20px",
          borderRadius: 0,
          background: `${
            !isMobile && prompt.trim() && status !== "loading"
              ? "#000000"
              : "transparent"
          }`,
          borderTopRightRadius: "8px",
          borderBottomRightRadius: "8px",
          cursor: "pointer",
        }}
      >
        {status === "loading" ? (
          <CircularProgress
            size={20}
            sx={{ color: `${shades.primary[300]}` }}
          />
        ) : isMobile && !prompt.trim() ? (
          "Surprise me"
        ) : (
          "Generate"
        )}
      </Button>
    </FlexBox>
  );
};

export default Input;

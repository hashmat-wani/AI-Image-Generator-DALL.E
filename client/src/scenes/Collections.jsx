import React, { useEffect, useState } from "react";
import { Box, Button, styled, Typography, useMediaQuery } from "@mui/material";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getUserCollections } from "../state/collectionsSlice";
import AppsIcon from "@mui/icons-material/Apps";
import { shades } from "../theme";
import { FlexBox } from "../components/FlexBox";
import CreateCollection from "../components/CreateCollection";
import DisplayAlert from "../components/DisplayAlert";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { STATUS } from "../utils";

const Collections = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const ismobile = useMediaQuery("(max-width:767px)");

  useEffect(() => {
    dispatch(getUserCollections());
  }, []);

  const { collections, status } = useSelector(
    (state) => state.collectionsReducer,
    shallowEqual
  );

  return (
    <Box p={{ xs: "30px 10px", md: "40px 140px" }}>
      <CreateCollection {...{ open, setOpen }} />
      <FlexBox justifyContent="space-between">
        <Typography fontWeight={600} my="30px" fontSize="24px">
          Collections
        </Typography>
        <Button
          variant="contained"
          sx={{ textTransform: "none" }}
          onClick={() => setOpen(true)}
        >
          <AddIcon
            fontSize="small"
            sx={{
              mr: "5px",
            }}
          />
          Create collection
        </Button>
      </FlexBox>

      {status === STATUS.ERROR ? (
        <DisplayAlert
          type="error"
          title="Oops..."
          message="it looks like something went wrong."
          action="Reload"
          cb={() => dispatch(getUserCollections())}
        />
      ) : (
        <Grid ismobile={ismobile.toString()}>
          {collections.map((node, idx) => (
            <Box onClick={() => navigate(`${node.slug}/${node._id}`)} key={idx}>
              <FlexBox gap="10px">
                <AppsIcon />
                <Typography fontWeight={500} fontSize="13px">
                  {node.name}
                </Typography>
              </FlexBox>
            </Box>
          ))}
          <Box onClick={() => setOpen(true)}>
            <FlexBox>
              <AddIcon
                fontSize="small"
                sx={{
                  mr: "5px",
                }}
              />
              <Typography fontWeight={500} fontSize="13px">
                Create collection
              </Typography>
            </FlexBox>
          </Box>
        </Grid>
      )}
    </Box>
  );
};

export default Collections;

const Grid = styled(Box)(({ ismobile }) => ({
  display: "grid",
  gridAutoRows: "120px",
  gridTemplateColumns: `${
    ismobile === "true" ? "repeat(2, 1fr)" : "repeat(auto-fill,252px)"
  }`,
  gap: "10px",
  "> div": {
    cursor: "pointer",
    padding: `${ismobile === "true" ? "20px 10px" : "20px"}`,
    borderRadius: "8px",
  },
  "> div:not(:last-child)": {
    background: `${shades.secondary[300]}`,
    ":hover": {
      background: `${shades.secondary[400]}`,
    },
  },
  "> div:last-child": {
    border: `1.5px dashed ${shades.secondary[500]}`,
    ":hover": { border: `1.5px dashed ${shades.secondary[600]}` },
  },
  "> div:first-of-type": {
    gridColumn: `${ismobile === "true" ? "auto/span 2" : "auto/span 1"}`,
    gridRow: `${ismobile === "true" ? "auto/span 1" : "auto/span 2"}`,
  },
}));

import React, { useContext, useEffect, useState } from "react";
import { Box, Button, styled, Typography, useMediaQuery } from "@mui/material";
import { FlexBox } from "./FlexBox";
import { useNavigate, useParams } from "react-router-dom";
import { privateInstance } from "../utils/apiInstances";
import { backdropContext } from "../context/BackdropContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditCollection from "./EditCollection";
import DeleteCollection from "./DeleteCollection";

const CollectionPosts = () => {
  const [posts, setPosts] = useState([]);
  const [editOpen, setEditOpen] = useState(false);
  const [dltOpen, setDltOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const { id } = useParams();
  const { toggleBackdrop } = useContext(backdropContext);

  const navigate = useNavigate();

  useEffect(() => {
    toggleBackdrop();

    // get collection
    privateInstance
      .get(`/api/v1/collections/${id}`)
      .then((data) => {
        setCollectionName(data.data?.data?.name);
      })
      .catch(console.error)
      .finally(() => toggleBackdrop());

    toggleBackdrop();

    // get collection posts
    privateInstance
      .get(`/api/v1/savedposts/${id}`)
      .then((data) => {
        setPosts(data.data.data);
      })
      .catch(console.error)
      .finally(() => toggleBackdrop());
  }, []);
  return (
    <>
      {!!collectionName && (
        <Box p={{ xs: "30px 10px", md: "40px 140px" }}>
          <EditCollection
            {...{
              open: editOpen,
              setOpen: setEditOpen,
              collectionName,
              setCollectionName,
              id,
            }}
          />
          <DeleteCollection
            {...{
              open: dltOpen,
              setOpen: setDltOpen,
              id,
            }}
          />

          <Button onClick={() => navigate(-1)} sx={{ textTransform: "none" }}>
            <ArrowBackIcon sx={{ mr: "5px" }} fontSize="small" />
            <Typography fontWeight={500}>Collections</Typography>
          </Button>
          <FlexBox justifyContent="space-between">
            <Typography fontWeight={600} my="30px" fontSize="24px">
              {collectionName}
            </Typography>

            {collectionName !== "Favorites" && (
              <FlexBox gap="10px">
                <Button
                  onClick={() => setEditOpen(true)}
                  variant="contained"
                  sx={{ textTransform: "none" }}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => setDltOpen(true)}
                  variant="contained"
                  sx={{
                    background: "#ff6b60",
                    textTransform: "none",
                    ":hover": {
                      background: "#fa4033",
                    },
                  }}
                >
                  Delete
                </Button>
              </FlexBox>
            )}
          </FlexBox>

          <Grid
            gridTemplateColumns={{
              xs: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
          >
            {posts.map((post, idx) => (
              <Box
                sx={{
                  ":hover > div": {
                    display: { sm: "block" },
                  },
                  cursor: "pointer",
                }}
                key={idx}
                position="relative"
              >
                <Box
                  sx={{
                    display: "none",
                    backgroundColor: "#fafafcf2",
                    padding: "15px",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <Box
                    sx={{
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 5,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <Typography
                      fontSize="18px"
                      fontFamily="'Noto Serif JP', serif"
                    >
                      {post.prompt}
                    </Typography>
                  </Box>
                </Box>
                <img
                  style={{ width: "100%" }}
                  src={post.image.url}
                  alt="demoimages"
                />
              </Box>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default CollectionPosts;

const Grid = styled(Box)(({ mobile }) => ({
  margin: "40px 0",
  display: "grid",
  gap: "15px",
}));

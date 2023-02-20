import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import { FlexBox } from "./FlexBox";
import { useNavigate, useParams } from "react-router-dom";
import { privateInstance } from "../utils/apiInstances";
import { backdropContext } from "../context/BackdropContext";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditCollection from "./EditCollection";
import DeleteCollection from "./DeleteCollection";
import { shades } from "../theme";
import PostPreviewModal from "./PostPreviewModal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchSavedPosts } from "../state/savedPostsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { STATUS } from "../utils";
import DisplayAlert from "./DisplayAlert";

const Loader = () => (
  <Stack p="40px 0 10px" alignItems="center">
    <CircularProgress size={25} />
  </Stack>
);

const PullDown = () => (
  <Stack p="20px" alignItems="center">
    <ArrowDownwardIcon />
    <Typography>Pull down to refresh</Typography>
  </Stack>
);

const Release = () => (
  <Stack p="20px" alignItems="center">
    <ArrowUpwardIcon />
    <Typography>Release to refresh</Typography>
  </Stack>
);

const SavedPosts = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [dltOpen, setDltOpen] = useState(false);
  const [collectionName, setCollectionName] = useState("");
  const { id } = useParams();
  const [openPost, setOpenPost] = useState(false);
  const [openPostData, setOpenPostData] = useState(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { toggleBackdrop } = useContext(backdropContext);
  const [notInitRender, setNotInitRender] = useState(false);

  const {
    savedPosts: posts,
    status,
    totalPages,
  } = useSelector((state) => state.savedPostsReducer, shallowEqual);
  useEffect(() => {
    // get collection
    toggleBackdrop();
    privateInstance
      .get(`/api/v1/collections/${id}`)
      .then((data) => {
        setCollectionName(data.data?.data?.name);
      })
      .catch(console.error)
      .finally(() => toggleBackdrop());
  }, []);

  useEffect(() => {
    dispatch(
      fetchSavedPosts({
        collectionId: id,
        page,
        toggleBackdrop,
        concat: notInitRender,
      })
    );
    setNotInitRender(true);
  }, [page]);

  return (
    <>
      {/* Post preview Modal */}
      {openPostData && (
        <PostPreviewModal
          {...{
            openPost,
            setOpenPost,
            openPostData,
          }}
        />
      )}
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

          {status === STATUS.ERROR ? (
            <DisplayAlert
              type="error"
              title="Error"
              message="it looks like something went wrong."
              action="Reload"
              cb={() => {
                dispatch(
                  fetchSavedPosts({
                    collectionId: id,
                    page,
                    toggleBackdrop,
                    concat: notInitRender,
                  })
                );
              }}
            />
          ) : (
            <>
              <Typography mb="10px" color={shades.primary[300]}>
                {posts.length}
                {posts.length === 1 ? " generation" : " generations"}
              </Typography>
              {posts.length === 0 ? (
                <DisplayAlert
                  mt="10px"
                  type="info"
                  title="Oops..."
                  message="Unfortunately, we could not find any posts to display. Your saved images will appear here. You can save images as you're creating. "
                  action={"Create with DALL.E"}
                  cb={() => navigate("/")}
                />
              ) : (
                <InfiniteScroll
                  dataLength={posts.length}
                  next={() => {
                    if (page < totalPages) setPage((prev) => prev + 1);
                  }}
                  hasMore={page < totalPages}
                  loader={<Loader />}
                  scrollThreshold="1px"
                  endMessage={
                    !!posts.length && (
                      <p style={{ textAlign: "center", margin: "30px" }}>
                        <b>Yay! You've seen it all</b>
                      </p>
                    )
                  }
                  refreshFunction={() => {
                    setNotInitRender(false);
                    setPage(1);
                  }}
                  pullDownToRefresh
                  pullDownToRefreshThreshold={25}
                  pullDownToRefreshContent={<PullDown />}
                  releaseToRefreshContent={<Release />}
                >
                  <Grid
                    gridTemplateColumns={{
                      xs: "repeat(2, 1fr)",
                      md: "repeat(3, 1fr)",
                      lg: "repeat(4, 1fr)",
                    }}
                  >
                    {posts.map((post, idx) => (
                      <Box
                        onClick={() => {
                          setOpenPostData({
                            image: post.image,
                            prompt: post?.prompt,
                            _id: post?._id,
                            collectionName,
                          });
                          setOpenPost(true);
                        }}
                        sx={{
                          ":hover > div": {
                            display: { md: "flex" },
                          },
                          cursor: "pointer",
                        }}
                        key={idx}
                        position="relative"
                      >
                        <Box
                          sx={{
                            display: "none",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            backgroundColor: "#fafafcf2",
                            padding: "15px",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                          }}
                        >
                          <Typography
                            sx={{
                              display: "-webkit-box",
                              WebkitBoxOrient: "vertical",
                              WebkitLineClamp: { md: 2, lg: 4 },
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                            fontSize="16px"
                            fontFamily="'Noto Serif JP', serif"
                          >
                            {post?.prompt}
                          </Typography>
                          <Box
                            alignItems="end"
                            display="flex"
                            justifyContent="end"
                          >
                            <Typography
                              fontSize="16px"
                              color={shades.primary[300]}
                            >
                              "Click to view"
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
                </InfiniteScroll>
              )}
            </>
          )}
        </Box>
      )}
    </>
  );
};

export default SavedPosts;

const Grid = styled(Box)({
  marginBottom: "30px",
  display: "grid",
  gap: "15px",
});

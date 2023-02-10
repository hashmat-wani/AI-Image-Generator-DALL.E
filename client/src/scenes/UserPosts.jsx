import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Posts from "../components/Posts";
import { fetchUserPosts } from "../state/userPostsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { backdropContext } from "../context/BackdropContext";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { STATUS } from "../utils";

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

const UserPosts = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const { toggleBackdrop } = useContext(backdropContext);
  const [notInitRender, setNotInitRender] = useState(false);

  const {
    userPosts: posts,
    status,
    totalPages,
  } = useSelector((state) => state.userPostsReducer, shallowEqual);

  const { user } = useSelector((state) => state.userReducer, shallowEqual);

  useEffect(() => {
    dispatch(
      fetchUserPosts({
        userId: user?._id,
        page,
        toggleBackdrop,
        concat: notInitRender,
      })
    );
    setNotInitRender(true);
  }, [page]);

  return (
    <Box maxWidth="1100px" m="30px auto" p="20px">
      <Typography variant="h3" textAlign="center">
        Posts you've shared with community
      </Typography>

      <InfiniteScroll
        dataLength={posts.length}
        next={() => {
          if (page < totalPages) setPage((prev) => prev + 1);
        }}
        hasMore={page < totalPages}
        loader={<Loader />}
        scrollThreshold="1px"
        endMessage={
          <p style={{ textAlign: "center", margin: "30px" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        refreshFunction={() => {
          setNotInitRender(false);
          setPage(1);
        }}
        pullDownToRefresh
        pullDownToRefreshThreshold={80}
        pullDownToRefreshContent={<PullDown />}
        releaseToRefreshContent={<Release />}
      >
        <Posts {...{ posts, status, personal: true }} />
      </InfiniteScroll>

      {/* <Posts {...{ posts, status, personal: true }} /> */}
    </Box>
  );
};

export default UserPosts;

import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Posts from "../components/Posts";
import { fetchUserPosts } from "../state/userPostsSlice";
import { backdropContext } from "../context/BackdropContext";
import InfiniteScroll from "react-infinite-scroll-component";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

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
    <Box maxWidth="1100px" m="0 auto 20px" p="20px">
      <Typography mb="30px" fontSize="20px" textAlign="center">
        Posts that you've shared with the community.
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
        <Posts {...{ posts, status, userId: user?._id, personal: true }} />
      </InfiniteScroll>
    </Box>
  );
};

export default UserPosts;

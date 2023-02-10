import { Backdrop, Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Posts from "../components/Posts";
import {
  clearUserPosts,
  fetchUserPosts,
  setUserPosts,
} from "../state/userPostsSlice";

const UserPosts = () => {
  const [open, setOpen] = useState(false);
  const [initial, setInitial] = useState(false);

  const loadingToggle = () => {
    setOpen((prev) => !prev);
  };

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  // console.log(page);

  const {
    userPosts: posts,
    status,
    totalPages,
    currPage,
  } = useSelector((state) => state.userPostsReducer, shallowEqual);
  console.log(totalPages, currPage, page);
  const { user } = useSelector((state) => state.userReducer, shallowEqual);

  useEffect(() => {
    console.log("coming");
    // if (+currPage <= totalPages) {
    dispatch(fetchUserPosts(user?._id, loadingToggle, page, initial));
    setInitial(true);
    // }
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      console.log("here");
      console.log(currPage);
      if (+currPage <= totalPages) setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page]);

  return (
    <Box maxWidth="1100px" m="30px auto" p="20px">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h3" textAlign="center">
        Posts you've shared with community
      </Typography>
      <Posts {...{ posts, status, personal: true, loadingToggle }} />
    </Box>
  );
};

export default UserPosts;

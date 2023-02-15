import { createSlice } from "@reduxjs/toolkit";
import { instance, privateInstance } from "../utils/apiInstances";
import { STATUS } from "../utils/enums";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  currPage: 1,
  totalPages: null,
  searchPost: "",
  status: STATUS.IDLE,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      const { posts, currPage, totalPages } = action?.payload;
      return {
        ...state,
        posts: posts,
        totalPages: totalPages,
        currPage: +currPage,
      };
    },

    setSearchPost: (state, action) => {
      return { ...state, searchPost: action.payload };
    },

    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setPosts, setStatus, setSearchPost } = postsSlice.actions;
export default postsSlice.reducer;

export const createPost =
  ({ image, prompt }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/v1/posts", {
        image,
        prompt,
      })
      .then(() => {
        toast.success("Shared successfully!");
        dispatch(fetchPosts({}));
      })
      .catch(() => {
        toast.error("Something went wrong. Try again..!");
      })
      .finally(() => {
        dispatch(setStatus(STATUS.IDLE));
      });
  };

export const fetchPosts =
  ({ page, searchPost }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    instance
      .get("/api/v1/posts", {
        params: { page, ...(searchPost && { q: searchPost }) },
      })
      .then((data) => {
        dispatch(setStatus(STATUS.IDLE));
        dispatch(setPosts(data.data));
      })
      .catch((err) => {
        dispatch(setStatus(STATUS.ERROR));
      });
  };

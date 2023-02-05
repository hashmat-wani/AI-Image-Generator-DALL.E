import { createSlice } from "@reduxjs/toolkit";
import { instance, privateInstance } from "../utils/apiInstances";
import { STATUS } from "../utils/enums";
import { toast } from "react-toastify";

const initialState = {
  posts: [],
  currPage: 1,
  totalPages: null,
  status: STATUS.IDLE,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return {
        ...state,
        posts: action.payload.posts,
        totalPages: action.payload.totalPages,
      };
    },

    setpage: (state, action) => {
      return { ...state, currPage: action.payload };
    },

    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setPosts, setpage, setStatus } = postsSlice.actions;
export default postsSlice.reducer;

export const createPost = (image, prompt) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  privateInstance
    .post("/api/v1/posts", {
      image,
      prompt,
    })
    .then(() => {
      toast.success("Shared successfully!");
      dispatch(fetchPosts());
    })
    .catch(() => {
      toast.error("Something went wrong. Try again..!");
    })
    .finally(() => {
      dispatch(setStatus(STATUS.IDLE));
    });
};

export const fetchPosts =
  (page = 1) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    instance
      .get("/api/v1/posts", {
        params: {
          page,
        },
      })
      .then((data) => {
        dispatch(setStatus(STATUS.IDLE));
        dispatch(setPosts(data.data));
      })
      .catch((err) => {
        dispatch(setStatus(STATUS.ERROR));
      });
  };

import { createSlice } from "@reduxjs/toolkit";
import { instance, privateInstance } from "../utils/apiInstances";
import { STATUS } from "../utils/enums";

export const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], status: STATUS.IDLE },
  reducers: {
    setPosts: (state, action) => {
      return { ...state, posts: action.payload };
    },

    setStatus: (state, action) => {
      console.log(action);
      return { ...state, status: action.payload };
    },
  },
});

export const { setPosts, setStatus } = postsSlice.actions;
export default postsSlice.reducer;

export const createPost = (image, prompt) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  privateInstance
    .post("/api/v1/posts", {
      image,
      prompt,
    })
    .then(() => {})
    .finally(() => setTimeout(() => dispatch(setStatus(STATUS.IDLE)), 5000));
};

export const fetchPosts = () => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  instance
    .get("/api/v1/posts")
    .then((data) => {
      dispatch(setStatus(STATUS.IDLE));
      dispatch(setPosts(data.data.posts.reverse()));
    })
    .catch((err) => {
      dispatch(setStatus(STATUS.ERROR));
    });
};

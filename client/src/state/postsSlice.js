import { createSlice } from "@reduxjs/toolkit";
import { MODE, SERVER_DEV_API, SERVER_PROD_API } from "../env";
import { privateInstance } from "../utils/apiInstances";
import { STATUS } from "../utils/enums";

export const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], status: STATUS.IDLE },
  reducers: {
    setPosts: (state, action) => {
      return { ...state, posts: action.payload };
    },

    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setPosts, setStatus } = postsSlice.actions;
export default postsSlice.reducer;

export const createPost = (image, prompt) => (dispatch) => {
  console.log("working");
  // dispatch(setStatus(STATUS.LOADING));
  privateInstance.post(
    `${MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API}/api/v1/posts`,
    {
      image,
      prompt,
    }
  );
};

export const fetchPosts = () => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  fetch(`${MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API}/api/v1/posts`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(setStatus(STATUS.IDLE));
      dispatch(setPosts(data.posts.reverse()));
    })
    .catch((err) => dispatch(setStatus(STATUS.ERROR)));
};

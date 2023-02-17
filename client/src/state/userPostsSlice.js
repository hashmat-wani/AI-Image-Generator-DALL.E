import { createSlice } from "@reduxjs/toolkit";
import { privateInstance } from "../utils/apiInstances";
import { STATUS } from "../utils/enums";
import { toast } from "react-toastify";
import { fetchPosts } from "./postsSlice";

const initialState = {
  userPosts: [],
  currPage: 1,
  totalPages: null,
  status: STATUS.IDLE,
};

export const userPostsSlice = createSlice({
  name: "userPosts",
  initialState,
  reducers: {
    setUserPosts: (state, action) => {
      const { data, totalPages, currPage, concat } = action?.payload;
      return {
        ...state,
        userPosts: concat ? [...state.userPosts, ...data] : data,
        currPage,
        totalPages,
      };
    },

    deletePostFromSlice: (state, action) => {
      return {
        ...state,
        userPosts: state.userPosts.filter((el) => el._id !== action.payload),
      };
    },
    clearUserPosts: () => initialState,

    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setUserPosts, clearUserPosts, deletePostFromSlice, setStatus } =
  userPostsSlice.actions;
export default userPostsSlice.reducer;

export const fetchUserPosts =
  ({ userId, page = 1, toggleBackdrop, concat }) =>
  (dispatch) => {
    if (!concat) toggleBackdrop();
    privateInstance
      .get(`/api/v1/posts/${userId}`, {
        params: { page },
      })
      .then((posts) => {
        const { data, totalPages, currPage } = posts?.data;
        dispatch(setUserPosts({ data, totalPages, currPage, concat }));
      })
      .catch((err) => {
        dispatch(setStatus(STATUS.ERROR));
        dispatch(clearUserPosts());
      })
      .finally(() => {
        if (!concat) toggleBackdrop();
      });
  };

export const deleteUserPost =
  ({ id, userId, toggleBackdrop }) =>
  (dispatch) => {
    toggleBackdrop();
    privateInstance
      .delete(`/api/v1/posts/${id}`)
      .then((data) => {
        toast.success(data?.data.message);
        dispatch(deletePostFromSlice(id));
        // dispatch(fetchUserPosts({ userId, toggleBackdrop, concat: false }));
        dispatch(fetchPosts({}));
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => toggleBackdrop());
  };

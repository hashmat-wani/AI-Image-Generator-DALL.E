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
      // if its page change
      if (action.payload?.onScroll) {
        return {
          ...state,
          userPosts: [...state.userPosts, ...action.payload.data],
          currPage: action.payload.currPage,
          totalPages: action.payload.totalPages,
        };
      }

      return {
        ...state,
        userPosts: action.payload.data,
        currPage: action.payload.currPage,
        totalPages: action.payload.totalPages,
      };
    },

    clearUserPosts: () => initialState,

    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setUserPosts, clearUserPosts, setStatus } =
  userPostsSlice.actions;
export default userPostsSlice.reducer;

export const fetchUserPosts =
  (userId, loadingToggle, page = 1, onScroll = false) =>
  (dispatch) => {
    if (loadingToggle) loadingToggle();
    privateInstance
      .get(`/api/v1/posts/${userId}`, {
        params: { page },
      })
      .then((posts) => {
        const { data, totalPages, currPage } = posts?.data;
        dispatch(setUserPosts({ data, totalPages, currPage, onScroll }));
      })
      .catch((err) => {
        dispatch(setStatus(STATUS.ERROR));
        dispatch(clearUserPosts());
      })
      .finally(() => {
        if (loadingToggle) loadingToggle();
      });
  };

export const deleteUserPost =
  (postId, userId, handleClose, loadingToggle) => (dispatch) => {
    loadingToggle();
    privateInstance
      .delete(`/api/v1/posts/${postId}`)
      .then((data) => {
        handleClose();
        toast.success(data?.data.message);
        dispatch(fetchUserPosts(userId, loadingToggle));
        dispatch(fetchPosts());
      })
      .catch((err) => {
        const { message } = err?.response?.data || err;
        toast.error(message);
      })
      .finally(() => loadingToggle());
  };

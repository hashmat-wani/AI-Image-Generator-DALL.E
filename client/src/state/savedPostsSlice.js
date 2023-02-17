import { createSlice } from "@reduxjs/toolkit";
import { privateInstance } from "../utils/apiInstances";
import { STATUS } from "../utils/enums";
import { toast } from "react-toastify";

const initialState = {
  savedPosts: [],
  currPage: 1,
  totalPages: null,
  status: STATUS.IDLE,
};

export const savedPostsSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    setSavedPosts: (state, action) => {
      const { data, totalPages, currPage, concat } = action?.payload;
      return {
        ...state,
        savedPosts: concat ? [...state.savedPosts, ...data] : data,
        currPage,
        totalPages,
      };
    },

    deletePostFromSlice: (state, action) => {
      return {
        ...state,
        savedPosts: state.savedPosts.filter((el) => el._id !== action.payload),
      };
    },

    clearSavedPosts: () => initialState,

    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const {
  setSavedPosts,
  clearSavedPosts,
  deletePostFromSlice,
  setStatus,
} = savedPostsSlice.actions;
export default savedPostsSlice.reducer;

export const fetchSavedPosts =
  ({ page = 1, toggleBackdrop, concat, collectionId }) =>
  (dispatch) => {
    if (!concat) toggleBackdrop();
    privateInstance
      .get(`/api/v1/savedposts/${collectionId}`, {
        params: { page },
      })
      .then((posts) => {
        const { data, totalPages, currPage } = posts?.data;
        dispatch(setSavedPosts({ data, totalPages, currPage, concat }));
      })
      .catch((err) => {
        dispatch(clearSavedPosts());
        dispatch(setStatus(STATUS.ERROR));
      })
      .finally(() => {
        if (!concat) toggleBackdrop();
      });
  };

export const removeSavedPost =
  ({ id, toggleBackdrop }) =>
  (dispatch) => {
    toggleBackdrop();
    privateInstance
      .delete(`/api/v1/savedposts/${id}`)
      .then((data) => {
        toast.success(data?.data.message);
        dispatch(deletePostFromSlice(id));
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => toggleBackdrop());
  };

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { STATUS } from "../utils";
import { privateInstance } from "../utils/apiInstances";

const initialState = {
  collections: [],
  status: STATUS.IDLE,
};
const collectionsSlice = createSlice({
  name: "collections",
  initialState,
  reducers: {
    setCollections: (state, action) => {
      return { ...state, collections: action.payload };
    },

    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { setCollections, setStatus } = collectionsSlice.actions;
export default collectionsSlice.reducer;

export const getUserCollections = () => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  privateInstance
    .get("/api/v1/collections")
    .then((data) => {
      dispatch(setStatus(STATUS.IDLE));
      dispatch(setCollections(data?.data?.data));
    })
    .catch((err) => {
      dispatch(setStatus(STATUS.ERROR));
    });
};

export const createUserCollection =
  ({ cb, input, setInput }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/v1/collections", { name: input.trim() })
      .then(() => {
        toast.success("Collection created");
        dispatch(getUserCollections());
        setInput("");
        cb(false);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const editUserCollection =
  ({ cb, input, setInput, id, setCollectionName }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .patch(`/api/v1/collections/${id}`, { name: input.trim() })
      .then(() => {
        toast.success("Edited successfully");
        dispatch(getUserCollections());
        setCollectionName(input.trim());
        setInput("");
        cb(false);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const deleteUserCollection =
  ({ cb, id, navigate }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .delete(`/api/v1/collections/${id}`)
      .then(() => {
        toast.success("Deleted successfully");
        dispatch(getUserCollections());
        cb(false);
        navigate("/collections");
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const createSavedPost =
  ({ handleClose, image, prompt, collectionId, collectionName }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/v1/savedposts/save", {
        image,
        prompt,
        collectionId,
      })
      .then((data) => {
        handleClose();
        toast.success(`Added to ${collectionName}`);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => {
        dispatch(setStatus(STATUS.IDLE));
      });
  };

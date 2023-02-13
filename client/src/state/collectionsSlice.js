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
      // console.log(data);
    })
    .catch((err) => {
      // console.log(err);
      dispatch(setStatus(STATUS.ERROR));
    });
};

export const savePost =
  ({ handleClose, image, prompt, collectionId, collectionName }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    console.log(image, prompt);
    privateInstance
      .post("/api/v1/collections/savepost", {
        image,
        prompt,
        collectionId,
      })
      .then((data) => {
        handleClose();
        toast.success(`Added to ${collectionName}`);
      })
      .catch(() => {
        toast.error("Something went wrong. Try again..!");
      })
      .finally(() => {
        dispatch(setStatus(STATUS.IDLE));
      });
  };

export const createUserCollection =
  ({ cb, input, setInput }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/v1/collections", { name: input })
      .then(() => {
        toast.success("Collection created");
        dispatch(getUserCollections());
        setInput("");
        cb(false);
      })
      .catch((err) => {
        toast.error("Something went wrong. Try again..!");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

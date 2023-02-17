import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import userReducer from "./userSlice";
import postsReducer from "./postsSlice";
import userPostsReducer from "./userPostsSlice";
import savedPostsReducer from "./savedPostsSlice";
import collectionsReducer from "./collectionsSlice";
import resetPwdReducer from "./resetPwdSlice";

export const store = configureStore({
  reducer: {
    formReducer,
    userReducer,
    postsReducer,
    userPostsReducer,
    savedPostsReducer,
    collectionsReducer,
    resetPwdReducer,
  },
});

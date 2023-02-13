import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./formSlice";
import userReducer from "./userSlice";
import postsReducer from "./postsSlice";
import userPostsReducer from "./userPostsSlice";
import collectionsReducer from "./collectionsSlice";

export const store = configureStore({
  reducer: {
    formReducer,
    userReducer,
    postsReducer,
    userPostsReducer,
    collectionsReducer,
  },
});

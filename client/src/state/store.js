import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../state/formSlice";
import userReducer from "../state/userSlice";
import postsReducer from "../state/postsSlice";
import userPostsReducer from "../state/userPostsSlice";

export const store = configureStore({
  reducer: {
    formReducer,
    userReducer,
    postsReducer,
    userPostsReducer,
  },
});

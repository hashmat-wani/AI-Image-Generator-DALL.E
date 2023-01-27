import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../state/formSlice";
import userReducer from "../state/userSlice";

export const store = configureStore({
  reducer: {
    formReducer,
    userReducer,
  },
});

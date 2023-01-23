import { configureStore } from "@reduxjs/toolkit";
import formReducer from "../state/formSlice";

export const store = configureStore({
  reducer: {
    formReducer,
  },
});

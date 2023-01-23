import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/enums";

export const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [], status: STATUS.IDLE },
});

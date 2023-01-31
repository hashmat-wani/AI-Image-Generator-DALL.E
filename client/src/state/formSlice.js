import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/enums";
import { v4 as uuidv4 } from "uuid";
import { instance } from "../utils/apiInstances";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    prompt: "A man standing in front of a stargate to another dimension",
    images: [
      {
        id: 1,
        index: 0,
        image:
          "https://cdn.openai.com/labs/images/An%20armchair%20in%20the%20shape%20of%20an%20avocado.webp?v=1",
      },
      {
        id: 2,
        index: 1,
        image:
          "https://cdn.openai.com/labs/images/An%20armchair%20in%20the%20shape%20of%20an%20avocado.webp?v=1",
      },
      {
        id: 3,
        index: 2,
        image:
          "https://cdn.openai.com/labs/images/An%20armchair%20in%20the%20shape%20of%20an%20avocado.webp?v=1",
      },
      {
        id: 4,
        index: 3,
        image:
          "https://cdn.openai.com/labs/images/An%20armchair%20in%20the%20shape%20of%20an%20avocado.webp?v=1",
      },
    ],
    status: STATUS.IDLE,
  },
  reducers: {
    updateForm: (state, action) => {
      return { ...state, ...action.payload };
    },
    setStatus: (state, action) => {
      return { ...state, status: action.payload };
    },
  },
});

export const { updateForm, setStatus } = formSlice.actions;
export default formSlice.reducer;

export const generatePosts = (prompt) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));

  instance
    .post("/api/v1/dalle", { prompt })
    .then((data) => {
      console.log(data);
      dispatch(setStatus(STATUS.IDLE));
      dispatch(
        updateForm({
          images: data.data.images.map((photo, index) => ({
            id: uuidv4(),
            index,
            image: `data:image/jpeg;base64,${photo.b64_json}`,
          })),
        })
      );
    })
    .catch((err) => {
      console.log(err);
      dispatch(setStatus(STATUS.ERROR));
    });
};

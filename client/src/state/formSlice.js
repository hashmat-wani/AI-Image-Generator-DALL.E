import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/enums";
import { v4 as uuidv4 } from "uuid";
import { MODE, SERVER_DEV_API, SERVER_PROD_API } from "../env";

export const formSlice = createSlice({
  name: "form",
  initialState: {
    prompt: "",
    photos: [
      {
        id: 1,
        index: 0,
        photo:
          "https://cdn.openai.com/labs/images/An%20armchair%20in%20the%20shape%20of%20an%20avocado.webp?v=1",
      },
      {
        id: 2,
        index: 1,
        photo:
          "https://cdn.openai.com/labs/images/An%20armchair%20in%20the%20shape%20of%20an%20avocado.webp?v=1",
      },
      {
        id: 3,
        index: 2,
        photo:
          "https://cdn.openai.com/labs/images/An%20armchair%20in%20the%20shape%20of%20an%20avocado.webp?v=1",
      },
      {
        id: 4,
        index: 3,
        photo:
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

export const generateImage = (prompt) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  console.log(
    `${MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API}/api/v1/dalle`
  );
  fetch(`${MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API}/api/v1/dalle`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  })
    .then((res) => res.json())
    .then((data) => {
      dispatch(setStatus(STATUS.IDLE));
      dispatch(
        updateForm({
          photos: data.photos.map((photo, index) => ({
            id: uuidv4(),
            index,
            photo: `data:image/jpeg;base64,${photo.b64_json}`,
          })),
        })
      );
    })
    .catch((err) => {
      dispatch(setStatus(STATUS.ERROR));
    });
};

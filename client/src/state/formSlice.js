import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/enums";
import { v4 as uuidv4 } from "uuid";

// export const cartSlice = createSlice({
//   name: "cart",
//   initialState: { items: [], cart: [], isCartOpen: false },
//   reducers: {
//     setItems: (state, action) => {
//       state.items = action.payload;
//       // return {...state,items:action.payload};
//     },

//     addToCart: (state, action) => {
//       console.log("inside redux", action);
//       state.cart = [...state.cart, action.payload];
//     },

//     removeFromCart: (state, action) => {
//       state.cart = state.cart.filter((item) => item.id !== action.payload);
//     },

//     increaseQty: (state, action) => {
//       state.cart = state.cart.map((item) => {
//         if (item.id === action.payload) {
//           item.qty++;
//         }
//         return item;
//       });
//     },

//     decreaseQty: (state, action) => {
//       state.cart = state.cart.map((item) => {
//         if (item.id === action.payload && item.qty > 1) {
//           item.qty--;
//         }
//         return item;
//       });
//     },

//     setIsCartOpen: (state) => {
//       state.isCartOpen = !state.isCartOpen;
//     },
//   },
// });

// export const {
//   setItems,
//   addToCart,
//   removeFromCart,
//   increaseQty,
//   decreaseQty,
//   setIsCartOpen,
// } = cartSlice.actions;

// export default cartSlice.reducer;

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
  fetch("http://localhost:8080/api/v1/dalle", {
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
      console.log("arrow", err);
    });
};

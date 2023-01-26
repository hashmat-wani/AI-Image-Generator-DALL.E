import { createSlice } from "@reduxjs/toolkit";
import { getItem, STATUS } from "../utils";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getItem("user") || null,
    status: STATUS.IDLE,
  },
  reducers: {
    login: (state, action) => ({
      ...state,
      user: action.payload,
    }),

    logout: () => initialState,
  },
});

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     user: getItem("user") || null,
//     status: STATUS.IDLE,
//   },

//   reducers: {
//     login: (state, action) => ({
//       ...state,
//       user: action.payload,
//     }),

//     logout: (state, action) => ({
//       ...state,
//       user: null,
//     }),

//     setStatus: (state, action) => ({
//       ...state,
//       status: action.payload,
//     }),
//   },
// });

// export const { login, logout, setStatus } = authSlice.actions;
// export default authSlice.reducer;

// export const loginWithGoogle = () => (dispatch) => {
//   dispatch(setStatus(STATUS.LOADING));
//   signInWithPopup(auth, provider)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       const newUser = {
//         name: user.displayName,
//         email: user.email,
//         phone: user.phoneNumber,
//         avatar: user.photoURL,
//       };
//       setItem("user", newUser);
//       dispatch(login(newUser));
//       dispatch(setStatus(STATUS.IDLE));
//     })
//     .catch(() => dispatch(setStatus(STATUS.ERROR)));
// };

// export const logoutWithGoogle = () => (dispatch) => {
//   dispatch(setStatus(STATUS.LOADING));

//   signOut(auth)
//     .then(() => {
//       removeItem("user");
//       dispatch(logout());
//       dispatch(setStatus(STATUS.IDLE));
//     })
//     .catch(() => dispatch(setStatus(STATUS.ERROR)));
// };

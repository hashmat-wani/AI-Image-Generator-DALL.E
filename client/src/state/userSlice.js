import { createSlice } from "@reduxjs/toolkit";
import { STATUS, toaster } from "../utils";
import axios from "axios";

const initialState = {
  user: null,
  status: STATUS.IDLE,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: action.payload,
    }),

    clearUser: () => initialState,

    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setUser, clearUser, setStatus } = userSlice.actions;
export default userSlice.reducer;

export const login =
  (values, resetForm, setSubmitting, toast, navigate) => (dispatch) => {
    const { email, password } = values;
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .post("http://localhost:8080/api/v1/auth/login", {
        email: email.trim(),
        password: password.trim(),
      })
      .then((data) => {
        toaster(toast, "Success", "You've successfully signed in!", "success");
        dispatch(setUser(data.data.user));
        navigate("/");
        resetForm();
      })
      .catch((err) => {
        const { message } = err?.response?.data || err;
        toaster(toast, "Failed", message, "error");
      })
      .finally(() => setSubmitting(false));
  };

export const logOut = (toast) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  axios
    .post(
      "http://localhost:8080/api/v1/auth/logout",
      {},
      {
        withCredentials: true,
      }
    )
    .then((data) => {
      toaster(toast, "Success", "Logged Out", "success");
      dispatch(setStatus(STATUS.IDLE));
      dispatch(clearUser());
    })
    .catch((err) => {
      dispatch(setStatus(STATUS.ERROR));
      const { message } = err?.response?.data || err;
      toaster(toast, "Failed", message, "error");
    });
};

export const loginWithGoogle = () => (dispatch) => {
  window.open("http://localhost:8080/api/v1/auth/google", "_self");
};

export const verifyUser = () => (dispatch) => {
  axios
    .get("http://localhost:8080/api/v1/auth/me", {
      withCredentials: true,
    })
    .then((data) => {
      dispatch(setUser(data.data.user));
    })
    .catch();
};

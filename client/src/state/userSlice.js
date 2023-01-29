import { createSlice } from "@reduxjs/toolkit";
import { getCookie, STATUS, toaster } from "../utils";
import axios from "axios";
import { MODE, SERVER_DEV_API, SERVER_PROD_API } from "../env";

const initialState = {
  user: { avatar: getCookie("dall-e-user-avatar") || null },
  status: STATUS.IDLE,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => ({
      ...state,
      user: { ...state.user, ...action.payload },
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

export const register =
  (values, resetForm, setSubmitting, toast, navigate) => () => {
    const { firstName, lastName, email, password } = values;
    axios
      .post("http://localhost:8080/api/v1/auth/register", {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
      })

      .then(() => {
        navigate("/signin");
        resetForm();
        toaster(
          toast,
          "Account Created",
          "Your account created successfully",
          "success"
        );
      })
      .catch((err) => {
        const { message } = err?.response?.data || err;
        toaster(toast, "Failed", message, "error");
      })
      .finally(() => setSubmitting(false));
  };

export const login =
  (values, resetForm, setSubmitting, toast, navigate) => (dispatch) => {
    const { email, password } = values;
    const instance = axios.create({
      withCredentials: true,
    });
    instance
      .post(
        `${
          MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API
        }/api/v1/auth/login`,
        {
          email: email.trim().toLowerCase(),
          password: password.trim(),
        }
      )
      .then(() =>
        dispatch(verifyUser())
          .then((data) => {
            // if user is verified --- loggedin
            dispatch(setUser(data.data.user));
            toaster(
              toast,
              "Success",
              "You've successfully signed in!",
              "success"
            );
            navigate("/");
            resetForm();
          })
          .catch(() => {
            // if user is not verified still
            toaster(toast, "Login failed", "Please try again", "info");
          })
      )
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
      `${MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API}/api/v1/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    )
    .then(() =>
      dispatch(verifyUser())
        .then(() => {
          // if user is still there --- verified
          dispatch(setStatus(STATUS.IDLE));
          toaster(toast, "Logout failed", "Please try again", "info");
        })
        .catch(() => {
          // if user is not verified now
          dispatch(clearUser());
          dispatch(setStatus(STATUS.IDLE));
          toaster(toast, "Success", "Logged Out", "success");
        })
    )
    .catch((err) => {
      dispatch(setStatus(STATUS.ERROR));
      const { message } = err?.response?.data || err;
      toaster(toast, "Failed", message, "error");
    });
};

export const loginWithGoogle = () => () => {
  window.open(
    `${MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API}/api/v1/auth/google`,
    "_self"
  );
};
export const loginWithFacebook = () => () => {
  window.open(
    `${MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API}/api/v1/auth/facebook`,
    "_self"
  );
};

export const verifyUser = () => (dispatch) => {
  return axios.get(
    `${MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API}/api/v1/auth/me`,
    {
      withCredentials: true,
    }
  );
};

export const refreshToken = () => (dispatch) => {
  return axios.post(
    `${
      MODE === "dev" ? SERVER_DEV_API : SERVER_PROD_API
    }/api/v1/auth/refreshtoken`,
    {},
    {
      withCredentials: true,
    }
  );
};

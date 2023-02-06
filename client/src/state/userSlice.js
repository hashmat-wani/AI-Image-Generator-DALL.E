import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils";
import { MODE, SERVER_DEV_API, SERVER_PROD_API } from "../env";
import { instance, privateInstance } from "../utils/apiInstances";
import { toast } from "react-toastify";

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

export const register = (values, resetForm, setSubmitting, navigate) => () => {
  const { firstName, lastName, email, password } = values;
  instance
    .post("/api/v1/auth/register", {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      password: password.trim(),
    })

    .then((data) => {
      navigate("/signin");
      resetForm();
      toast.success(data.data.message);
    })
    .catch((err) => {
      const { message } = err?.response?.data || err;
      toast.error(message);
    })
    .finally(() => setSubmitting(false));
};

export const login =
  (values, setSubmitting, navigate, to = "/") =>
  (dispatch) => {
    const { email, password, isPersistent } = values;

    instance
      .post(
        "/api/v1/auth/login",
        {
          email: email.trim().toLowerCase(),
          password: password.trim(),
          isPersistent,
        },
        { withCredentials: true }
      )
      .then(() => {
        const popup = {
          onSuccess: {
            message: "Login successful!",
            type: "success",
          },
          onError: {
            message: "Something went wrong. Please try again..!",
            type: "info",
          },
        };
        const redirect = { navigate, to };
        return dispatch(verifyUser(popup, redirect));
      })
      .catch((err) => {
        const { message } = err?.response?.data || err;
        toast.error(message);
      })
      .finally(() => setSubmitting(false));
  };

export const logOut =
  (navigate, popupMsg = true) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/v1/auth/logout")
      .then(() => {
        const popup = popupMsg
          ? {
              onSuccess: {
                title: "Something went wrong. Please try again..!",
                type: "info",
              },
              onError: {
                message: "Logout Successfull!",
                type: "success",
              },
            }
          : null;

        const redirect = {
          navigate,
          to: "/signin",
        };
        return dispatch(verifyUser(popup, redirect));
      })
      .catch((err) => {
        const { message } = err?.response?.data || err;
        toast.error(message);
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
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

export const verifyUser = (popup, redirect) => (dispatch) => {
  privateInstance
    .get("/api/v1/auth/me")
    .then((data) => {
      dispatch(setUser(data.data?.user));
      if (popup) {
        const { message, type } = popup.onSuccess;
        toast[type](message);
      }
      if (redirect) {
        const { navigate, to } = redirect;
        setTimeout(() => navigate(to, { replace: true }), 0);
      }
    })
    .catch(async (err) => {
      // const message = err?.response?.data?.message || err?.message;
      dispatch(clearUser());
      if (popup) {
        const { message, type } = popup.onError;
        toast[type](message);
      }
    });
};

export const refreshToken = () => () => {
  return instance.get("/api/v1/auth/refreshtoken", { withCredentials: true });
};

export const updateUserAvatar = (handleClose, avatar) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  const formData = new FormData();
  formData.append("avatar", avatar);
  privateInstance
    .patch("/api/v1/user/updateavatar", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((data) => {
      const { message, avatar } = data?.data;
      dispatch(setUser({ avatar }));
      toast.success(message);
      handleClose(undefined, avatar);
    })
    .catch((err) => {
      const { message } = err?.response?.data || err;
      toast.error(message);
    })
    .finally(() => dispatch(setStatus(STATUS.IDLE)));
};

export const removeUserAvatar = (handleClose) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  privateInstance
    .post("/api/v1/user/removeavatar", {})
    .then((data) => {
      const { message, avatar } = data?.data;
      dispatch(setUser({ avatar }));
      toast.success(message);
      handleClose(undefined, avatar);
    })
    .catch((err) => {
      const { message } = err?.response?.data || err;
      toast.error(message);
    })
    .finally(() => dispatch(setStatus(STATUS.IDLE)));
};

export const changePassword =
  (values, setSubmitting, handleClose, navigate) => (dispatch) => {
    const { oldPassword, newPassword } = values;
    privateInstance
      .patch("/api/v1/user/changepassword", {
        oldPassword: oldPassword.trim(),
        newPassword: newPassword.trim(),
      })
      .then((data) => {
        toast.success(data.data?.message);
        handleClose();
        dispatch(logOut(navigate, false));
      })
      .catch((err) => {
        const { message } = err?.response?.data || err;
        toast.error(message);
      })
      .finally(() => setSubmitting(false));
  };

export const verifyEmail = (payload, setSubmitting, navigate) => () => {
  console.log(payload);
  instance
    .post("/api/v1/mail/verifyotp", payload)
    .then((data) => {
      console.log(data);
      toast.success(data.data.message);
    })
    .catch((err) => {
      const { message } = err?.response?.data;
      console.log(err);
      toast.error(message);
    })
    .finally(() => setSubmitting(false));
};

export const sendEmail = () => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  privateInstance
    .get("/api/v1/mail/sendotp")
    .then((data) => {
      toast.success(data.data?.message);
    })
    .catch((err) => {
      const { message } = err?.response?.data;
      console.log(err);
      toast.error(message);
    })
    .finally(() => dispatch(setStatus(STATUS.IDLE)));
};

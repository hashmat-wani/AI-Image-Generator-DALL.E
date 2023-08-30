import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils";
import { MODE, SERVER_DEV_API, SERVER_PROD_API } from "../env";
import { instance, privateInstance } from "../utils/apiInstances";
import { toast } from "react-toastify";
import { clearUserPosts } from "./userPostsSlice";

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

export const register =
  ({ values, resetForm, setSubmitting, navigate }) =>
  () => {
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
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => setSubmitting(false));
  };

export const login =
  ({
    values,
    setSubmitting,
    navigate,
    to = "/",
    setEmailVerificationAlert,
    toggleBackdrop,
  }) =>
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
            message: "Login successfull!",
            type: "success",
          },
          onError: {
            message: "Something went wrong. Please try again..!",
            type: "info",
          },
        };
        const args = {
          alert: setEmailVerificationAlert,
          toggleBackdrop,
          popup,
          navigate,
          to,
        };
        return dispatch(verifyUser(args));
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => setSubmitting(false));
  };

export const logOut =
  ({ toggleBackdrop, navigate, handleCloseUserMenu, popupMsg = true }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/v1/auth/logout")
      .then(() => {
        if (handleCloseUserMenu) handleCloseUserMenu();
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

        const args = {
          toggleBackdrop,
          popup,
          navigate,
          to: "/signin",
        };
        return dispatch(verifyUser(args));
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
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

export const verifyUser =
  ({ alert, toggleBackdrop, popup, navigate, to }) =>
  (dispatch) => {
    toggleBackdrop("Please wait while we verify your login status.");
    privateInstance
      .get("/api/v1/auth/me")
      .then((data) => {
        const { user } = data?.data;
        dispatch(setUser(user));
        if (popup) {
          const { message, type } = popup.onSuccess;
          toast[type](message);
        }
        if (navigate && to) {
          setTimeout(() => navigate(to, { replace: true }), 0);
        }
        if (alert && !user?.verified) {
          alert(true);
        }
      })
      .catch(async (err) => {
        dispatch(clearUser());
        dispatch(clearUserPosts());
        if (popup) {
          const { message, type } = popup.onError;
          toast[type](message);
        }
        if (navigate && to) {
          setTimeout(() => navigate(to, { replace: true }), 0);
        }
      })
      .finally(() => {
        toggleBackdrop();
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
      const message = err?.response?.data?.message;
      toast.error(message || "Something went wrong.");
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
      const message = err?.response?.data?.message;
      toast.error(message || "Something went wrong.");
    })
    .finally(() => dispatch(setStatus(STATUS.IDLE)));
};

export const changePassword =
  ({ values, setSubmitting, handleClose, navigate, toggleBackdrop }) =>
  (dispatch) => {
    const { oldPassword, newPassword } = values;
    privateInstance
      .patch("/api/v1/user/changepassword", {
        oldPassword: oldPassword.trim(),
        newPassword: newPassword.trim(),
      })
      .then((data) => {
        handleClose();
        dispatch(logOut({ toggleBackdrop, navigate, popupMsg: false }));
        toast.success(data.data?.message);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => setSubmitting(false));
  };

export const verifyEmail =
  ({ otp, navigate }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/v1/mail/verifyemailverificationotp", { otp })
      .then((data) => {
        toast.success(data.data?.message);
        dispatch(setUser({ verified: true }));
        navigate(-1);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const sendEmail = (navigate, cb) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  privateInstance
    .post("/api/v1/mail/sendemailverificationotp", {})
    .then((data) => {
      toast.success(data.data?.message);
      if (cb) cb();
      navigate("/verifyemail");
    })
    .catch((err) => {
      const message = err?.response?.data?.message;
      toast.error(message || "Something went wrong.");
    })
    .finally(() => dispatch(setStatus(STATUS.IDLE)));
};

export const deactivateAccount =
  ({ navigate, handleClose, toggleBackdrop }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .patch("/api/v1/user/deactivate", {})
      .then((data) => {
        handleClose();
        dispatch(logOut({ toggleBackdrop, navigate, popupMsg: false }));
        toast.success(data?.data?.message);
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const deleteAccount = (handleClose, toggleBackdrop) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  privateInstance
    .delete("/api/v1/user")
    .then((data) => {
      handleClose();
      dispatch(verifyUser({ toggleBackdrop }));
      toast.success(data?.data?.message);
    })
    .catch((err) => {
      const message = err?.response?.data?.message;
      toast.error(message || "Something went wrong.");
    })
    .finally(() => dispatch(setStatus(STATUS.IDLE)));
};

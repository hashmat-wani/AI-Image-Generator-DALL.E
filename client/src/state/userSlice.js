import { createSlice } from "@reduxjs/toolkit";
import { STATUS, toaster } from "../utils";
import { MODE, SERVER_DEV_API, SERVER_PROD_API } from "../env";
import { instance, privateInstance } from "../utils/apiInstances";

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
  (values, resetForm, setSubmitting, toast, navigate) => () => {
    const { firstName, lastName, email, password } = values;
    instance
      .post("/api/v1/auth/register", {
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

    instance
      .post(
        "/api/v1/auth/login",
        {
          email: email.trim().toLowerCase(),
          password: password.trim(),
        },
        { withCredentials: true }
      )
      .then(() => {
        const popup = {
          from: "login",
          toast,
          onSuccess: {
            title: "Success",
            desc: "Login successful!",
            type: "success",
          },
          onError: {
            title: "Something went wrong",
            desc: "Please try again!",
            type: "info",
          },
        };
        return dispatch(verifyUser(popup));
      })
      .catch((err) => {
        const { message } = err?.response?.data || err;
        toaster(toast, "Failed", message, "error");
      })
      .finally(() => setSubmitting(false));
  };

export const logOut = (toast) => (dispatch) => {
  dispatch(setStatus(STATUS.LOADING));
  privateInstance
    .post("/api/v1/auth/logout")
    .then(() => {
      const popup = {
        from: "logout",
        toast,
        onSuccess: {
          title: "Something went wrong",
          desc: "Please try again!",
          type: "info",
        },
        onError: {
          title: "Success",
          desc: "Logout Successfull!",
          type: "success",
        },
      };
      return dispatch(verifyUser(popup));
    })
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

export const verifyUser = (popup) => (dispatch) => {
  privateInstance
    .get("/api/v1/auth/me")
    .then((data) => {
      dispatch(setUser(data.data?.user));
      if (popup) {
        const { title, desc, type } = popup.onSuccess;
        const { from, toast } = popup;
        toaster(toast, title, desc, type);
        if (from === "login") {
          // navigate("/");
          // resetForm();
        }
      }
    })
    .catch(async (err) => {
      const message = err?.response?.data?.message || err?.message;
      console.log(message);
      dispatch(clearUser());
      if (popup) {
        const { title, desc, type } = popup.onError;
        toaster(popup.toast, title, desc, type);
      }
    });
};

export const refreshToken = () => (dispatch) => {
  return instance.get("/api/v1/auth/refreshtoken", { withCredentials: true });
};

export const updateUserAvatar = (avatar) => (dispatch) => {
  const formData = new FormData();
  formData.append("avatar", avatar);
  dispatch(setStatus(STATUS.LOADING));
  privateInstance.post("/api/v1/user/updateavatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const removeUserAvatar = () => () => {
  privateInstance.post("/api/v1/user/removeavatar", {});
};

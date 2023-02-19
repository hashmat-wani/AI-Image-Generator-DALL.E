import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { STATUS } from "../utils";
import { privateInstance } from "../utils/apiInstances";

const initialState = { email: null, status: STATUS.IDLE };
const resetPwdSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {
    setEmail: (state, action) => ({
      ...state,
      email: action.payload,
    }),
    setStatus: (state, action) => ({
      ...state,
      status: action.payload,
    }),
  },
});

export const { setEmail, setStatus } = resetPwdSlice.actions;
export default resetPwdSlice.reducer;

export const sendEmail =
  ({ email, navigate }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    privateInstance
      .post("/api/v1/mail/sendresetpasswordlink", { email })
      .then((data) => {
        const { message } = data?.data;
        dispatch(setEmail(email));
        toast.success(message);
        // const date = new Date();
        // date.setTime(date.getTime() + 3600000);
        // document.cookie = `reset_token=${token}; expires=${date.toUTCString()}; path=/`;
        navigate("/reset-password/instructions");
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

  

export const resetPassword =
  ({ newPassword, resetForm, setSubmitting, navigate }) =>
  (dispatch) => {
    privateInstance
      .patch("/api/v1/user/resetpassword", {
        newPassword,
      })
      .then((data) => {
        resetForm();
        dispatch(setEmail(null));
        // deleting a cookie
        document.cookie =
          "reset_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        toast.success(data.data?.message);
        navigate("/signin");
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => setSubmitting(false));
  };

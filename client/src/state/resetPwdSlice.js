import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { STATUS } from "../utils";
import { instance } from "../utils/apiInstances";

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
    instance
      .post("/api/v1/mail/sendresetpasswordotp", { email })
      .then((data) => {
        dispatch(setEmail(email));
        toast.success(data.data?.message);
        navigate("/reset-password/otp");
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const verifyResetPwdOtp =
  ({ otp, email, navigate }) =>
  (dispatch) => {
    dispatch(setStatus(STATUS.LOADING));
    instance
      .post("/api/v1/mail/verifyresetpasswordotp", { otp, email })
      .then((data) => {
        toast.success(data.data?.message);
        navigate("/reset-password/otp/new-password");
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => dispatch(setStatus(STATUS.IDLE)));
  };

export const newPassword =
  ({ newPassword, resetForm, email, setSubmitting, navigate }) =>
  (dispatch) => {
    instance
      .patch("/api/v1/user/resetpassword", {
        newPassword,
        email,
      })
      .then((data) => {
        resetForm();
        dispatch(setEmail(null));
        toast.success(data.data?.message);
        navigate("/signin");
      })
      .catch((err) => {
        const message = err?.response?.data?.message;
        toast.error(message || "Something went wrong.");
      })
      .finally(() => setSubmitting(false));
  };

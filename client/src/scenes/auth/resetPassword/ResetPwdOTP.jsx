import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FillOtp from "../../../components/FillOtp";
import { sendEmail } from "../../../state/resetPwdSlice";

const ResetPwdOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, status } = useSelector(
    (state) => state.resetPwdReducer,
    shallowEqual
  );

  const resend = () => {
    dispatch(sendEmail({ email, navigate }));
  };

  return (
    <>
      <FillOtp
        {...{
          resend,
          status,
          buttonText: "Continue",
          email,
          title: "reset-password",
        }}
      />
    </>
  );
};

export default ResetPwdOTP;

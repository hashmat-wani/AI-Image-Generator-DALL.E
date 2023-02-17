import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FillOtp from "../../components/FillOtp";
import { sendEmail } from "../../state/userSlice";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    user: { email },
    status,
  } = useSelector((state) => state.userReducer, shallowEqual);

  const resend = () => dispatch(sendEmail(navigate));

  return (
    <>
      <FillOtp
        {...{
          resend,
          status,
          buttonText: "Verify Email",
          email,
          title: "Email verification",
        }}
      />
    </>
  );
};

export default VerifyEmail;

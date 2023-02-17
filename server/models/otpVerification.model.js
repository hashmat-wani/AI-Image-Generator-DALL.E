import mongoose from "mongoose";
const otpVerificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    otp: { type: String, required: true },
    type: { type: String, required: true },
    expiresIn: { type: Date, required: true },
  },
  { versionKey: false }
);

const OTPVerification = mongoose.model(
  "OTPVerification",
  otpVerificationSchema
);

export default OTPVerification;

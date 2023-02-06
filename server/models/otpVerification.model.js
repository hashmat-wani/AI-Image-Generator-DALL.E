import mongoose from "mongoose";
const otpVerificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, required: true },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false }
);

const OTPVerification = mongoose.model(
  "OTPVerification",
  otpVerificationSchema
);

export default OTPVerification;

import mongoose from "mongoose";

const refreshTokenSchema = new mongoose.Schema(
  {
    refresh_token: { type: String, unique: true },
  },
  { timestamps: false, versionKey: false }
);

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

export default RefreshToken;

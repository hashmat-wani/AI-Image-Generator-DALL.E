import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: Object, default: null },
    verified: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    resetToken: { type: Object, default: null },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;

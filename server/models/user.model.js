import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: String,
    verified: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("User", userSchema);

export default User;

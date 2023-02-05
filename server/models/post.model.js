import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    prompt: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

export default Post;

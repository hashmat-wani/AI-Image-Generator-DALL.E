import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

const Post = mongoose.model("Post", postSchema);

export default Post;

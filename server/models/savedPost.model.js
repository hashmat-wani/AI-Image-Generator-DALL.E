import mongoose from "mongoose";

const savedPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      required: true,
    },
    prompt: { type: String, required: true },
    image: { type: Object, required: true },
  },
  { timestamps: true, versionKey: false }
);

const SavedPost = mongoose.model("SavedPost", savedPostSchema);

export default SavedPost;

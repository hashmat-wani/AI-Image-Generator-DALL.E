import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    private: { type: Boolean, default: true },
  },
  { timestamps: true, versionKey: false }
);

const Collection = mongoose.model("Collection", collectionSchema);

export default Collection;

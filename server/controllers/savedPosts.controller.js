import Joi from "joi";
import cloudinary from "../config/cloudinary.js";
import { SavedPost } from "../models/index.js";

export const savedPostsController = {
  async getSingleCollectionPosts(req, res, next) {
    try {
      const page = req.query?.page || 1;
      const size = req.query?.size || 10;
      const skip = (page - 1) * size;
      const { collectionId } = req?.params;
      const posts = await SavedPost.find({ collectionId })
        .populate("collectionId")
        .sort({ _id: -1 })
        .skip(skip)
        .limit(size);

      const totalPages = Math.ceil(
        (await SavedPost.find({ collectionId }).countDocuments()) / size
      );
      return res
        .status(200)
        .json({ success: true, data: posts, currPage: page, totalPages });
    } catch (err) {
      return next(err);
    }
  },

  async createSavedPost(req, res, next) {
    const validationSchema = Joi.object({
      collectionId: Joi.string().required(),
      prompt: Joi.string().required(),
      image: Joi.string().required(),
    });

    const { image, prompt, collectionId } = req.body;
    const { error } = validationSchema.validate(req.body);

    if (error) {
      return next(error);
    }

    try {
      const imageUrl = await cloudinary.uploader.upload(image);
      const { _id } = req?.user;

      await SavedPost.create({
        image: { url: imageUrl.secure_url, id: imageUrl.public_id },
        prompt,
        collectionId,
        user: _id,
      });
      res.status(201).json({ success: "true" });
    } catch (err) {
      return next(err);
    }
  },

  async removeSavedPost(req, res, next) {
    try {
      const { id } = req.params;
      const post = await SavedPost.findById(id);
      await cloudinary.uploader.destroy(post.image.id);
      await SavedPost.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ success: true, message: "Removed successfully" });
    } catch (err) {
      return next(err);
    }
  },
};

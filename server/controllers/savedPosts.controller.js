import Joi from "joi";
import cloudinary from "../config/cloudinary.js";
import { SavedPost } from "../models/index.js";

export const savedPostsController = {
  async getSingleCollectionPosts(req, res, next) {
    try {
      const { id } = req?.params;
      const posts = await SavedPost.find({ collectionId: id }).populate(
        "collectionId"
      );
      res.status(200).json({ status: "success", data: posts });
    } catch (err) {
      return next(err);
    }
  },

  async savePost(req, res, next) {
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
      console.log(_id);

      await SavedPost.create({
        image: { url: imageUrl.url, id: imageUrl.public_id },
        prompt,
        collectionId,
        user: _id,
      });
      res.status(201).json({ success: "true" });
    } catch (err) {
      return next(err);
    }
  },
};

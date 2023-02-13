import { Collection, SavedPost } from "../models/index.js";
import Joi from "joi";
import cloudinary from "../config/cloudinary.js";

export const collectionsController = {
  async getCollections(req, res, next) {
    try {
      const { _id: userId } = req?.user;
      const collections = await Collection.find({ user: userId });
      res.status(200).json({ status: "success", data: collections });
    } catch (err) {
      next(err);
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

  async createCollection(req, res, next) {
    try {
      const { _id } = req?.user;
      await Collection.create({ name: req.body?.name, user: _id });
      return res
        .status(201)
        .json({ status: "success", message: "Collection created" });
    } catch (err) {
      return next(err);
    }
  },
};

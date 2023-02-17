import { Collection, SavedPost } from "../models/index.js";
import { createSlug } from "../utils/index.js";
import cloudinary from "../config/cloudinary.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import Joi from "joi";

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

  async getSingleCollection(req, res, next) {
    try {
      const { id } = req?.params;
      const collection = await Collection.findById(id);
      res.status(200).json({ status: "success", data: collection });
    } catch (err) {
      next(err);
    }
  },

  async createCollection(req, res, next) {
    try {
      const { _id } = req?.user;
      const { name } = req?.body;
      // validation
      const validationSchema = Joi.object({
        name: Joi.string().lowercase().invalid("favorites").required(),
      });

      const { error } = validationSchema.validate({ name });

      if (error) {
        return next(error);
      }

      await Collection.create({
        name,
        slug: createSlug(name),
        user: _id,
      });
      return res
        .status(201)
        .json({ status: "success", message: "Collection created" });
    } catch (err) {
      return next(err);
    }
  },

  async editCollection(req, res, next) {
    try {
      const { id } = req?.params;
      const { name } = req?.body;

      const validationSchema = Joi.object({
        name: Joi.string().lowercase().invalid("favorites").required(),
      });

      const { error } = validationSchema.validate({ name });

      if (error) {
        return next(error);
      }

      const collection = await Collection.findById(id);
      if (collection.name === "Favorites") {
        return next(
          CustomErrorHandler.forbidden(
            "Sorry, you can't Edit Favorites collection"
          )
        );
      }

      await Collection.findByIdAndUpdate(id, {
        name,
        slug: createSlug(name),
      });
      return res
        .status(201)
        .json({ status: "success", message: "Edited Successfully" });
    } catch (err) {
      return next(err);
    }
  },

  async deleteCollection(req, res, next) {
    try {
      const { id } = req?.params;

      const collection = await Collection.findById(id);
      if (collection.name === "Favorites") {
        return next(
          CustomErrorHandler.forbidden(
            "Sorry, you can't delete Favorites collection"
          )
        );
      }

      // deleting savedPost from cloudinary
      const delSavedPosts = await SavedPost.find({ collectionId: id });
      delSavedPosts.forEach(async (node) => {
        await cloudinary.uploader.destroy(node.image.id);
      });
      // deleting savedPosts from database
      await SavedPost.deleteMany({ collectionId: id });

      // finally delete collection
      await Collection.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ success: true, message: "Collection deleted successfully" });
    } catch (err) {
      return next(err);
    }
  },
};

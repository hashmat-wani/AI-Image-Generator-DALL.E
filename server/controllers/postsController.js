import Joi from "Joi";
import Post from "../models/post.model.js";

const postController = {
  async createPost(req, res, next) {
    const validationSchema = Joi.object({
      user: Joi.string().required(),
      prompt: Joi.string().required(),
      image: Joi.string().required(),
    });

    const { image, prompt } = req.body;
    const { _id: user } = req.user;
    const { error } = validationSchema.validate({ image, prompt, user });

    if (error) {
      return next(error);
    }

    try {
      const post = await Post.create({ image, prompt, user });
      res
        .status(201)
        .json({ success: "true", message: "Post created successfully" });
    } catch (err) {
      return next(err);
    }
  },

  async fetchAllPosts(req, res, next) {
    try {
      const page = req.query?.page || 1;
      const size = req.query?.size || 19;
      const skip = (page - 1) * size;
      const posts = await Post.find()
        .populate("user", ["firstName", "lastName", "avatar"])
        .sort({ _id: -1 })
        .skip(skip)
        .limit(size);
      const totalPages = Math.ceil((await Post.find().countDocuments()) / size);
      return res.status(200).json({ success: true, posts, totalPages });
    } catch (err) {
      return next(err);
    }
  },
};

export default postController;

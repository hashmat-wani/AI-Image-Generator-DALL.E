import multer, { diskStorage } from "multer";
import CustomErrorHandler from "../services/CustomErrorHandler.js";
import Joi from "Joi";
import fs from "fs";
import Post from "../models/post.model.js";
import path from "path";

// const storage = diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => {
//     const uniqueFileName = `${Date.now()}-${Math.round(
//       Math.random() * 1e9
//     )}${path.extname(file.originalname)}`;
//     cb(null, uniqueFileName);
//   },
// });

// const handleMultiPartData = multer({
//   storage,
//   limits: {
//     fileSize: 100000 * 10,
//   },
// }).single("image");

const postController = {
  async createPost(req, res, next) {
    const validationSchema = Joi.object({
      userId: Joi.string().required(),
      prompt: Joi.string().required(),
      image: Joi.string().required(),
    });

    const { image, prompt } = req.body;
    const { _id: userId } = req.user;
    const { error } = validationSchema.validate({ image, prompt, userId });

    if (error) {
      return next(error);
    }

    try {
      const post = await Post.create({ image, prompt, userId });
      res
        .status(201)
        .json({ success: "true", message: "Post created successfully" });
    } catch (err) {
      return next(err);
    }
  },

  async fetchAllPosts(req, res, next) {
    try {
      const posts = await Post.find();
      return res.status(200).json({ posts });
    } catch (err) {
      return next(err);
    }
  },

  // This was for multipart data---if user selected image from system
  // async store(req, res, next) {
  //   handleMultiPartData(req, res, async (err) => {
  //     if (err) return next(CustomErrorHandler.serverError(err.message));

  //     const validationSchema = Joi.object({
  //       userId: Joi.string().required("Required"),
  //       prompt: Joi.string().required("Required"),
  //     });

  //     const { userId, prompt } = req.body;
  //     const { error } = validationSchema.validate({ userId, prompt });
  //     const filePath = req.file.path;
  //     if (error) {
  //       // deleteing back the file
  //       fs.unlink(`${appRoot}/${filePath}`, (err) => {
  //         if (err) return next(CustomErrorHandler.serverError(err.message));
  //       });
  //       return next(error);
  //     }
  //     try {
  //       await Post.create({
  //         prompt,
  //         userId,
  //         image: filePath,
  //       });

  //       return res
  //         .status(201)
  //         .json({ success: true, message: "Post created succesfully" });
  //     } catch (err) {
  //       return next(err);
  //     }
  //   });
  // },
};

export default postController;

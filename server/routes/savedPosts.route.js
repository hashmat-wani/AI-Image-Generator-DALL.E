import express from "express";
import { savedPostsController } from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";
const router = express.Router();

router.get("/:id", authenticate, savedPostsController.getSingleCollectionPosts);

router.post("/save", authenticate, savedPostsController.savePost);

export default router;

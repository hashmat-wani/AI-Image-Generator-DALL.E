import express from "express";
import { savedPostsController } from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";
const router = express.Router();

router.get(
  "/:collectionId",
  authenticate,
  savedPostsController.getSingleCollectionPosts
);

router.post("/save", authenticate, savedPostsController.createSavedPost);


router.delete("/:id", authenticate, savedPostsController.removeSavedPost);

export default router;

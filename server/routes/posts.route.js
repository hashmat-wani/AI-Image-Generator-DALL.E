import express from "express";

import { postsController } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", postsController.fetchAllPosts);

router.post("/", authenticate, postsController.createPost);

router.delete("/:id", authenticate, postsController.deletePost);

router.get("/:id", authenticate, postsController.fetchSingleUserPosts);

export default router;

import express from "express";

import postsController from "../controllers/postsController.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", postsController.fetchAllPosts);

router.post("/", authenticate, postsController.createPost);
export default router;

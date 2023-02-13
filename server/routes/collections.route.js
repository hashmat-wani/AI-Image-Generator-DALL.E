import express from "express";
import { collectionsController } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", authenticate, collectionsController.getCollections);

router.post("/", authenticate, collectionsController.createCollection);

router.post("/savepost", authenticate, collectionsController.savePost);

export default router;

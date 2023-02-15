import express from "express";
import { collectionsController } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.get("/", authenticate, collectionsController.getCollections);

router.get("/:id", authenticate, collectionsController.getSingleCollection);

router.post("/", authenticate, collectionsController.createCollection);

router.patch("/:id", authenticate, collectionsController.editCollection);

router.delete("/:id", authenticate, collectionsController.deleteCollection);

export default router;

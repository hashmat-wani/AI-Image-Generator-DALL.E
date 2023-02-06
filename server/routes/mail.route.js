import express from "express";
import { mailController } from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";

const router = express.Router();

router.post("/verifyotp", mailController.verifyOtp);
router.get("/sendotp", authenticate, mailController.sendOtp);

export default router;

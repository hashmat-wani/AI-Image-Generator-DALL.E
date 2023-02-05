import express from "express";
import multer from "multer";
import { userController } from "../controllers/index.js";
import { authenticate } from "../middlewares/authenticate.js";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),

  filename: (req, file, cb) => {
    const uniqueFileName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueFileName);
  },
});

const upload = multer({
  storage,
});
router.patch(
  "/updateavatar",
  authenticate,
  upload.single("avatar"),
  userController.updateAvatar
);
router.post("/removeavatar", authenticate, userController.removeAvatar);

router.patch("/changepassword", authenticate, userController.changePassword);

export default router;

import express from "express";
import passport from "../config/passport.js";
import {
  CLIENT_DEV_API,
  CLIENT_PROD_API,
  JWT_REFRESH_SECRET,
  MODE,
} from "../config/index.js";
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  userController,
} from "../controllers/index.js";
import { authenticate } from "../middlewares/index.js";
import JwtService from "../services/JwtService.js";
import CustomErrorHandler from "../services/CustomErrorHandler.js";

const router = express.Router();

// GOOGLE OAUTH

router.get("/login/failed", (req, res) => {
  return next(CustomErrorHandler.unAuthorised());
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login/failed",
    session: false,
  }),
  function (req, res) {
    try {
      const { user } = req.user;

      // generate tokens
      const access_token = JwtService.sign({
        _id: user._id,
        email: user.email,
      });

      const refresh_token = JwtService.sign(
        { _id: user._id, email: user.email },
        "28d",
        JWT_REFRESH_SECRET
      );

      return res
        .status(200)
        .cookie("access_token", `Bearer ${access_token}`, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .cookie("refresh_token", `Bearer ${refresh_token}`, {
          httpOnly: true,
          sameSite: "None",
          secure: true,
        })
        .redirect(`${MODE === "dev" ? CLIENT_DEV_API : CLIENT_PROD_API}`);
    } catch (err) {
      return next(err);
    }
  }
);

// REGISTER

router.post("/register", registerController.register);

// LOGIN

router.post("/login", loginController.login);

// LOGOUT

router.post("/logout", authenticate, logoutController.logout);

// WHO AM I

router.get("/me", authenticate, userController.me);

// REFRESH TOKEN

router.post("/refreshtoken", refreshTokenController.refresh);

export default router;

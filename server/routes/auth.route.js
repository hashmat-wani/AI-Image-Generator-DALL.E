import express from "express";
import passport from "../config/googleOauth.js";
import {
  loginController,
  logoutController,
  refreshTokenController,
  registerController,
  userController,
} from "../controllers/index.js";
import { auth } from "../middlewares/index.js";

const router = express.Router();

// GOOGLE OAUTH

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

// REGISTER

router.post("/register", registerController.register);

// LOGIN

router.post("/login", loginController.login);

// LOGOUT

router.post("/logout", auth, logoutController.logout);

// WHO AM I

router.get("/me", auth, userController.me);

// REFRESH TOKEN

router.post("/refreshtoken", refreshTokenController.refresh);

export default router;

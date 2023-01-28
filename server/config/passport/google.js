import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import {
  DEV_API,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  MODE,
  PROD_API,
} from "../index.js";
import loginController from "../../controllers/auth/login.controller.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${
        MODE === "dev" ? DEV_API : PROD_API
      }/api/v1/auth/google/callback`,
    },
    function (accessToken, refreshToken, profile, cb) {
      const {
        given_name: firstName,
        family_name: lastName,
        email,
        picture: avatar,
      } = profile?._json;
      loginController.oAuthLogin(firstName, lastName, email, cb, avatar);
    }
  )
);

// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// passport.deserializeUser((user, done) => {
//   done(null, user);
// });

export default passport;

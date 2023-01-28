import passport from "passport";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { loginController } from "../../controllers/index.js";

import {
  DEV_API,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  MODE,
  PROD_API,
} from "../index.js";

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_CLIENT_ID,
      clientSecret: FACEBOOK_CLIENT_SECRET,
      callbackURL: `${
        MODE === "dev" ? DEV_API : PROD_API
      }/api/v1/auth/facebook/callback`,
      profileFields: ["id", "emails", "name"],
    },
    function (accessToken, refreshToken, profile, cb) {
      const {
        first_name: firstName,
        last_name: lastName,
        email,
      } = profile?._json;
      loginController.oAuthLogin(firstName, lastName, email, cb);
    }
  )
);

export default passport;

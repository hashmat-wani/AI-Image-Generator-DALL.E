import { Strategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
import passport from "passport";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./index.js";

dotenv.config();

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/v1/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      //   User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(null, "user");
      //   });
    }
  )
);

export default passport;

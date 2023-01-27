import { Strategy } from "passport-google-oauth20";
import * as dotenv from "dotenv";
import passport from "passport";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "./index.js";
import { User } from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

dotenv.config();

passport.use(
  new Strategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/v1/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      const {
        given_name: firstName,
        family_name: lastName,
        email,
        picture: avatar,
      } = profile?._json;
      try {
        let user = await User.findOne({ email });

        if (!user) {
          const password = await bcrypt.hash(uuidv4(), 10);
          user = await User.create({
            firstName,
            lastName,
            email,
            password,
            avatar,
          });
        }
        return cb(null, {
          success: true,
          user,
        });
      } catch (err) {
        return cb(err, null);
      }
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

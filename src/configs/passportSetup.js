import passport from "passport";
import { Strategy } from "passport-twitter";
import userModel from "../models/userModel.js";
import "dotenv/config";

const passportSetup = () => {
  passport.use(
    new Strategy(
      {
        //options of twitter strategy
        consumerKey: process.env.API_KEY,
        consumerSecret: process.env.API_KEY_SECRET,
        callbackURL: process.env.CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        //passport callback function
        const currentUser = await userModel.findOne({
          twitterId: profile._json.id_str,
        });
        if (!currentUser) {
          const newUser = await new userModel({
            name: profile._json.name,
            screenName: profile._json.screen_name,
            twitterId: profile._json.id_str,
            profileImageUrl: profile._json.profile_image_url,
          }).save();
          if (newUser) {
            done(null, newUser);
          }
        }
        done(null, currentUser);
      }
    )
  );
};

export default passportSetup;

import passport from "passport";
import { Strategy } from "passport-twitter";
import userModel from "../models/userModel.js";
import "dotenv/config";

const passportSetup = () => {
  try {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
      await userModel
        .findById(id)
        .then((user) => {
          done(null, user);
        })
        .catch((e) => {
          done(new Error("Failed to deserialize an user", e));
        });
    });

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
  } catch (err) {
    console.log(err, "err");
  }
};

export default passportSetup;

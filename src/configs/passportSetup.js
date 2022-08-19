import passport from "passport";
import { Strategy } from "passport-twitter";
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
      () => {
        //passport callback function
      }
    )
  );
};

export default passportSetup;

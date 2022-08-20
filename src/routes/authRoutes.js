import { Router } from "express";
import passport from "passport";
import "dotenv/config";

const authRouter = Router();

// auth with twitter
authRouter.get("/twitter", passport.authenticate("twitter"));

//callback route for twitter to redirect to
authRouter.get(
  "/twitter/reqirect",
  passport.authenticate("twitter", {
    successRedirect: process.env.CLIENT_BASE_URL,
    failureRedirect: "auth/login/failed",
  }),
  (req, res) => {
    res.send("Redirected route");
  }
);

export default authRouter;

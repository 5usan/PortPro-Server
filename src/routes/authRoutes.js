import { Router } from "express";
import passport from "passport";
import { login, signup } from "../controllers/authController.js";
import "dotenv/config";

const authRouter = Router();

authRouter.post("/login", login);
authRouter.get("/login", (req, res) => {
  res.send("hi");
});

authRouter.post("/signup", signup);

// auth with twitter
authRouter.get("/twitter", passport.authenticate("twitter"));

//callback route for twitter to redirect to
authRouter.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: process.env.CLIENT_BASE_URL,
    failureRedirect: "auth/login/failed",
  })
);

authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_BASE_URL);
});

export default authRouter;

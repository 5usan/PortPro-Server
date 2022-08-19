import { Router } from "express";
import passport from "passport";
import "dotenv/config";

const authRouter = Router();

// when login is successful, retrieve user info
authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies,
    });
  }
});

// when login failed, send failed msg
authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

// When logout, redirect to client
authRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_BASE_URL);
});

// auth with twitter
authRouter.get("/twitter", passport.authenticate("twitter"));

// redirect to home page after successfully login via twitter
authRouter.get(
  "/twitter/redirect",
  passport.authenticate("twitter", {
    successRedirect: process.env.CLIENT_BASE_URL,
    failureRedirect: "/auth/login/failed",
  })
);

export default authRouter;

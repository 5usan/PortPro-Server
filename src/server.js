import express from "express";
import session from "express-session";
import passport from "passport";
import cookieSession from "cookie-session";
import databaseConfig from "./configs/databaseConfig.js";
import authRouter from "./routes/authRoutes.js";
import passportSetup from "./configs/passportSetup.js";
import "dotenv/config";

passportSetup();

const app = express();

app.use(express.json());

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: process.env.COOKIE_KEY,
  })
);

app.use(passport.initialize());

app.use(passport.session());

databaseConfig();

app.use("/auth", authRouter);

// app.use(session({ secret: "keyboard cat" }));

app.get("/", (req, res) => {
  res.send("Port-Pro Running Properly. Have a Wonderful Day.");
});

app.listen(process.env.PORT, () => {
  console.log(
    `server started at port ${process.env.BASE_URL}${process.env.PORT}`
  );
});

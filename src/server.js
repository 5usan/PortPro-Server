import express from "express";
import session from "express-session";
import passport from "passport";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import databaseConfig from "./configs/databaseConfig.js";
import passportSetup from "./configs/passportSetup.js";
import authRouter from "./routes/authRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";
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

app.use(cookieParser());

app.use(passport.initialize());

app.use(passport.session());

databaseConfig();

app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);

app.use(
  session({ secret: "keyboard cat", key: "sid", cookie: { secure: true } })
);

app.get("/", (req, res) => {
  res.send("Port-Pro Running Properly. Have a Wonderful Day.");
});

app.listen(process.env.PORT, () => {
  console.log(
    `server started at port ${process.env.BASE_URL}${process.env.PORT}`
  );
});

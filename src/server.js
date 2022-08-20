import express from "express";
import session from "express-session";
import passport from "passport";
import databaseConfig from "./configs/databaseConfig.js";
import authRouter from "./routes/authRoutes.js";
import passportSetup from "./configs/passportSetup.js";
import "dotenv/config";

passportSetup();

const app = express();


app.use(express.json());


databaseConfig();

app.use("/auth", authRouter);

app.use(session({ secret: "whatever", resave: true, saveUninitialized: true }));

app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

app.get("/", (req, res) => {
  res.send("Port-Pro Running Properly. Have a Wonderful Day.");
});

app.listen(process.env.PORT, () => {
  console.log(
    `server started at port ${process.env.BASE_URL}${process.env.PORT}`
  );
});

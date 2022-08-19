import express from "express";
import passport from "passport";
import cors from "cors";
import databaseConfig from "./configs/databaseConfig.js";
import authRouter from "./routes/authRoutes.js";
import passportSetup from "./configs/passportSetup.js";
import "dotenv/config";

const app = express();

app.use(express.json());

databaseConfig();

app.use(passport.initialize());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // allow session cookie from browser to pass through
  })
);

passportSetup();

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Port-Pro Running Properly. Have a Wonderful Day.");
});

app.listen(process.env.PORT, () => {
  console.log(
    `server started at port ${process.env.BASE_URL}${process.env.PORT}`
  );
});

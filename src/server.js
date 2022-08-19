import express from "express";
import databaseConfig from "./configs/databaseConfig.js";
import "dotenv/config";
const app = express();
app.use(express.json());
databaseConfig();

app.get("/", (req, res) => {
  res.send("Port-Pro Running Properly. Have a Wonderful Day.");
});

app.listen(process.env.PORT, () => {
  console.log(
    `server started at port ${process.env.BASE_URL}${process.env.PORT}`
  );
});  

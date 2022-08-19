import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Port-Pro Running Properly. Have a Wonderful Day.");
});

app.listen(process.env.PORT, () => {
  console.log(
    `server started at port ${process.env.BASE_URL}${process.env.PORT}`
  );
});

import mongoose from "mongoose";
import "dotenv/config";

const databaseConfig = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("Database connection ready!!!");
    })
    .catch((err) => {
      console.log(err, "err");
    });
};

export default databaseConfig;

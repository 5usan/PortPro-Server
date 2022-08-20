import mongoose from "mongoose";

export default mongoose.model(
  "User",
  mongoose.Schema(
    {
      email: {
        type: String,
      },
      password: {
        type: String,
      },
      name: {
        type: String,
      },
      screenName: {
        type: String,
      },
      twitterId: {
        type: String,
      },
      profileImageUrl: {
        type: String,
      },
    },
    { timestamps: true }
  )
);

import { errorResponse } from "../helpers/response.js";
import "dotenv/config";

export const authCheck = (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    if (!req.user && token !== process.env.USER_TOKEN) {
      return errorResponse({
        status: 400,
        message: "User is not authenticated",
        res,
      });
    }
    next();
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

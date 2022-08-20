import { errorResponse } from "../helpers/response.js";

export const authCheck = (req, res, next) => {
  try {
    if (!req.user) {
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

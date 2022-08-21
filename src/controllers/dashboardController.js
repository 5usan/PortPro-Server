import { errorResponse, okResponse } from "../helpers/response.js";
import userModel from "../models/userModel.js";
import {
  emptyBodyValidator,
} from "../helpers/validator.js";
import "dotenv/config";

export const getDashboard = async (req, res) => {
  try {
    if (emptyBodyValidator(req.body, res)) return;
    let { email } = req.params;
    const data = await userModel.findOne({
      email,
    });
    if (!data) {
      return errorResponse({
        status: 400,
        message: "Invalid email",
        res,
      });
    }
    return okResponse({
      status: 200,
      data: {
        userData: data,
        message: "User Dashboard",
      },
      res,
    });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

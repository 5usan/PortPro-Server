import { errorResponse, okResponse } from "../helpers/response";
import userModel from "../models/userModel";
import "dotenv/config";

export const login = async (req, res) => {
  if (Object.keys(req.body) === 0) {
    return errorResponse({
      status: 400,
      message: "Bad Request",
      res,
    });
  }
  let [email, password] = req.body;
  if (!email) {
    return errorResponse({
      status: 400,
      message: "Provide Email",
      res,
    });
  }
  if (!password) {
    return errorResponse({
      status: 400,
      message: "Provide Password",
      res,
    });
  }
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
  if (data.password !== password) {
    return errorResponse({
      status: 400,
      message: "Incorrect Password",
      res,
    });
  }
  return okResponse({
    status: 200,
    data: {
      email: data.email,
      token: process.env.USER_TOKEN,
      message: "Login Successful",
    },
    res,
  });
};

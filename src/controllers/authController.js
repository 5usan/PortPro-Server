import { errorResponse, okResponse } from "../helpers/response.js";
import userModel from "../models/userModel.js";
import "dotenv/config";
import {
  bodyValidator,
  emptyBodyValidator,
  emptyFieldValidator,
} from "../helpers/validator.js";

export const login = async (req, res) => {
  try {
    if (bodyValidator(req.body, res)) return;
    let { email, password } = req.body;
    const fields = [email, password];
    if (emptyFieldValidator(fields, res)) return;
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
        token: "Bearer " + process.env.USER_TOKEN,
        message: "Login Successful",
      },
      res,
    });
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

export const signup = async (req, res) => {
  try {
    if (bodyValidator(req.body, res)) return;
    let { email, password, confirmPassword } = req.body;
    const fields = [email, password, confirmPassword];
    if (emptyFieldValidator(fields, res)) return;
    if (password !== confirmPassword) {
      return errorResponse({
        status: 400,
        message: "password and confirmPassword doesnot match",
        res,
      });
    }
    let data = await new userModel({
      email,
      password,
    }).save();

    if (!data) {
      return errorResponse({
        status: 200,
        message: "User cannot be created",
        res,
      });
    }
    return okResponse({ status: 400, data: { message: "User created" } }, res);
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

export const logout = (req, res) => {
  try {
    if (emptyBodyValidator(req.body, res)) return;
    req.logout();
    okResponse({ status: 200, data: "Token removed sucessfully", res });
    res.redirect(process.env.CLIENT_BASE_URL);
  } catch (err) {
    errorResponse({ status: 500, message: err.message, res });
  }
};

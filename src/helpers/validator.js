import { errorResponse } from "./response.js";

export const emptyBodyValidator = (body, res) => {
  if (Object.keys(body).length) {
    errorResponse({
      status: 400,
      message: "Bad Request",
      res,
    });
  }
};

export const bodyValidator = (body, res) => {
  if (Object.keys(body).length === 0) {
    return errorResponse({
      status: 400,
      message: "Bad Request",
      res,
    });
  }
};

export const emptyFieldValidator = (data, res) => {
  var errorFlag = false;
  data.forEach((element) => {
    if (element.length === 0) {
      errorFlag = true;
    }
  });
  if (errorFlag) {
    errorResponse({
      status: 400,
      message: "Provide all the fields",
      res,
    });
    return true;
  }
};

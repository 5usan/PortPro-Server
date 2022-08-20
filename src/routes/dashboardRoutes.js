import { Router } from "express";
import { authCheck } from "../middlewares/authCheck.js";

const dashboardRouter = Router();

dashboardRouter.get("/", authCheck, (req, res) => {
  res.send(req.user);
});

export default dashboardRouter;

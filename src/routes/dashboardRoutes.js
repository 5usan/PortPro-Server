import { Router } from "express";
import { getDashboard } from "../controllers/dashboardController.js";
import { authCheck } from "../middlewares/authCheck.js";

const dashboardRouter = Router();

dashboardRouter.get("/:email", authCheck, getDashboard);

export default dashboardRouter;

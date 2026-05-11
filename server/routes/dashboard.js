import express from "express";
import { checkJWT } from "../middlewars/jwt.js";
import { getDashboardOverview } from "../controllers/dashboard.js";

const dashboardRouter = express.Router();

dashboardRouter.get("/", checkJWT, getDashboardOverview);

export default dashboardRouter;
import express from "express";

import reportRoutes from "./appModules/reports/reportsRoutes.js";
import userRoutes from "./appModules/users/userRoutes.js";
import metricRouter from "./appModules/metrics/metricRouter.js";

const routes = express.Router();

routes.use("/users", userRoutes());
routes.use("/reports", reportRoutes());
routes.use("/metrics", metricRouter());

export default routes;

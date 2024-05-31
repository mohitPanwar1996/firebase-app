import express from "express";
import {
  createMetrics,
  getMetricData,
  getMetrics,
  getMeasuresAndDimensions,
  syncMetricData,
  deleteMetric,
  getReportMetrics,
} from "./metricController.js";

export default function metricRouter() {
  const router = express.Router();

  router.post("/createMetrics", createMetrics);
  router.post("/getMetricData", getMetricData);
  router.get("/getMetrics", getMetrics);
  router.get("/getMeasuresAndDimensions", getMeasuresAndDimensions);
  router.post("/syncMetric", syncMetricData);
  router.post("/deleteMetric", deleteMetric);
  router.get("/getReportMetrics/:id", getReportMetrics);

  return router;
}

import axios from "axios";
import jwt from "jsonwebtoken";

import * as dotenv from "dotenv";
import { metricDb } from "../../database/metricDb.js";

dotenv.config();

// check github for the envs
const CUBE_SECRET = process.env.CUBE_SECRET || "";

const CUBE_URL = process.env.CUBE_URL || "";

export async function createMetrics(req, res) {
  try {
    const { data } = req.body;
    const saveData = await metricDb()
      .from("mc_metrics")
      .insert(data)
      .returning("*");

    res.status(200).send({
      message: "Success",
      data: saveData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err?.message || "no data found" });
  }
}

export async function getMetricData(req, res) {
  try {
    const { metricId } = req.body;
    const data = await metricDb()
      .from("mc_metrics")
      .select("*")
      .where("id", metricId);

    const query = data[0]?.query_payload;
    const jsonString = JSON.stringify(query);

    const request = await axios.get(
      `${process.env.CUBE_URL}/load?query=${jsonString}`,
      {
        headers: {
          Authorization: jwt.sign({}, CUBE_SECRET, {
            expiresIn: "30d",
          }),
        },
      }
    );

    res.status(200).send({
      message: request.data,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err?.message || "no data found" });
  }
}

export async function getMetrics(req, res) {
  try {
    const data = await metricDb().from("mc_metrics").select("*");
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error?.message || "no data found" });
  }
}

export async function getMeasuresAndDimensions(req, res) {
  try {
    console.log("CUBE_SECRET", CUBE_SECRET, CUBE_URL);
    const request = await axios.get(`${process.env.CUBE_URL}/meta`, {
      headers: {
        Authorization: jwt.sign({}, CUBE_SECRET, {
          expiresIn: "30d",
        }),
      },
    });
    const cubes = request.data?.cubes || [];
    const measures = [];
    const dimensions = [];
    const data = cubes.map((item) => {
      measures.push({
        measures: item.measures,
        modelName: item.name,
      });
      dimensions.push({
        dimensions: item.dimensions,
        modelName: item.name,
      });
    });

    res.status(200).send({ measures, dimensions });
    // const measures = request.data?.measures;
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err?.message || "no data found" });
  }
}

export const syncMetricData = async (req, res) => {
  try {
    const { query_payload, id, measure } = req.body;
    const jsonString = JSON.stringify(query_payload);
    const encodedString = encodeURIComponent(jsonString);
    const metricData = axios.get(
      `${process.env.CUBE_URL}/load?query=${encodedString}`,
      {
        headers: {
          Authorization: jwt.sign({}, CUBE_SECRET, {
            expiresIn: "30d",
          }),
        },
      }
    );

    const sqlQuery = axios.get(
      `${process.env.CUBE_URL}/sql?query=${encodedString}`,
      {
        headers: {
          Authorization: jwt.sign({}, CUBE_SECRET, {
            expiresIn: "30d",
          }),
        },
      }
    );

    const [data, query] = await Promise.all([metricData, sqlQuery]);
    const value = data.data.data[data.data.data.length - 1][measure.name];
    const trendData = data.data.data;
    const sql_query = query.data.sql.sql;
    const update = await metricDb()
      .from("mc_metrics")
      .where("id", id)
      .update({
        value: value,
        trend_data: trendData,
        raw_sql_query: sql_query,
      })
      .returning("*");

    res.status(200).send({ message: "request.data", data: update });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err?.message || "no data found" });
  }
};

export const deleteMetric = async (req, res) => {
  try {
    const { id } = req.body;
    const request = await metricDb.from("mc_metrics").where("id", id).del();
    res.status(200).send({ id, message: "delete successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err?.message || "no data found" });
  }
};

export const getReportMetrics = async (req, res) => {
  try {
    const { id } = req.params;
    const tenantDomain = req?.user || "domain_client";
    const request = await metricDb
      .from("mc_metrics")
      .select("*")
      .where("model", id);
    res.status(200).send(request);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err?.message || "no data found" });
  }
};

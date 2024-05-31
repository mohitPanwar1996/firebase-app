import Knex from "knex";

export const metricDb = () => {
  const database = Knex({
    client: "pg",
    connection:
      "postgresql://metrics_owner:wtHBRO7Vzg0X@ep-red-snowflake-a12mzmd9.ap-southeast-1.aws.neon.tech/metrics?sslmode=require",
  });
  return database;
};

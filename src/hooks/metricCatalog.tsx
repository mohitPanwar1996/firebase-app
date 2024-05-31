import neoAxios from "@/lib/firebaseAxios";

export async function getMetrics() {
  const res = await neoAxios("/metrics/getMetrics");
  return res.data;
}

export async function getMeasuresAndDimensions() {
  const res = await neoAxios("/metrics/getMeasuresAndDimensions");
  return res.data;
}

export async function createMetrics(data: any) {
  const res = await neoAxios.post("/metrics/createMetrics", { data });
  return res.data;
}

export async function syncMetricData(data: any) {
  const res = await neoAxios.post("/metrics/syncMetric", data);
  return res.data;
}

export async function deleteMetricFn(data: any) {
  const res = await neoAxios.post("/metrics/deleteMetric", data);
  return res.data;
}
// export async function getMeasuresAndDimensions() {
// 	const res = await neoAxios('/metric/getMeasuresAndDimensions');
// 	return res.data;
// }

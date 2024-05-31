import { Route, Routes } from "react-router-dom";
import MetricListV3 from "./MetricList";

export default function MetricCatalogRouter() {
  return (
    <Routes>
      <Route index={true} element={<MetricListV3 />} />
    </Routes>
  );
}

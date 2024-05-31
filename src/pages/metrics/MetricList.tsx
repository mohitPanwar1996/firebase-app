import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CandlestickChartIcon, ShapesIcon } from "lucide-react";

import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { MsPage, MsPageHeader } from "@/components/MsPage";
import { getMeasuresAndDimensions, getMetrics } from "@/hooks/metricCatalog";

import EditDialog from "./EditDialog";
import CreateMetric from "./CreateMetric";
import MetricsTable from "./MetricTable";

export default function MetricListV3() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [metricData, setMetricData] = useState({});
  const [updateData, setUpdateData] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery({
    queryKey: ["metricsV3", updateData],
    queryFn: () => getMetrics(),
  });

  const {
    data: measureAndDimensions,
    isLoading: isFetching,
    error: err,
  } = useQuery({
    queryKey: ["measuresAndDimensions"],
    queryFn: getMeasuresAndDimensions,
  });

  if (isLoading) return <Loader />;
  // setMetrics(data);
  const measures = measureAndDimensions?.measures;
  const dimensions = measureAndDimensions?.dimensions;

  const redirect = () => {
    return navigate("/metric-catalog-v3");
  };

  return (
    <MsPage>
      <MsPageHeader>
        <div>
          <h3 className="text-xl tracking-tight">Metric Catalog</h3>
        </div>

        <div className="flex items-center gap-1">
          <Button variant="outline" onClick={() => redirect()}>
            <ShapesIcon size={20} className="mr-1" />
            Classic Metric
          </Button>
          <CreateMetric
            measures={measures}
            dimensions={dimensions}
            setUpdateData={setUpdateData}
          />
        </div>
      </MsPageHeader>
      {data?.length > 0 ? (
        <div className="px-4 py-2 md:px-6 md:py-2">
          <div className="prose prose-gray mx-auto max-w-6xl dark:prose-invert">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Button size="icon" variant="outline">
                  <FilterIcon className="h-5 w-5" />
                  <span className="sr-only">Filter</span>
                </Button>
              </div>
            </div>
          </div>
          <MetricsTable
            data={data}
            setDialogOpen={setDialogOpen}
            setMetricData={setMetricData}
          />
        </div>
      ) : (
        <div className="w-[100%]">
          <CandlestickChartIcon className="h-28 w-28 text-[#c2c7cf] m-auto mt-[20%]" />
          <div className="text-center mt-[5%]">
            <p className="text-xl text-slate-700 ">Create a metric</p>
          </div>
          <div className="text-center mt-[2%]">
            <p className="text-[#7c8698] text-base">
              Click on Create metrics to configure
            </p>
          </div>
        </div>
      )}
      <EditDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        metricData={metricData}
        dimensions={dimensions}
        measures={measures}
      />
    </MsPage>
  );
}

function FilterIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}

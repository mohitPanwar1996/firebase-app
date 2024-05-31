import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import MsSelect from "@/components/MsSelect";
import { useEffect, useState } from "react";
import { startCase } from "lodash";

export default function EditDialog({
  dialogOpen,
  setDialogOpen,
  metricData,
  dimensions,
  measures,
}: any) {
  const [metricState, setMetricState] = useState<any>({});
  const [measureData, setMeasureData] = useState<any>({});
  const [dimensionData, setDimensionData] = useState<any>({});

  useEffect(() => {
    const defualtMeas = measures?.find((item: any) => {
      return metricData.model === item.modelName;
    });

    setMetricState(metricData);
  }, [metricData]);

  const editMetric = (obj: any) => {
    setMetricState((prev: any) => {
      return { ...prev, ...obj };
    });
  };

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={(e) => console.log(e)}>
        <DialogContent className=" overflow-y-scroll gap-1 w-100">
          <DialogHeader>
            <DialogTitle className="text-slate-700">Edit Metric</DialogTitle>
            <div className="border-b m-2"></div>
          </DialogHeader>
          <div className="m-1">
            <div className="py-6 grid gap-2 h-[400px] overflow-auto">
              <div className="gap-2 flex items-center justify-between">
                <Label className="text-slate-800 text-sm" htmlFor="name">
                  Name:
                </Label>
                <Input
                  className="w-[70%] mr-1"
                  id="name"
                  value={metricState?.name}
                  onChange={(e) => editMetric({ name: e.target.value })}
                />
              </div>
              <div className="gap-2 flex items-center justify-between">
                <Label className="text-slate-800 text-sm" htmlFor="description">
                  Description:
                </Label>
                <Input
                  className="w-[70%] mr-1"
                  id="description"
                  placeholder=""
                  value={metricState?.description}
                  onChange={(e) => editMetric({ description: e.target.value })}
                />
              </div>
              <div className="gap-2 flex items-center justify-between">
                <Label className="text-slate-800 text-sm" htmlFor="labels">
                  Labels:
                </Label>
                <div className="w-[70%] mr-1">
                  <MsSelect value={metricState.label} options={[]} />
                </div>
              </div>
              <div className="gap-2  flex items-center justify-between">
                <Label className="text-slate-800 text-sm" htmlFor="owner">
                  Owner:
                </Label>
                <div className="w-[70%] mr-1">
                  <MsSelect value={metricState.owner} options={[]} />
                </div>
              </div>
              <div className="border-b m-2"></div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-slate-800 text-sm" htmlFor="model">
                  Model:
                </Label>
                <div className="w-[70%] mr-1">
                  <MsSelect value={metricState.model} options={[]} />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-slate-800 text-sm" htmlFor="measure">
                  Measure:
                </Label>
                <div className="w-[70%] mr-1">
                  <MsSelect
                    value={startCase(metricState?.measure?.name?.split(".")[1])}
                    options={[]}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-slate-800 text-sm" htmlFor="dimension">
                  Dimension:
                </Label>
                <div className="w-[70%] mr-1">
                  <MsSelect
                    value={startCase(
                      metricState?.dimension?.name?.split(".")[1]
                    )}
                    label={startCase(
                      metricState?.dimension?.name?.split(".")[1]
                    )}
                    options={[]}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-slate-800 text-sm" htmlFor="granularity">
                  Granularity:
                </Label>
                <div className="w-[70%] mr-1">
                  <MsSelect
                    options={[
                      { label: "Month", value: "month" },
                      { label: "Quarter", value: "quarter" },
                      { label: "Year", value: "year" },
                    ]}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-slate-800 text-sm" htmlFor="filters">
                  Filters:
                </Label>
                <Button aria-label="Add filter" variant="outline">
                  <FilterIcon className="h-6 w-6" />
                </Button>
              </div>
              <div className="border-b m-2"></div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-slate-800 text-sm" htmlFor="show-last">
                  Show the last:
                </Label>
                <div className="flex items-center">
                  <Input
                    className="w-[70%] mr-1"
                    id="show-last"
                    placeholder="12"
                  />
                  <span className="ml-2">months</span>
                </div>
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label
                  className="text-slate-800 text-sm"
                  htmlFor="display-current"
                >
                  Display current (incomplete) month:
                </Label>
                <Switch id="display-current" className="mr-1" />
              </div>
              <div className="flex items-center justify-between gap-2">
                <Label className="text-slate-800 text-sm" htmlFor="goal">
                  Goal:
                </Label>
                <div className="w-[70%] flex gap-2 justify-between">
                  <Input className="w-[65%]" id="show-last" />
                  <div className="w-[40%] mr-1">
                    <MsSelect
                      options={[
                        { label: ">= greater than or equal", value: ">=" },
                        { label: "> greater than", value: ">" },
                        {
                          label: "<= less than or equal",
                          value: "<=",
                        },
                        {
                          label: "< less than",
                          value: "<",
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <div className="flex justify-end w-[100%] gap-4 pt-4 border-t">
              <Button variant="outline" onClick={(e) => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button>Save</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
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

function XIcon(props: any) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

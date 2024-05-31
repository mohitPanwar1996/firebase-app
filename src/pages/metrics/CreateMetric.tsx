import { useState } from "react";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import moment from "moment";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { DrawerTrigger, DrawerContent, Drawer } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { startCase } from "lodash";
import { measureObj } from "./types/metric";
import { createMetrics } from "@/hooks/metricCatalog";

export default function CreateMetric({
  measures,
  dimensions,
  setUpdateData,
}: any) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedMeasures, setSelectedMeasures] = useState<any>([]);
  const newMeasures: any = [];

  if (measures?.length > 0) {
    measures.map((item: any) => {
      const measures = item.measures.map((measure: any) => {
        const shortName = startCase(measure.name.split(".")[1]);
        newMeasures.push({
          label: shortName,
          value: measure.name,
          type: measure.type,
          modelName: item.modelName,
        });
      });
    });
  }

  const selectMetrics = (e: any, item: any) => {
    if (e) {
      setSelectedMeasures([...selectedMeasures, item]);
    } else {
      const newMeasures = selectedMeasures.filter(
        (i: any) => item.value !== i.value
      );
      setSelectedMeasures(newMeasures);
    }
  };

  const mutation = useMutation({
    mutationFn: createMetrics,
    onSuccess: (data) => {
      setUpdateData(data.data);
      toast({ description: "Metrics Created Successfully!" });
    },
  });

  const createMetric = async () => {
    const start = moment().subtract(1, "year").format("YYYY-MM-DD");
    const end = moment().format("YYYY-MM-DD");
    const data = selectedMeasures.map((item: any) => {
      const newObj: any = {};
      const reqModel = dimensions.find(
        (i: any) => i.modelName === item.modelName
      );
      const timeDimensions = reqModel.dimensions.filter(
        (i: any) => i.type === "time"
      )[0];
      newObj["name"] = item.label;
      newObj["model"] = reqModel.modelName;
      newObj["owner"] = "user";
      const measures = {
        type: item.type,
        name: item.value,
      };
      newObj["measure"] = measures;
      const time = {
        dimension: timeDimensions.name,
        granularity: "month",
        dateRange: [start, end],
      };
      newObj["dimension"] = { type: "time", ...time };
      const query = {
        limit: 1000,
        measures: [item.value],
        timeDimensions: [time],
      };
      const queryPayload = JSON.stringify(query);

      newObj["query_payload"] = queryPayload;
      return newObj;
    });
    const createMetrics = await mutation.mutate(data);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={(e) => {
        return setOpen(e);
      }}
      fadeFromIndex={100}
      snapPoints={[0.3, 0.5, 0.5]}
      modal={false}
      direction="right"
      preventScrollRestoration={false}
    >
      <DrawerTrigger asChild>
        <Button variant="outline">
          <ChevronsLeftIcon /> Create metrics
        </Button>
      </DrawerTrigger>
      <DrawerContent className="flex w-[50%] flex-col rounded-t-[10px] h-[96%] mt-24 fixed bottom-0 left-0 right-0">
        <Button
          variant="ghost"
          className="w-12 mx-2"
          onClick={() => setOpen(false)}
        >
          <ChevronsRightIcon className="mb-2" size={20} />
        </Button>
        <div className="flex flex-col bg-white px-6 py-0 ">
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold mb-2">Create metrics</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Convert measures into metrics
            </p>
          </div>
          <div className="flex flex-col flex-grow">
            <h3 className="text-lg font-semibold mb-2">
              Measures {`(${newMeasures.length})`}
            </h3>
            <div className="flex items-center mb-4">
              <Input placeholder="Search measures..." />
            </div>
            <div className="space-y-4 h-[400px] overflow-y-auto">
              {newMeasures.map((item: measureObj) => {
                return (
                  <div className="flex items-center">
                    <Checkbox
                      id={item.value}
                      value={item.value}
                      name={item.value}
                      // checked={item.value}
                      onCheckedChange={(e) => selectMetrics(e, item)}
                      // onChange={(e) => console.log(e.target)}
                    />
                    <Label className="flex-grow ml-2" htmlFor={item.value}>
                      {item.label}
                      <span className="block text-sm text-gray-600 dark:text-gray-400">
                        {startCase(item.modelName)}
                      </span>
                    </Label>
                    {/* <span className="text-sm text-gray-600 dark:text-gray-400">5 metrics</span> */}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex mt-4">
            <Button onClick={createMetric}>Create metrics</Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

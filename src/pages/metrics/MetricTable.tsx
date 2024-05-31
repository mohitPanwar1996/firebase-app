import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  MoreVerticalIcon,
  SquarePenIcon,
  Trash2Icon,
  RefreshCcwIcon,
  StarIcon,
} from "lucide-react";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { deleteMetricFn, syncMetricData } from "@/hooks/metricCatalog";
import { LineChart } from "@tremor/react";
import { MsTooltip } from "@/components/MsTooltip";

const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}$/;

const formatter = Intl.NumberFormat("en", { notation: "compact" });

export default function MetricsTable({
  data,
  setDialogOpen,
  setMetricData,
}: any) {
  const { toast } = useToast();
  const [defaultData, setDefualtData] = useState(data);
  const editDialog = (item: any) => {
    setMetricData(item);
    return setDialogOpen(true);
  };

  const mutation = useMutation({
    mutationFn: syncMetricData,
    onSuccess: (d) => {
      const newData = defaultData.map((i: any) => {
        if (i.id === d.data[0].id) {
          return d.data[0];
        }
        return i;
      });
      setDefualtData(newData);
      toast({ description: "Metric Synced!" });
    },
  });

  const syncData = (item: any) => {
    const sync = mutation.mutate(item);
  };

  const deleteMetric = useMutation({
    mutationFn: deleteMetricFn,
    onSuccess: (item) => {
      const newData = defaultData.filter((i: any) => {
        return i.id !== item.id;
      });

      setDefualtData(newData);
      toast({ description: "Metric Deleted Successfully!" });
    },
  });

  const callTrash = (item: any) => {
    const trash = deleteMetric.mutate(item);
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Metric</TableHead>
            <TableHead>Value</TableHead>
            <TableHead>Trend</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Actions</TableHead>
            {/* <TableHead className="text-right">
							<span className="sr-only">Bookmark</span>
						</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {defaultData?.map((item: any) => {
            const dataFormatter = (number: any) =>
              `$${Intl.NumberFormat("us").format(number).toString()}`;

            const data: any = [];
            if (item?.trend_data?.length > 0) {
              const newItem = item?.trend_data.map((i: any) => {
                const newObj: any = {};
                for (const key in i) {
                  if (key === item.measure.name) {
                    const newkey = key.split(".")[1];
                    newObj[newkey] = +i[key];
                  }
                  if (regex.test(i[key])) {
                    const formattedDate = new Date(i[key]).toLocaleDateString(
                      "en-GB",
                      {
                        month: "short",
                        year: "numeric",
                      }
                    );

                    newObj["date"] = formattedDate;
                  }
                }
                data.push(newObj);
              });
            }
            return (
              <TableRow>
                <TableCell>
                  <StarIcon className="text-slate-700" size={16} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ActivityIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-gray-500 dark:text-gray-400 text-sm">
                        Monthly
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{formatter.format(Number(item.value))}</TableCell>
                <TableCell>
                  {item?.trend_data?.length > 0 ? (
                    <LineChart
                      className="h-20 w-48 flex pt-0"
                      data={data}
                      index="date"
                      categories={[item.measure.name.split(".")[1]]}
                      colors={["indigo"]}
                      // valueFormatter={dataFormatter}
                      yAxisWidth={60}
                      onValueChange={(v) => console.log(v)}
                      showLegend={false}
                      showXAxis={false}
                      showYAxis={false}
                      showGridLines={false}
                    />
                  ) : (
                    "No Data"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <MsTooltip title={item.owner}>
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          alt="@shadcn"
                          src="/placeholder-avatar.jpg"
                        />
                        <AvatarFallback>
                          {item?.owner?.slice(0, 1)}
                        </AvatarFallback>
                      </Avatar>
                    </MsTooltip>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreVerticalIcon
                          size={18}
                          className="cursor-pointer text-slate-600"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => editDialog(item)}
                      >
                        <SquarePenIcon size={16} />{" "}
                        <p className="ml-1 text-sm">Edit</p>
                      </DropdownMenuItem> */}
                      {/* <DropdownMenuSeparator /> */}
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => syncData(item)}
                      >
                        <RefreshCcwIcon size={16} />{" "}
                        <p className="ml-1 text-sm">Sync</p>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => callTrash(item)}
                      >
                        <Trash2Icon size={16} />{" "}
                        <p className="ml-1 text-sm">Move to trash</p>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function ActivityIcon(props: any) {
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
      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
    </svg>
  );
}

function ArrowDownIcon(props: any) {
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
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIcon(props: any) {
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
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function BarChartIcon(props: any) {
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
      <line x1="12" x2="12" y1="20" y2="10" />
      <line x1="18" x2="18" y1="20" y2="4" />
      <line x1="6" x2="6" y1="20" y2="16" />
    </svg>
  );
}

function BookmarkIcon(props: any) {
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
      <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
    </svg>
  );
}

function PlusIcon(props: any) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function ShoppingCartIcon(props: any) {
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
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

function UsersIcon(props: any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

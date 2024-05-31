import { useState } from "react";
import { MoreVerticalIcon, SquarePenIcon, Trash2Icon } from "lucide-react";

import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";

export default function MoreOptions({ open, setOpen, setDialogOpen }: any) {
  return (
    <Popover open={open} onOpenChange={(e) => setOpen(e)}>
      <PopoverTrigger asChild>
        <MoreVerticalIcon className="cursor-pointer" />
      </PopoverTrigger>
      <PopoverContent className="w-[150px] focus-visible:tw-bg-action-hover cursor-pointer">
        {/* <div
          className="flex items-center gap-2"
          onClick={(e) => setDialogOpen(true)}
        >
          <SquarePenIcon size={16} /> <p className="text-sm">Edit</p>
        </div> */}
        <div className="border-b m-2"></div>
        <div className="flex items-center gap-2">
          <Trash2Icon size={16} /> <p className="text-sm">Move to trash</p>
        </div>
      </PopoverContent>
    </Popover>
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

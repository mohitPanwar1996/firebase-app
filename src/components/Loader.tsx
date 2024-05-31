import { UpdateIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center h-full">
        <UpdateIcon className="mr-2 h-6 w-6 animate-spin" />
      </div>
    </div>
  );
};

export const CardLoader = ({ className = "" }) => {
  return (
    <UpdateIcon
      className={cn("mr-2 h-6 w-6 animate-spin text-slate-500", className)}
    />
  );
};

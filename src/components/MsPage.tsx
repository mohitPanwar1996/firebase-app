import * as React from "react";

import { cn } from "@/lib/utils";

const MsPage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col flex-1", className)} {...props} />
));

MsPage.displayName = "MsPage";

const MsPageHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex justify-between p-2", className)}
    {...props}
  />
));

MsPageHeader.displayName = "MsPageHeader";

export { MsPage, MsPageHeader };

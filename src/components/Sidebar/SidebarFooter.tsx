import React from "react";
import { cn } from "../../utils";

export const SidebarFooter: React.FC<React.ComponentProps<"div">> = ({
  children,
  className,
  ...props
}) => (
  <div
    className={cn(`flex items-center justify-between p-4`, className)}
    {...props}
  >
    {children}
  </div>
);

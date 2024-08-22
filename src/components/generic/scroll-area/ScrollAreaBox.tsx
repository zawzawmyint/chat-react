import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export function ScrollAreaBox({
  className = "sm:h-96",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <ScrollArea className={cn("w-full", className)}>{children}</ScrollArea>
  );
}

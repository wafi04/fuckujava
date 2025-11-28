import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function HeaderDashboard({
  title = "Dashboard",
  children,
  className,
}: {
  className?: string;
  title?: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <div className={cn("flex flex-1 flex-col gap-4 pt-0", className)}>
        <div className="flex flex-col md:flex-row justify-between ">
            <h1 className="text-3xl font-bold tracking-tight text-primary">{title}</h1>
          {children}
        </div>
      </div>
    </>
  );
}

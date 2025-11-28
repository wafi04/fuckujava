
// src/components/ui/sortable-table-head.tsx
import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

interface SortableTableHeadProps {
  column: string;
  currentSortBy: string;
  currentSortOrder: string;
  onSort: (column: string) => void;
  children: React.ReactNode;
  className?: string;
}

export function SortableTableHead({
  column,
  currentSortBy,
  currentSortOrder,
  onSort,
  children,
  className,
}: SortableTableHeadProps) {
  const getSortIcon = () => {
    if (currentSortBy !== column) {
      return <ArrowUpDown className="h-4 w-4 ml-2" />;
    }
    return currentSortOrder === "asc" ? (
      <ArrowUp className="h-4 w-4 ml-2" />
    ) : (
      <ArrowDown className="h-4 w-4 ml-2" />
    );
  };

  return (
    <TableHead className={className}>
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 hover:bg-transparent"
        onClick={() => onSort(column)}
      >
        {children}
        {getSortIcon()}
      </Button>
    </TableHead>
  );
}

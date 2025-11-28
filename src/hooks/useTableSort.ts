// src/hooks/useTableSort.ts
import { useState } from "react";

interface UseTableSortProps {
  defaultSortBy?: string;
  defaultSortOrder?: "asc" | "desc";
  onSortChange?: (sortBy: string, sortOrder: string) => void;
}

export function useTableSort({
  defaultSortBy = "name",
  defaultSortOrder = "asc",
  onSortChange,
}: UseTableSortProps = {}) {
  const [currentSortBy, setCurrentSortBy] = useState<string>(defaultSortBy);
  const [currentSortOrder, setCurrentSortOrder] =
    useState<string>(defaultSortOrder);

  const handleSort = (column: string) => {
    let newOrder = "asc";

    // Jika kolom yang sama diklik, toggle order
    if (currentSortBy === column) {
      newOrder = currentSortOrder === "asc" ? "desc" : "asc";
    }

    setCurrentSortBy(column);
    setCurrentSortOrder(newOrder);

    // Callback untuk parent component
    if (onSortChange) {
      onSortChange(column, newOrder);
    }
  };

  return {
    currentSortBy,
    currentSortOrder,
    handleSort,
  };
}
import { Input } from "@/components/ui/input";
import { JSX } from "react";

interface FilterDashboardProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  currentLimit: number;
  setCurrentLimit: (value: number) => void;
}

export function FilterDashboard({
  searchTerm,
  setSearchTerm,
  currentLimit,
  setCurrentLimit,
}: FilterDashboardProps): JSX.Element {
  return (
    <>
      <div className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Cari...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Input
          type="number"
          placeholder="Limit per page..."
          value={currentLimit}
          onChange={(e) => {
            const value = e.target.value;
            const numValue = Number(value);

            setCurrentLimit(numValue);
          }}
          className="w-32"
        />
      </div>
    </>
  );
}

"use client";
import { useState } from "react";
import { Loader2, Calendar as CalendarIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/format";
import { useGetAllTransactions } from "../api";
import { FilterDashboard } from "@/components/ui/FilterDashboard";
import { TableOrder } from "./TableOrders";
import { PaginationComponents } from "@/components/ui/PaginationComponent";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

export default function DashboardOrder() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());

  const { data, isLoading } = useGetAllTransactions({
    limit: currentLimit.toString(),
    page: currentPage.toString(),
    search: searchTerm,
    status: statusFilter,
    start_date: startDate ? startDate.toISOString().split("T")[0] : "",
    end_date: endDate ? endDate.toISOString().split("T")[0] : "",
  });

  return (
    <main className="p-6">
      <section className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h3 className="text-2xl font-bold">Data Transaksi</h3>
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[350px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate && endDate ? (
                  <>
                    {formatDate(startDate.toISOString(), "date-only")} -{" "}
                    {formatDate(endDate.toISOString(), "date-only")}
                  </>
                ) : (
                  <span>Pilih Tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={{ from: startDate, to: endDate }}
                onSelect={(range) => {
                  setStartDate(range?.from);
                  setEndDate(range?.to);
                  setCurrentPage(1);
                }}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <FilterDashboard
            currentLimit={currentLimit}
            searchTerm={searchTerm}
            setCurrentLimit={(limit) => {
              setCurrentLimit(limit);
              setCurrentPage(1);
            }}
            setSearchTerm={(s) => {
              setSearchTerm(s);
              setCurrentPage(1);
            }}
          />

          {/* Filter Status */}
          <Select
            value={statusFilter}
            onValueChange={(status) => {
              setStatusFilter(status);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Status</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
            </SelectContent>
          </Select>

          {/* Popover Date Range */}
        </div>
      </section>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="animate-spin h-8 w-8" />
        </div>
      ) : (
        <div className="mb-6">
          <TableOrder data={data?.data.data || []} />
        </div>
      )}

      {data?.data.meta && (
        <PaginationComponents
          onPageChange={setCurrentPage}
          pagination={data?.data.meta}
        />
      )}
    </main>
  );
}

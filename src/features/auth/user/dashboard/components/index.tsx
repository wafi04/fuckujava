import { PaginationComponents } from "@/components/ui/PaginationComponent";
import { useState } from "react";
import { TableCustomers } from "./TableCustomers";
import { FilterDashboard } from "@/components/ui/FilterDashboard";
import { useGetAllCustomer } from "../../api/Api";


export default function DashboardCustomers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState<string | undefined>(undefined);

  const { data, isLoading, error } = useGetAllCustomer({
    limit: limit.toString(),
    page: currentPage.toString(),
    search,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit);
    setCurrentPage(1);
  };

  const handleSearchChange = (searchTerm: string | undefined) => {
    setSearch(searchTerm);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <main className="p-6">
        <div className="text-center text-red-500">
          Error loading users: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Users Management</h1>
        <FilterDashboard
          currentLimit={limit}
          searchTerm={search as string}
          setCurrentLimit={handleLimitChange}
          setSearchTerm={handleSearchChange}
        />
      </div>

      {isLoading ? (
        <div className="text-center text-muted-foreground">
          Loading users...
        </div>
      ) : (
        <>
          {data?.data?.data && <TableCustomers data={data.data.data} />}
          {data?.data?.meta && (
            <div className="flex justify-center">
              <PaginationComponents
                onPageChange={handlePageChange}
                pagination={data.data.meta}
              />
            </div>
          )}
        </>
      )}
    </main>
  );
}

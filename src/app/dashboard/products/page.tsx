"use client";
import { useState, useCallback, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Package, Filter } from "lucide-react";
import { PaginationComponents } from "../_components/PaginationComponents";
import { useGetResellerPricing } from "@/features/products/api/api";
import { TableProducts } from "@/features/products/components/TableProducts";


interface Filters {
  page: number;
  limit: number;
  search?: string;
  status?: string;
}

export default function DashboardProduct() {
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");

  const [filters, setFilters] = useState<Filters>({
    page: 1,
    limit: 10,
    search: undefined,
    status: "active", // Default status
  });

  // Debounced search to avoid too many API calls
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(filters.search as string);
    }, 500);

    return () => clearTimeout(timer);
  }, [filters.search]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      setFilters((prev) => ({ ...prev, page: 1 }));
    }
  }, [debouncedSearch, filters.search]);

  const { data, isLoading } = useGetResellerPricing({
    page: filters.page.toString(),
    limit: filters.limit.toString(),
    search: debouncedSearch,
    status: filters.status || "active",
    sortBy: sortBy || undefined,
    sortOrder: sortOrder || undefined,
  });

  const handlePageChange = useCallback((newPage: number) => {
    setFilters((prev) => ({ ...prev, page: newPage }));
  }, []);

  const handleLimitChange = useCallback((newLimit: string) => {
    setFilters((prev) => ({ ...prev, limit: parseInt(newLimit), page: 1 }));
  }, []);

  const handleSearchChange = useCallback((search: string) => {
    setFilters((prev) => ({ ...prev, search }));
  }, []);

  const handleStatusChange = useCallback((status: string) => {
    setFilters((prev) => ({ ...prev, status, page: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      page: 1,
      limit: 10,
      search: undefined,
      status: "active",
    });
  }, []);

  // Loading state with better skeleton
  if (isLoading) {
    return (
      <main className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-8 bg-muted rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
          </div>
        </div>

        <div className="border rounded-lg">
          <div className="p-4 border-b">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="h-10 bg-muted rounded flex-1 animate-pulse"></div>
              <div className="flex gap-2">
                <div className="h-10 bg-muted rounded w-32 animate-pulse"></div>
                <div className="h-10 bg-muted rounded w-20 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="animate-pulse">
            <div className="h-12 bg-muted/50"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-muted/20 border-t"></div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const products = data?.data?.data || [];
  const meta = data?.data?.meta;
  const hasActiveFilters = filters.search || filters.status !== "active";
  return (
    <main className="space-y-6 p-6 h-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Produk Reseller</h1>
          <p className="text-muted-foreground">Kelola harga produk reseller</p>
        </div>

        {/* Status indicators */}
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Total: {meta?.totalItems || 0}
          </Badge>
          {filters.status && (
            <Badge
              variant={filters.status === "active" ? "default" : "secondary"}
              className="text-xs"
            >
              {filters.status === "active"
                ? "Aktif"
                : filters.status === "inactive"
                ? "Tidak Aktif"
                : "Semua"}
            </Badge>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="border rounded-lg bg-background">
        <div className="p-4 border-b bg-muted/25">
          <div className="flex items-center gap-2 mb-3">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter & Pencarian</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama produk..."
                  value={filters.search || ""}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  Status:
                </span>
                <Select
                  value={filters.status}
                  onValueChange={handleStatusChange}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Aktif</SelectItem>
                    <SelectItem value="inactive">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Items per page */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                  Show:
                </span>
                <Select
                  value={filters.limit.toString()}
                  onValueChange={handleLimitChange}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-xs"
                >
                  Reset
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Active filters indicator */}
        {hasActiveFilters && (
          <div className="px-4 py-2 bg-primary/5 border-b">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Filter aktif:</span>
              {filters.search && (
                <Badge variant="secondary" className="text-xs">
                  Pencarian: "{filters.search}"
                </Badge>
              )}
              {filters.status !== "active" && (
                <Badge variant="secondary" className="text-xs">
                  Status:{" "}
                  {filters.status === "inactive" ? "Tidak Aktif" : "Semua"}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Table */}
        <div className="rounded-b-lg overflow-hidden">
          {products.length > 0 ? (
            <TableProducts
              products={products}
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
            />
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-muted p-3">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {filters.search || filters.status !== "active"
                  ? "Produk tidak ditemukan"
                  : "Tidak ada data produk"}
              </h3>

              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                {filters.search
                  ? `Tidak ada produk yang cocok dengan pencarian "${
                      filters.search
                    }"${
                      filters.status !== "active"
                        ? ` dengan status ${filters.status}`
                        : ""
                    }.`
                  : filters.status !== "active"
                  ? `Tidak ada produk dengan status ${
                      filters.status === "inactive" ? "tidak aktif" : "tersebut"
                    }.`
                  : "Belum ada data produk reseller yang tersedia."}
              </p>

              {hasActiveFilters && (
                <Button onClick={clearFilters} variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Hapus Semua Filter
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {meta && products.length > 0 && (
        <div className="flex justify-center pt-2 ">
          <PaginationComponents
            onPageChange={handlePageChange}
            pagination={meta}
          />
        </div>
      )}
    </main>
  );
}

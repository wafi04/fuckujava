import { useState } from "react";
import { useAuthQuery } from "../useAuthQuery";
import { useDebounce } from "@/hooks/useDebounce";
import { useGettransactionsResellerUser } from "@/features/orders/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, Mail, Monitor, Search, Shield, User, X } from "lucide-react";
import { formatDate } from "@/utils/format";
import { Input } from "@/components/ui/input";
import { PaginationComponents } from "@/components/ui/PaginationComponent";
import { TableTransactionsUser } from "./TableTransactionsUser";

export function ProfileCard() {
  const { data: user } = useAuthQuery();
  const [filters, setFilters] = useState({
    limit: 10,
    page: 1,
    search: "",
    status: "",
  });

  const debounceSearch = useDebounce(filters.search, 500);
  const userData = user?.data;
  
  const { data, isLoading, error } = useGettransactionsResellerUser({
    filters: {
      limit: filters.limit.toString(),
      page: filters.page.toString(),
      search: debounceSearch,
    },
  });

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({
      ...prev,
      page,
    }));
  };

  const setSearch = (search: string) => {
    setFilters((prev) => ({
      ...prev,
      search,
      page: 1, // Reset to page 1 when searching
    }));
  };

  const handleClearSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: "",
      page: 1,
    }));
  };

  if (!userData) {
    return (
      <main className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="container mx-auto py-8 max-w-screen-2xl">
        <div className="grid gap-6">
          {/* Main Profile Card */}
          <Card className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="space-y-3">
                    <div>
                      <CardTitle className="text-2xl">
                        {userData.username}
                      </CardTitle>
                      <CardDescription className="text-base mt-1">
                        {userData.email}
                      </CardDescription>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">
                        <Shield className="w-3 h-3 mr-1" />
                        {userData.role_name.charAt(0).toUpperCase() +
                          userData.role_name.slice(1)}
                      </Badge>
                      <Badge
                        variant={userData.is_active ? "default" : "destructive"}
                      >
                        <Activity className="w-3 h-3 mr-1" />
                        {userData.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Account & Activity Information Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Account Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Email</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {userData.email}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Username</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {userData.username}
                  </span>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Role</span>
                  </div>
                  <Badge variant="outline">
                    {userData.role_name.charAt(0).toUpperCase() +
                      userData.role_name.slice(1)}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Activity Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Activity Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start justify-between py-2 border-b">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Last Activity</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">
                      {formatDate(userData.last_activity)}
                    </span>
                  </div>
                </div>

                <div className="flex items-start justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Monitor className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">User Agent</span>
                  </div>
                  <div className="text-right max-w-xs">
                    <span className="text-xs text-muted-foreground break-all line-clamp-2">
                      {userData.user_agent}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transaction History Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    View and search through your recent transactions
                  </CardDescription>
                </div>
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search transactions..."
                    value={filters.search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-9"
                  />
                  {filters.search && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Loading State */}
              {isLoading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              )}

              {/* Error State */}
              {error && (
                <div className="text-center py-8">
                  <p className="text-destructive">Failed to load transactions</p>
                </div>
              )}

              {/* Data Table */}
              {data && !isLoading && !error && (
                <>
                  <TableTransactionsUser data={data?.data.data} />

                  {/* Empty State */}
                  {data.data.data.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        {filters.search
                          ? "No transactions found matching your search"
                          : "No transactions yet"}
                      </p>
                    </div>
                  )}

                  {/* Pagination */}
                  {data?.data.meta && data.data.data.length > 0 && (
                    <div className="mt-6">
                      <PaginationComponents
                        onPageChange={handlePageChange}
                        pagination={data.data.meta}
                      />
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
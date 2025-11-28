"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { api } from "@/lib/api";
import { API_RESPONSE } from "@/lib/types";
import { FormatCurrency } from "@/utils/format";
import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle,
  Clock,
  DollarSign,
  Loader,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { useState } from "react";

export interface TopProduct {
  product_id: number;
  transaction_count: number;
  total_revenue: number;
  avg_transaction_value: number;
  total_profit: number;
}

export interface StatsDashboard {
  failed_count: number;
  paid_count: number;
  pending_count: number;
  success_count: number;
  top_products: TopProduct[] | null;
  total_laba_2_days_ago: number;
  total_laba_today: number;
  total_laba_yesterday: number;
}

const formatNumber = (num: number): string =>
  new Intl.NumberFormat("id-ID").format(num);

const variantStyles: Record<
  "success" | "warning" | "destructive" | "info",
  string
> = {
  success: "border-green-200 bg-green-50 text-green-700",
  warning: "border-yellow-200 bg-yellow-50 text-yellow-700",
  destructive: "border-red-200 bg-red-50 text-red-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
};

export default function DashboardPage() {
  const defaultDate = new Date().toISOString().split("T")[0];
  const [startDate, setStartDate] = useState(defaultDate);
  const [endDate, setEndDate] = useState(defaultDate);

  const { data, isLoading, error } = useQuery({
    queryKey: ["stats-dashboard", startDate, endDate],
    queryFn: async () => {
      const req = await api.get<API_RESPONSE<StatsDashboard>>(
        `/trxreseller/stats?start_date=${startDate}&end_date=${endDate}`
      );
      return req.data;
    },
    refetchInterval: 30000, // Auto refresh every 30 seconds
  });

  const stats = data?.data;

  const totalTransactions =
    (stats?.pending_count || 0) +
    (stats?.paid_count || 0) +
    (stats?.success_count || 0) +
    (stats?.failed_count || 0);

  // Calculate profit trend safely
  const todayVsYesterday =
    stats && stats.total_laba_yesterday > 0
      ? ((stats.total_laba_today - stats.total_laba_yesterday) /
          stats.total_laba_yesterday) *
        100
      : 0;

  return (
    <main className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Transaksi
          </h1>
          <p className="text-muted-foreground">
            Ringkasan performa transaksi hari ini
          </p>
        </div>
        <div className="flex flex-row gap-2">
            <Input type="date" value={startDate} onChange={(e)  => setStartDate(e.target.value)}/>
            <Input type="date" value={endDate} onChange={(e)  => setEndDate(e.target.value)}/>

        </div>
      </div>

      {/* Transaction Status Cards */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Status Transaksi</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <StatsCard
            title="Menunggu"
            count={stats?.pending_count}
            icon={<Clock className="h-5 w-5" />}
            variant="warning"
            isLoading={isLoading}
          />
          <StatsCard
            title="Berhasil"
            count={stats?.success_count}
            icon={<CheckCircle className="h-5 w-5" />}
            variant="success"
            isLoading={isLoading}
          />
          <StatsCard
            title="Dibayar"
            count={stats?.paid_count}
            icon={<DollarSign className="h-5 w-5" />}
            variant="info"
            isLoading={isLoading}
          />
          <StatsCard
            title="Gagal"
            count={stats?.failed_count}
            icon={<XCircle className="h-5 w-5" />}
            variant="destructive"
            isLoading={isLoading}
          />
          <StatsCard
            title="Total Transactions"
            count={totalTransactions}
            icon={<CheckCircle className="h-5 w-5" />}
            variant="info"
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Profit Overview */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Ringkasan Keuntungan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProfitCard
            title="Hari Ini"
            amount={stats?.total_laba_today}
            trend={todayVsYesterday}
            isLoading={isLoading}
          />
          <ProfitCard
            title="Kemarin"
            amount={stats?.total_laba_yesterday}
            isLoading={isLoading}
          />
          <ProfitCard
            title="2 Hari Lalu"
            amount={stats?.total_laba_2_days_ago}
            isLoading={isLoading}
          />
        </div>
      </section>

      {/* Top Products */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Produk Terlaris</h2>
        {isLoading ? (
          <Loader className="h-40 w-full" />
        ) : stats?.top_products && stats.top_products.length > 0 ? (
          <TableTopProducts data={stats.top_products} />
        ) : (
          <p className="text-muted-foreground text-sm">
            Tidak ada produk terlaris untuk periode ini.
          </p>
        )}
      </section>
    </main>
  );
}

function StatsCard({
  title,
  count,
  icon,
  variant,
  isLoading,
}: StatsCardProps) {
  return (
    <Card
      className={`transition-all hover:shadow-md ${variantStyles[variant]}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {isLoading ? (
            <Loader className="h-8 w-16" />
          ) : (
            formatNumber(count || 0)
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface StatsCardProps {
  title: string;
  count?: number;
  icon: React.ReactNode;
  variant: "success" | "warning" | "destructive" | "info";
  isLoading: boolean;
}

function ProfitCard({ title, amount, trend, isLoading }: ProfitCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-1">
          <div className="text-2xl font-bold">
            {isLoading ? (
              <Loader className="h-8 w-24" />
            ) : (
              FormatCurrency(amount || 0)
            )}
          </div>
          {trend !== undefined && !isLoading && (
            <div className="flex items-center gap-1 text-sm">
              {trend > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={trend > 0 ? "text-green-600" : "text-red-600"}>
                {trend > 0 ? "+" : ""}
                {trend.toFixed(1)}% vs kemarin
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

interface ProfitCardProps {
  title: string;
  amount?: number;
  trend?: number;
  isLoading: boolean;
}

export function TableTopProducts({ data }: { data: TopProduct[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product ID</TableHead>
          <TableHead>Total Trx</TableHead>
          <TableHead>Total Pendapatan</TableHead>
          <TableHead>Rata-rata Pendapatan</TableHead>
          <TableHead>Total Profit</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.product_id}>
            <TableCell>{item.product_id}</TableCell>
            <TableCell>{formatNumber(item.transaction_count)}</TableCell>
            <TableCell>{FormatCurrency(item.total_revenue)}</TableCell>
            <TableCell>{FormatCurrency(item.avg_transaction_value)}</TableCell>
            <TableCell>{FormatCurrency(item.total_profit)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

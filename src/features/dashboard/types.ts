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


export interface ProfitCardProps {
  title: string;
  amount?: number;
  trend?: number;
  isLoading: boolean;
}

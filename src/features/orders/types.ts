export interface TransactionResponse {
  referenceID: string;
  productName: string;
  methodName: string;
  status: string;
  total: number;
  productPrice: number;
  discount: number;
  fee: number;
  tujuan: string;
  nickname: string;
}

export interface TransactionResponseCheck {
  status: string;
  referenceId: string;
  productName: string;
  fee: number;
  methodName: string;
  no_tujuan: string;
  nickname: string;
}

export interface TransactionUserResponse {
  created_at: string;
  fee: number;
  id: number;
  payment_name: string;
  price: number;
  product_name: string;
  reference_id: string;
  status: string;
  total: number;
  tujuan: string;
  updated_at: string;
}
export interface Transactions {
  amount: number;
  branchName: string;
  createdAt: string;
  fee: number;
  hargaModal: number;
  id: number;
  nickname: string;
  noTujuan: string;
  paymentMethod: string;
  productName: string;
  profit: number;
  profitKeterangan: string;
  providerName: string;
  referenceId: string;
  status: string;
  totalAmount: number;
  transactionType: string;
  updatedAt: string;
  username: string;
}

export interface CreateTransactions {
  id: number;
  product_code: string;
  tujuan: string;
  payment_code: string;
  product_name: string;
  phone_number: string;
  email: string;
}

export interface DashboardStats {
  total_transactions: number;
  total_amount: number;
  total_profit: number;
  total_fee: number;
  pending_count: number;
  success_count: number;
  failed_count: number;
  error_count: number;
  success_rate: number;
  today_transactions: number;
  today_amount: number;
  today_profit: number;

  hourly_stats: HourlyStat[];
  top_products: TopProduct[];
  payment_methods: PaymentMethod[];
  provider_stats: ProviderStat[];
  recent_transactions: RecentTransaction[];
}

export interface HourlyStat {
  hour: number;
  count: number;
  amount: number;
  success_rate: number;
}

export interface TopProduct {
  product_id: number;
  product_code: string;
  count: number;
  amount: number;
  profit: number;
}

export interface PaymentMethod {
  method: string;
  count: number;
  amount: number;
  fee: number;
  success_rate: number;
}

export interface ProviderStat {
  provider_id: number;
  count: number;
  amount: number;
  success_rate: number;
}

export interface RecentTransaction {
  id: number;
  reference_id: string;
  amount: number;
  status: "pending" | "success" | "failed" | "process";
  payment_method: string;
  created_at: string;
  no_tujuan: string;
  nickname: string;
}

export interface TransactionsAllData {
  branchName: string;
  created_at: string;
  fee: number;
  id: number;
  laba: number;
  payment_Name: string;
  price: number;
  discount: number;
  productName: string;
  purchase_price: number;
  referenceId: string;
  status: string;
  total: number;
  tujuan: string;
  updated_at: string;
  username: string;
}

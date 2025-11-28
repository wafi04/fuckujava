import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormatCurrency, formatDate } from "@/utils/format";
import type { TransactionsAllData } from "../types";

export function TableOrder({ data }: { data: TransactionsAllData[] }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r">ID</TableHead>
            <TableHead className="border-r">Reference ID</TableHead>
            <TableHead className="border-r">Produk</TableHead>
            <TableHead className="border-r">Tujuan</TableHead>
            <TableHead className="border-r">Harga</TableHead>
            <TableHead className="border-r">Discount</TableHead>
            <TableHead className="border-r">Fee</TableHead>
            <TableHead className="border-r">Total</TableHead>
            <TableHead className="border-r">Laba</TableHead>
            <TableHead className="border-r">Payment</TableHead>
            <TableHead className="border-r">Username</TableHead>
            <TableHead className="border-r">Status</TableHead>
            <TableHead>Tanggal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={12}
                className="text-center text-muted-foreground py-8 border-b"
              >
                Tidak ada data transaksi
              </TableCell>
            </TableRow>
          ) : (
            data.map((transaction) => (
              <TableRow key={transaction.id} className="border-b">
                <TableCell className="font-medium border-r">
                  {transaction.id}
                </TableCell>
                <TableCell className="font-mono text-sm border-r">
                  {transaction.referenceId}
                </TableCell>
                <TableCell className="border-r">
                  {transaction.productName}
                </TableCell>
                <TableCell className="border-r">{transaction.tujuan}</TableCell>
                <TableCell className="border-r">
                  {FormatCurrency(transaction.price)}
                </TableCell>
                <TableCell className="border-r">
                  {FormatCurrency(transaction.discount)}
                </TableCell>
                <TableCell className="border-r">
                  {FormatCurrency(transaction.fee)}
                </TableCell>
                <TableCell className="font-semibold border-r">
                  {FormatCurrency(transaction.total)}
                </TableCell>
                <TableCell
                  className={`border-r ${transaction.laba > 0 ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {FormatCurrency(transaction.laba)}
                </TableCell>
                <TableCell className="border-r">
                  {transaction.payment_Name}
                </TableCell>
                <TableCell className="border-r">
                  {transaction.username}
                </TableCell>
                <TableCell className="border-r">
                  {getStatusBadge(transaction.status)}
                </TableCell>
                <TableCell>                        {transaction.created_at.replace('T', ' ').split('.')[0]}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export const getStatusBadge = (status: string) => {
  const statusStyles = {
    success: "bg-green-100 text-green-800 border border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    failed: "bg-red-100 text-red-800 border border-red-200",
    processing: "bg-blue-100 text-blue-800 border border-blue-200",
  };

  const style =
    statusStyles[status.toLowerCase() as keyof typeof statusStyles] ||
    "bg-gray-100 text-gray-800 border border-gray-200";

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  );
};

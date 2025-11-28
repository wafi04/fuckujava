
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FormatCurrency, formatDate } from "@/utils/format";
import { ExternalLink, FileText } from "lucide-react";
import type { TransactionUserResponse } from "@/features/orders/types";

export function TableTransactionsUser({
  data,
}: {
  data: TransactionUserResponse[];
}) {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID Transaksi</TableHead>
              <TableHead>Produk</TableHead>
              <TableHead>Tujuan</TableHead>
              <TableHead>Jumlah</TableHead>
              <TableHead>Fee</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Metode</TableHead>
              <TableHead>Waktu</TableHead>
              <TableHead>Update Terakhir</TableHead>
              <TableHead>Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell colSpan={11} className="text-center py-16">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <FileText className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Tidak ada data transaksi
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Transaksi akan muncul di sini setelah ada aktivitas
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Transaksi</TableHead>
            <TableHead>Produk</TableHead>
            <TableHead className="min-w-[130px]">Tujuan</TableHead>
            <TableHead>Jumlah</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Metode</TableHead>
            <TableHead>Waktu</TableHead>
            <TableHead>Update Terakhir</TableHead>
            <TableHead className="text-center">Invoice</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((transaction, idx) => (
            <TableRow key={idx}>
              <TableCell className="font-medium">
                {transaction.reference_id}
              </TableCell>
              <TableCell>{transaction.product_name}</TableCell>
              <TableCell>{transaction.tujuan}</TableCell>
              <TableCell>{FormatCurrency(transaction.price)}</TableCell>
              <TableCell>{FormatCurrency(transaction.fee)}</TableCell>
              <TableCell className="font-semibold">
                {FormatCurrency(transaction.total)}
              </TableCell>
              <TableCell>{(transaction.status)}</TableCell>
              <TableCell className="text-center">
                {transaction.payment_name}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(transaction.created_at)}
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(transaction.updated_at)}
              </TableCell>
              <TableCell className="text-center">
                <Button variant="ghost" size="sm" asChild>
                  <a href={`/invoice/${transaction.reference_id}`}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View
                  </a>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

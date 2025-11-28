import { Suspense, useState } from "react";
import { useGetInvoice } from "./api";
import { Steps } from "./steps";
import { FormatCurrency } from "@/utils/format";
import toast from "react-hot-toast";
import Image from "next/image";

interface InvoicePageProps {
  slug: string;
}
export default function InvoicePage({ slug }: InvoicePageProps) {
  const { data, isLoading, error } = useGetInvoice(slug as string);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);

  if (data === undefined || isLoading) {
    return (
      <Suspense fallback={<>...</>}>
        <main className="container my-10 flex w-full flex-col items-center px-4">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-48"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </main>
      </Suspense>
    );
  }

  const invoice = data.data;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied to clipboard");
    } catch (err) {
      toast.error("Failed to copy");
    }
  };

  const downloadQR = async (qrData: string) => {
    try {
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(
        qrData
      )}`;

      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "qris.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
      toast.success("QR Code berhasil diunduh");
    } catch (err) {
      toast.error("Gagal mengunduh QR Code");
    }
  };

  if (error || !invoice) {
    return (
      <Suspense fallback={<>...</>}>
        <main className="container my-10 flex w-full flex-col items-center px-4">
          <div className="text-center">
            <p className="text-destructive text-lg font-medium">
              Gagal memuat invoice.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              {error?.message || "Invoice tidak ditemukan"}
            </p>
          </div>
        </main>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<>...</>}>
      <main className="container px-4 mt-20 mb-10 min-h-screen">
        <Steps status={invoice.status} />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Product & Payment Details */}
          <div className="space-y-6">
            {/* Product Information */}
            <div className="rounded-3xl border border-border/25 bg-muted/50 p-6">
              <h3 className="font-semibold mb-4">Informasi Produk</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Product Name</span>
                  <span className="font-medium text-right">
                    {invoice.product_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tujuan</span>
                  <span className="font-medium text-right">
                    {invoice.tujuan}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Ref ID</span>
                  <span className="font-medium text-right">
                    {invoice.reference_id}
                  </span>
                </div>
                {invoice.sn && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sn</span>
                    <span className="font-medium text-right">{invoice.sn}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div>
              <button
                onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                className="inline-flex w-full items-center justify-between rounded-lg border border-border/25 bg-secondary px-4 py-3 text-sm font-medium shadow-sm hover:bg-secondary/80 transition-colors"
                type="button"
              >
                <span>Rincian Pembayaran</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transition-transform ${showPaymentDetails ? "rotate-180" : ""
                    }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m18 15-6-6-6 6"
                  />
                </svg>
              </button>

              {showPaymentDetails && (
                <div className="mt-2 rounded-lg border border-border/25 bg-secondary/50 p-4 text-sm">
                  <dl className="space-y-3">
                    <div className="flex justify-between">
                      <dt className="font-medium text-foreground">Harga</dt>
                      <dd className="text-muted-foreground">
                        {FormatCurrency(invoice.price)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-foreground">Subtotal</dt>
                      <dd className="text-muted-foreground">
                        {FormatCurrency(invoice.price)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium ">Discount</dt>
                      <dd className="text-green-500">
                        {FormatCurrency(invoice.discount)}
                      </dd>
                    </div>

                    <div className="flex justify-between">
                      <dt className="font-medium text-foreground">Biaya</dt>
                      <dd className="text-muted-foreground">
                        {FormatCurrency(invoice.fee)}
                      </dd>
                    </div>
                  </dl>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center rounded-lg border-2 border-primary/50 bg-secondary/50 p-4">
              <div className="font-bold text-foreground text-lg">
                Total Pembayaran
              </div>
              <div className="font-bold text-primary text-xl">
                {FormatCurrency(invoice.total)}
              </div>
            </div>
          </div>

          {/* Right Column - Payment Method */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-border/25 bg-muted/50 p-6">
              <h3 className="font-semibold mb-4">Metode Pembayaran</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Payment Method
                  </p>
                  <p className="font-semibold text-lg">
                    {invoice.payment_code}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nomor Invoice</p>
                    <p className="font-semibold break-all">
                      {invoice.reference_id}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <span className="inline-block rounded-sm bg-yellow-300 px-2 py-1 text-xs font-semibold uppercase text-yellow-800">
                      {invoice.status}
                    </span>
                  </div>
                </div>

                {
                  invoice.status.toLowerCase() === "pending" && (
                    <>
                      {/* Payment Method Specific UI */}
                      {invoice.payment_type === "virtual-account" &&
                        invoice.payment_payload && (
                          <div className="space-y-3">
                            <p className="text-sm font-medium">
                              Nomor Virtual Account:
                            </p>
                            <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-3">
                              <code className="font-mono text-lg font-semibold flex-1">
                                {invoice.payment_payload}
                              </code>
                              <button
                                onClick={() =>
                                  copyToClipboard(invoice.payment_payload || "")
                                }
                                className="text-xs text-primary hover:underline px-2 py-1 rounded bg-primary/10 hover:bg-primary/20 transition-colors"
                              >
                                Salin
                              </button>
                            </div>
                          </div>
                        )}

                      {(invoice.payment_type === "qris" ||
                        invoice.payment_type === "qrcode") &&
                        invoice.payment_payload && (
                          <div className="space-y-4">
                            <p className="text-sm font-medium">Scan QR Code:</p>
                            <div className="flex flex-col items-center space-y-4">
                              <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-lg bg-white border">
                                <Image
                                  src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(
                                    invoice.payment_payload
                                  )}`}
                                  width={500}
                                  height={500}
                                  alt="QR Code"
                                  className="w-60 h-60 object-contain"
                                  loading="lazy"
                                />
                              </div>
                              <button
                                onClick={() =>
                                  downloadQR(invoice.payment_payload as string)
                                }
                                className="w-full max-w-64 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                              >
                                Unduh Kode QR
                              </button>
                            </div>
                          </div>
                        )}

                      {invoice.payment_type === "e-wallet" &&
                        invoice.payment_payload && (
                          <div className="space-y-3">
                            <p className="text-sm font-medium">
                              Bayar dengan E-Wallet:
                            </p>
                            <a
                              href={invoice.payment_payload}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full rounded-lg bg-primary px-4 py-3 text-sm font-medium text-center text-primary-foreground hover:bg-primary/90 transition-colors"
                            >
                              Buka E-Wallet →
                            </a>
                          </div>
                        )}
                    </>
                  )
                }


              </div>
            </div>
          </div>
        </div>
      </main>
    </Suspense>
  );
}

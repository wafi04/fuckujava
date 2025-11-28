"use client";
import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { SVG } from "@/utils/SVG";
import { FormatCurrency } from "@/utils/format";
import type { TransactionResponse } from "../types";
import { useOrder } from "@/hooks/useFormOrder";
import { useRouter } from "next/navigation";

interface DialogValidateTransactionsProps {
  isOpen: boolean;
  onClose: () => void;
  transactionData?: TransactionResponse;
  isSaldoConfirmation?: boolean; // Flag untuk membedakan konfirmasi SALDO vs result transaksi

}

export function DialogValidateTransactions({
  isOpen,
  onClose,
  transactionData,
  isSaldoConfirmation = false
}: DialogValidateTransactionsProps) {
  const confettiRef = useRef<HTMLDivElement>(null);
  const { push } = useRouter()
  const [isProcessing, setIsProcessing] = useState(false);
  const { calculation, getOrderSummary, submitOrder, formData } = useOrder();

  useEffect(() => {
    if (isOpen && transactionData?.status === "pending") {
      const timer = setTimeout(() => {
        createConfetti();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen, transactionData?.status]);

  const createConfetti = () => {
    if (!confettiRef.current) return;

    const colors = [
      "#ff6b6b",
      "#4ecdc4",
      "#45b7d1",
      "#96ceb4",
      "#feca57",
      "#ff9ff3",
    ];

    for (let i = 0; i < 50; i++) {
      const confetti = document.createElement("div");
      confetti.className = "confetti-piece";
      confetti.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}%;
        top: -10px;
        border-radius: ${Math.random() > 0.5 ? "50%" : "0"};
        animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
        transform: rotate(${Math.random() * 360}deg);
        z-index: 1000;
      `;

      confettiRef.current.appendChild(confetti);

      setTimeout(() => {
        if (confetti.parentNode) {
          confetti.parentNode.removeChild(confetti);
        }
      }, 5000);
    }
  };


  // Handler untuk bayar dengan SALDO
  const handlePayWithSaldo = () => {
    setIsProcessing(true);

    submitOrder();


    setIsProcessing(false);

  };

  if (!isOpen) return null;

  const displayData = {
    nickname: transactionData?.nickname || formData.nickname,
    tujuan: transactionData?.tujuan || `${getOrderSummary()?.customer.gameId}${getOrderSummary()?.customer.serverId}`,
    product: getOrderSummary()?.product.name || "-",
    payment: getOrderSummary()?.paymentMethod.name || "-",
    referenceId: transactionData?.referenceID || "-",
    status: transactionData?.status || "pending",
    price: transactionData?.productPrice ?? getOrderSummary()?.product.price,
    fee: transactionData?.fee || calculation?.fee || getOrderSummary()?.paymentMethod.fee || 0 as number,
    total: getOrderSummary()?.calculation.total || 0,
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        ref={confettiRef}
        className="fixed inset-0 pointer-events-none z-[60]"
        style={{
          overflow: "hidden",
        }}
      />

      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={!isProcessing ? onClose : undefined}
      />

      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="relative transform overflow-hidden rounded-lg border border-border/25 bg-background px-4 pb-4 pt-5 text-left text-foreground shadow-xl transition-all sm:my-8  sm:max-w-lg sm:p-6 opacity-100 translate-y-0 sm:scale-100">
          <button
            onClick={onClose}
            disabled={isProcessing}
            className="absolute right-4 top-4 p-1 hover:bg-secondary/80 rounded-md transition-colors disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>

          <div>
            <div className="-my-8 flex justify-center">
              <SVG />
            </div>
          </div>

          <div className="text-center text-sm">
            <h3 className="text-lg font-semibold leading-6 text-foreground">
              {isSaldoConfirmation
                ? "Konfirmasi Pesanan"
                : transactionData
                  ? "Pesanan Berhasil"
                  : "Buat Pesanan"}
            </h3>
            <p className="pt-1 text-accent">
              {isSaldoConfirmation
                ? "Pastikan data pesanan Anda sudah benar sebelum melanjutkan pembayaran dengan saldo."
                : transactionData
                  ? "Pesanan Anda telah berhasil dibuat. Berikut detail transaksi:"
                  : "Pastikan data akun Kamu dan produk yang Kamu pilih valid dan sesuai."}
            </p>

            <div className="mt-4">
              <div className="my-4 grid grid-cols-3 gap-3 rounded-md bg-primary p-4 text-left text-sm text-white">
                {transactionData && !isSaldoConfirmation && (
                  <>
                    <div className="line-clamp-1">Reference ID</div>
                    <div className="col-span-2 truncate font-mono text-xs">
                      {displayData.referenceId}
                    </div>

                    <div className="line-clamp-1">Status</div>
                    <div className="col-span-2 truncate">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${displayData.status === "success"
                          ? "bg-green-500/20 text-green-400"
                          : displayData.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                          }`}
                      >
                        {displayData.status}
                      </span>
                    </div>
                  </>
                )}

                <div className="line-clamp-1">Nickname</div>
                <div className="col-span-2 truncate">
                  {displayData.nickname}
                </div>

                <div className="line-clamp-1">ID</div>
                <div className="col-span-2 truncate font-mono text-xs">
                  {displayData.tujuan}
                </div>



                <div className="line-clamp-1">Product</div>
                <div className="col-span-2 truncate">{displayData.product}</div>

                <div className="line-clamp-1">Payment</div>
                <div className="col-span-2 truncate">{displayData.payment}</div>

                <div className="line-clamp-1">Harga</div>
                <div className="col-span-2 truncate">
                  {FormatCurrency(displayData.price as number)}
                </div>

                {/* {displayData.discount > 0 && (
                  <>
                    <div className="line-clamp-1">Discount</div>
                    <div className="col-span-2 truncate">
                      -{FormatCurrency(displayData.discount as number)}
                    </div>
                  </>
                )} */}

                {displayData.fee && displayData?.fee as number > 0 && (
                  <>
                    <div className="line-clamp-1">Fee</div>
                    <div className="col-span-2 truncate">
                      {FormatCurrency(displayData.fee as number)}
                    </div>
                  </>
                )}

                <div className="line-clamp-1 font-semibold">Total</div>
                <div className="col-span-2 truncate font-semibold">
                  {FormatCurrency(displayData.total)}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {isSaldoConfirmation ? (
                // Tombol untuk konfirmasi SALDO (belum hit API)
                <>
                  <Button
                    variant="outline"
                    type="button"
                    onClick={onClose}
                    disabled={isProcessing}
                  >
                    Batal
                  </Button>
                  <Button
                    type="button"
                    onClick={handlePayWithSaldo}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
                        <span>Memproses...</span>
                      </div>
                    ) : (
                      "Bayar Sekarang"
                    )}
                  </Button>
                </>
              ) : (
                // Tombol untuk result transaksi (sudah hit API)
                transactionData && (
                  <>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={onClose}
                    >
                      Tutup
                    </Button>
                    <Button
                      type="button"
                      onClick={() => {
                        push(`/invoice/${transactionData.referenceID}`);
                      }}
                    >
                      Lihat Invoice
                    </Button>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        .confetti-piece {
          animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>
    </div>
  );
}

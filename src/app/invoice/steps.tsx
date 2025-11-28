import { Wallet, CreditCard, LoaderIcon, CheckCircle } from "lucide-react";


export function Steps({ status }: { status: string }) {
  // Helper function to determine step status
  const getStepStatus = (stepName: string) => {
    const steps = ["pending", "paid", "process", "success"];
    const currentIndex = steps.indexOf(status);
    const stepIndex = steps.indexOf(stepName);

    if (stepIndex < currentIndex) return "success"; // sudah lewat
    if (stepIndex === currentIndex) return "current"; // aktif sekarang
    if (stepIndex === currentIndex + 1) return "next"; // tujuan berikutnya
    return "upcoming"; // sisanya
  };


  const getStepStyles = (stepName: string) => {
    const stepStatus = getStepStatus(stepName);

    switch (stepStatus) {
      case "success":
        return {
          line: "bg-green-500",
          circle: "bg-green-500 group-hover:bg-green-600 shadow-md",
          icon: "text-white",
          title: "text-green-600",
          description: "text-gray-600",
        };

      case "current":
        return {
          line: "bg-green-300",
          circle: "border-2 border-green-600 bg-white shadow-md group-hover:bg-green-50",
          icon: "text-green-600",
          title: "text-green-700",
          description: "text-gray-600",
        };

      case "next":
        return {
          line: "bg-blue-300",
          circle: "border-2 border-blue-500 bg-white shadow-md group-hover:bg-blue-50",
          icon: "text-blue-500",
          title: "text-blue-600",
          description: "text-gray-600",
        };

      default:
        return {
          line: "bg-gray-300",
          circle: "border-2 border-gray-400 bg-white shadow-md group-hover:bg-gray-50",
          icon: "text-gray-500",
          title: "text-gray-600",
          description: "text-gray-500",
        };
    }
  };

  const step1Styles = getStepStyles("pending");
  const step2Styles = getStepStyles("paid");
  const step3Styles = getStepStyles("process");
  const step4Styles = getStepStyles("success");

  return (
    <ol role="list" className="flex w-full justify-between overflow-hidden">
      {/* Step 1: Transaksi Dibuat */}
      <li className="pb-5 relative w-full">
        <div
          className={`absolute left-0 top-4 -ml-px mt-0.5 h-0.5 w-full ${step1Styles.line}`}
          aria-hidden="true"
        ></div>
        <div className="group relative flex flex-col items-start">
          <span className="flex h-9 items-center">
            <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${step1Styles.circle}`}>
              <Wallet className={`h-4 w-4 ${step1Styles.icon}`} />
            </span>
          </span>
          <span className="ml-4 hidden w-full min-w-0 flex-col text-left lg:ml-0 lg:mt-2 lg:flex lg:text-left">
            <span className={`text-base font-semibold ${step1Styles.title}`}>
              Transaksi Dibuat
            </span>
            <span className={`text-xs ${step1Styles.description}`}>
              Transaksi telah berhasil dibuat
            </span>
          </span>
        </div>
      </li>

      {/* Step 2: Pembayaran */}
      <li className="pb-5 relative w-full">
        <div
          className={`absolute left-0 top-4 -ml-px mt-0.5 h-0.5 w-full ${step2Styles.line}`}
          aria-hidden="true"
        ></div>
        <div
          className="group relative flex flex-col items-center"
          aria-current={getStepStatus("paid") === "current" ? "step" : undefined}
        >
          <span className="flex h-9 items-center">
            <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${step2Styles.circle}`}>
              <CreditCard className={`h-4 w-4 ${step2Styles.icon}`} />
            </span>
          </span>
          <span className="ml-4 hidden w-full min-w-0 flex-col text-left lg:ml-0 lg:mt-2 lg:flex lg:text-center">
            <span className={`text-base font-semibold ${step2Styles.title}`}>
              Pembayaran
            </span>
            <span className={`text-xs ${step2Styles.description}`}>
              {getStepStatus("paid") === "current" ? "Silakan melakukan pembayaran" :
                getStepStatus("paid") === "success" ? "Pembayaran berhasil" :
                  "Menunggu pembayaran"}
            </span>
          </span>
        </div>
      </li>

      {/* Step 3: Sedang Di Proses */}
      <li className="pb-5 relative w-full">
        <div
          className={`absolute left-0 top-4 -ml-px mt-0.5 h-0.5 w-full ${step3Styles.line}`}
          aria-hidden="true"
        ></div>
        <div
          className="group relative flex flex-col items-center"
          aria-current={getStepStatus("process") === "current" ? "step" : undefined}
        >
          <span className="flex h-9 items-center">
            <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${step3Styles.circle}`}>
              <LoaderIcon className={`h-4 w-4 ${step3Styles.icon} ${getStepStatus("process") === "current" ? "animate-spin" : ""}`} />
            </span>
          </span>
          <span className="ml-4 hidden w-full min-w-0 flex-col text-left lg:ml-0 lg:mt-2 lg:flex lg:text-center">
            <span className={`text-base font-semibold ${step3Styles.title}`}>
              Sedang Di Proses
            </span>
            <span className={`text-xs ${step3Styles.description}`}>
              {getStepStatus("process") === "current" ? "Pembelian sedang dalam proses..." :
                getStepStatus("process") === "success" ? "Proses selesai" :
                  "Menunggu proses"}
            </span>
          </span>
        </div>
      </li>

      {/* Step 4: Transaksi Selesai */}
      <li className="relative w-full">
        <div
          className={`absolute left-0 top-4 -ml-px mt-0.5 h-0.5 w-full ${step4Styles.line}`}
          aria-hidden="true"
        ></div>
        <div
          className="group relative flex flex-col items-end"
          aria-current={getStepStatus("success") === "current" ? "step" : undefined}
        >
          <span className="flex h-9 items-center">
            <span className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full ${step4Styles.circle}`}>
              <CheckCircle className={`h-4 w-4 ${step4Styles.icon}`} />
            </span>
          </span>
          <span className="ml-4 hidden w-full min-w-0 flex-col text-left lg:ml-0 lg:mt-2 lg:flex lg:text-right">
            <span className={`text-base font-semibold ${step4Styles.title}`}>
              Transaksi Selesai
            </span>
            <span className={`text-xs ${step4Styles.description}`}>
              {getStepStatus("success") === "success" ? "Transaksi telah berhasil dilakukan" :
                "Menunggu penyelesaian"}
            </span>
          </span>
        </div>
      </li>
    </ol>
  );
}
import { useState } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { FlashSaleProduct } from "./types";
import type { PaymentMethod } from "@/hooks/useOrder";
import type { TransactionResponse } from "../orders/types";

// Interface for the order flash sale state
interface OrderFlashSaleState {
  // Form data
  gameId: string;
  serverId: string | null;
  nickname: string;
  phoneNumber: string;
  email: string;
  // Flash sale specific data
  flashSaleId: number | null;
  productFlashSale: FlashSaleProduct | null;

  // Payment data
  paymentMethod: PaymentMethod | null;

  // Order status
  isProcessing: boolean;
  orderId: string | null;

  // Validation errors
  errors: Record<string, string>;
}

// Interface for the store actions
interface OrderFlashSaleActions {
  // Form field setters
  setGameId: (gameId: string) => void;
  setServerId: (serverId: string) => void;
  setNickname: (nickname: string) => void;
  setEmail: (nickname: string) => void;
  setPhoneNumber: (nickname: string) => void;

  // Flash sale setters
  setFlashSaleId: (id: number) => void;
  setProductFlashSale: (product: FlashSaleProduct) => void;

  // Payment setter
  setPaymentMethod: (method: PaymentMethod) => void;

  // Order management
  setOrderId: (orderId: string) => void;
  setIsProcessing: (isProcessing: boolean) => void;

  // Error management
  setError: (field: string, error: string) => void;
  clearError: (field: string) => void;
  clearAllErrors: () => void;

  // Validation
  validateForm: () => boolean;

  // Reset functions
  resetForm: () => void;
  resetOrder: () => void;
  clearAll: () => void;
}

// Combined type for the complete store
type OrderFlashSaleStore = OrderFlashSaleState & OrderFlashSaleActions;

// Initial state
const initialState: OrderFlashSaleState = {
  gameId: "",
  email: "",
  phoneNumber: "",
  serverId: null,
  nickname: "",
  flashSaleId: null,
  productFlashSale: null,
  paymentMethod: null,
  isProcessing: false,
  orderId: null,
  errors: {},
};

// Create the Zustand store with middleware (NO PERSISTENCE to prevent unwanted nickname checks)
export const useOrderFlashSale = create<OrderFlashSaleStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      ...initialState,

      // Form field setters
      setGameId: (gameId: string) => {
        set(
          (state) => ({
            gameId,
            errors: { ...state.errors, gameId: "" }, // Clear error when setting value
          }),
          false,
          "setGameId"
        );
      },
      setEmail: (email: string) => {
        set(
          (state) => ({
            email,
            errors: { ...state.errors, email: "" }, // Clear error when setting value
          }),
          false,
          "setEmail"
        );
      },
      setPhoneNumber: (phoneNumber: string) => {
        set(
          (state) => ({
            phoneNumber,
            errors: { ...state.errors, phoneNumber: "" }, // Clear error when setting value
          }),
          false,
          "setPhoneNumber"
        );
      },

      setServerId: (serverId: string) => {
        set(
          (state) => ({
            serverId,
            errors: { ...state.errors, serverId: "" },
          }),
          false,
          "setServerId"
        );
      },

      setNickname: (nickname: string) => {
        set(
          (state) => ({
            nickname,
            errors: { ...state.errors, nickname: "" },
          }),
          false,
          "setNickname"
        );
      },

      // Flash sale setters
      setFlashSaleId: (flashSaleId: number) => {
        set({ flashSaleId }, false, "setFlashSaleId");
      },

      setProductFlashSale: (productFlashSale: FlashSaleProduct) => {
        set(
          (state) => ({
            productFlashSale,
            flashSaleId: productFlashSale.id,
            errors: { ...state.errors, product: "" },
          }),
          false,
          "setProductFlashSale"
        );
      },

      // Payment setter
      setPaymentMethod: (paymentMethod: PaymentMethod) => {
        set(
          (state) => ({
            paymentMethod,
            errors: { ...state.errors, paymentMethod: "" },
          }),
          false,
          "setPaymentMethod"
        );
      },

      // Order management
      setOrderId: (orderId: string) => {
        set({ orderId }, false, "setOrderId");
      },

      setIsProcessing: (isProcessing: boolean) => {
        set({ isProcessing }, false, "setIsProcessing");
      },

      // Error management
      setError: (field: string, error: string) => {
        set(
          (state) => ({
            errors: { ...state.errors, [field]: error },
          }),
          false,
          "setError"
        );
      },

      clearError: (field: string) => {
        set(
          (state) => {
            const newErrors = { ...state.errors };
            delete newErrors[field];
            return { errors: newErrors };
          },
          false,
          "clearError"
        );
      },

      clearAllErrors: () => {
        set({ errors: {} }, false, "clearAllErrors");
      },

      validateForm: (): boolean => {
        const state = get();
        const newErrors: Record<string, string> = {};

        if (!state.gameId.trim()) {
          newErrors.gameId = "Game ID wajib diisi";
        }

        if (!state.productFlashSale) {
          newErrors.product = "Produk wajib dipilih";
        }

        if (!state.paymentMethod) {
          newErrors.paymentMethod = "Metode pembayaran wajib dipilih";
        }

        // Basic Game ID format validation (only check if numeric)
        if (state.gameId && !/^\d+$/.test(state.gameId)) {
          newErrors.gameId = "Game ID harus berupa angka";
        }

        // Update errors
        set({ errors: newErrors }, false, "validateForm");

        return Object.keys(newErrors).length === 0;
      },

      // Reset functions
      resetForm: () => {
        set(
          {
            gameId: "",
            serverId: null,
            nickname: "",
            errors: {},
          },
          false,
          "resetForm"
        );
      },

      resetOrder: () => {
        set(
          {
            orderId: null,
            isProcessing: false,
            errors: {},
          },
          false,
          "resetOrder"
        );
      },

      clearAll: () => {
        set(initialState, false, "clearAll");
      },
    }),
    {
      name: "order-flash-sale-store", // Name for Redux DevTools only
    }
  )
);

// Selector hooks for better performance (optional)
export const useOrderFlashSaleGameId = () =>
  useOrderFlashSale((state) => state.gameId);
export const useOrderFlashSaleServerId = () =>
  useOrderFlashSale((state) => state.serverId);
export const useOrderFlashSaleProduct = () =>
  useOrderFlashSale((state) => state.productFlashSale);
export const useOrderFlashSalePayment = () =>
  useOrderFlashSale((state) => state.paymentMethod);
export const useOrderFlashSaleErrors = () =>
  useOrderFlashSale((state) => state.errors);
export const useOrderFlashSaleIsProcessing = () =>
  useOrderFlashSale((state) => state.isProcessing);

// Computed selectors
export const useOrderFlashSaleIsValid = () =>
  useOrderFlashSale((state) => {
    return Boolean(
      state.gameId &&
        state.serverId &&
        state.productFlashSale &&
        state.paymentMethod &&
        Object.keys(state.errors).length === 0
    );
  });

export const useOrderFlashSaleTotalPrice = () =>
  useOrderFlashSale((state) => state.productFlashSale?.flash_sale_price || 0);

// Action hooks for better organization
export const useOrderFlashSaleActions = () => {
  const {
    setGameId,
    setServerId,
    setNickname,
    setFlashSaleId,
    setProductFlashSale,
    setPaymentMethod,
    setOrderId,
    setIsProcessing,
    setError,
    clearError,
    clearAllErrors,
    validateForm,
    resetForm,
    resetOrder,
    clearAll,
  } = useOrderFlashSale();

  return {
    setGameId,
    setServerId,
    setNickname,
    setFlashSaleId,
    setProductFlashSale,
    setPaymentMethod,
    setOrderId,
    setIsProcessing,
    setError,
    clearError,
    clearAllErrors,
    validateForm,
    resetForm,
    resetOrder,
    clearAll,
  };
};

export function useSubmitOrderFlashSale() {
  const {
    gameId,
    serverId,
    paymentMethod,
    productFlashSale,
    nickname,
    phoneNumber,
    email,
  } = useOrderFlashSale();
  const [transactionResult, setTransactionResult] =
    useState<TransactionResponse | null>(null);
  const tujuan = `${gameId}${serverId}`;
  const [showDialog, setShowDialog] = useState<boolean>(false);
//   const { mutate, isPending } = useCreateTransactionsFlashSale();
  const submitOrder = () => {
    // mutate(
    //   {
    //     fsId: productFlashSale?.flash_sale_id as number,
    //     nickname,
    //     paymentCode: paymentMethod?.code as string,
    //     productId: productFlashSale?.product_id as number,
    //     tujuan,
    //     phoneNumber,
    //     email,
    //   },
    //   {
    //     onSuccess: (data) => {
    //       setTransactionResult(data.data);
    //       setShowDialog(true);
    //     },
    //     onError: () => {
    //       toast.error("failed to create");
    //     },
    //   }
    // );
  };
  const isPending = false
  return {
    transactionResult,
    onClose: () => setShowDialog(false),
    showDialog,
    submitOrder,
    isPending,
  };
}

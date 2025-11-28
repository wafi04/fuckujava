import { create } from "zustand";

export interface Product {
  id: number;
  name: string;
  price: number;
  productCode: string;
  brandName? : string
  productName? : string
}

export interface PaymentMethod {
  code: string;
  name: string;
  fee: {
    amount: number;
    percentage: number;
    type: "fixed" | "percentage" | "hybrid";
  };
  total: number;
  icon?: string;
  isActive?: boolean;
}

interface FormData {
  gameId: string;
  region? : string
  serverId?: string;
  nickname?: string;
  isCheckNickname : boolean 
  email?: string;
  phoneNumber: string;
}

interface OrderCalculation {
  basePrice: number;
  fee: number;
  total: number;
  breakdown: {
    productPrice: number;
    paymentFee: number;
    finalTotal: number;
  };
}

interface OrderStore {
  // Data
  formData: FormData;
  selectedProduct: Product | null;
  selectedMethod: PaymentMethod | null;
  errors: Record<string, string>;

  // Actions
  setFormData: (data: Partial<FormData>) => void;
  setSelectedProduct: (product: Product | null) => void;
  setSelectedMethod: (method: PaymentMethod | null) => void;
  setError: (field: string, message: string) => void;
  clearErrors: () => void;
  clearForm: () => void;
  validateForm: () => boolean;
  getCalculation: () => OrderCalculation;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  // Initial state
  formData: {
    isCheckNickname : false,
    gameId: "",
    serverId: "",
    region : "",
    nickname: "",
    phoneNumber: "",
    email: "",
  },
  selectedProduct: null,
  selectedMethod: null,

  errors: {},

  // Actions
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  setSelectedProduct: (product) => {
    const currentState = get();
    const { selectedMethod } = currentState;

    // Calculate updated method total if both product and method exist
    let updatedMethod = selectedMethod;
    if (selectedMethod && product) {
      updatedMethod = calculateMethodTotal(selectedMethod, product.price);
    }

    // Single set call to prevent infinite updates
    set({
      selectedProduct: product,
      selectedMethod: updatedMethod,
    });
  },

  setSelectedMethod: (method) => {
    const currentState = get();
    const { selectedProduct } = currentState;

    // Calculate method total if product exists
    let updatedMethod = method;
    if (method && selectedProduct) {
      updatedMethod = calculateMethodTotal(method, selectedProduct.price);
    }

    // Single set call
    set({ selectedMethod: updatedMethod });
  },

  setError: (field, message) =>
    set((state) => ({
      errors: { ...state.errors, [field]: message },
    })),

  clearErrors: () => set({ errors: {} }),

  clearForm: () =>
    set({
      formData: {
        isCheckNickname : false,
        phoneNumber: "",
        email: "",
        gameId: "",
        region : "",
        serverId: "",
        nickname: "",
      },
      selectedProduct: null,
      selectedMethod: null,
      errors: {},
    }),

  validateForm: () => {
    const { formData, selectedProduct, selectedMethod } = get();
    const newErrors: Record<string, string> = {};

    if (!formData.gameId?.trim()) {
      newErrors.gameId = "Game ID wajib diisi";
    }
    if (!formData.phoneNumber?.trim()) {
      newErrors.phoneNumber = "Masukaan Nomor Handphonenya terlebih Dahulu";
    }

    if (!selectedProduct) {
      newErrors.product = "Pilih produk terlebih dahulu";
    }

    if (!selectedMethod) {
      newErrors.paymentMethod = "Pilih metode pembayaran";
    }

    const currentErrors = get().errors;
    const errorsChanged =
      JSON.stringify(newErrors) !== JSON.stringify(currentErrors);

    if (errorsChanged) {
      set({ errors: newErrors });
    }

    return Object.keys(newErrors).length === 0;
  },

  getCalculation: (): OrderCalculation => {
    const { selectedProduct, selectedMethod, formData } = get();

    if (!selectedProduct || !selectedMethod) {
      return {
        basePrice: 0,
        fee: 0,
        total: 0,
        breakdown: {
          productPrice: 0,
          paymentFee: 0,
          finalTotal: 0,
        },
      };
    }

    const basePrice = selectedProduct.price;
    const fee = calculateFee(selectedMethod.fee, basePrice);

    // Mock voucher discount calculation (replace with real logic)

    const total = basePrice + fee;

    return {
      basePrice,
      fee,
      total,
      breakdown: {
        productPrice: basePrice,
        paymentFee: fee,
        finalTotal: total,
      },
    };
  },
}));

// Helper functions
function calculateMethodTotal(
  method: PaymentMethod,
  productPrice: number
): PaymentMethod {
  const fee = calculateFee(method.fee, productPrice);
  return {
    ...method,
    total: productPrice + fee,
  };
}

function calculateFee(
  feeConfig: PaymentMethod["fee"],
  basePrice: number
): number {
  switch (feeConfig.type) {
    case "fixed":
      return feeConfig.amount;
    case "percentage":
      return Math.round((basePrice * feeConfig.percentage) / 100);
    case "hybrid":
      return (
        feeConfig.amount + Math.round((basePrice * feeConfig.percentage) / 100)
      );
    default:
      return feeConfig.amount;
  }
}

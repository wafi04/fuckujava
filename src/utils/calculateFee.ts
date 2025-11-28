export const calculateFee = (
  basePrice: number,
  feeData: { fixed: number; percentage: number },
  calculationType: "fixed" | "percentage" | "hybrid"
): number => {
  if (!basePrice || basePrice <= 0) return 0;

  let fee = 0;

  switch (calculationType) {
    case "percentage":
      fee = basePrice * (feeData.percentage / 100);
      break;
    case "fixed":
      fee = feeData.fixed;
      break;
    case "hybrid":
      fee = feeData.fixed + basePrice * (feeData.percentage / 100);
      break;
    default:
      fee = feeData.fixed;
  }

  return Math.trunc(fee);
};

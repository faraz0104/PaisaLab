export type GSTSlab = 0 | 3 | 5 | 12 | 18 | 28;

export interface GSTResult {
  originalAmount: number;
  gstAmount: number;
  cgst: number;
  sgst: number;
  igst: number;
  totalAmount: number;
  slab: GSTSlab;
}

// Exclusive: add GST on top of base price
export function calculateGSTExclusive(baseAmount: number, slab: GSTSlab): GSTResult {
  const gstAmount = (baseAmount * slab) / 100;
  return buildResult(baseAmount, gstAmount, slab, baseAmount + gstAmount);
}

// Inclusive: extract GST from MRP
export function calculateGSTInclusive(totalAmount: number, slab: GSTSlab): GSTResult {
  const baseAmount = totalAmount / (1 + slab / 100);
  const gstAmount = totalAmount - baseAmount;
  return buildResult(baseAmount, gstAmount, slab, totalAmount);
}

function buildResult(
  original: number,
  gstAmount: number,
  slab: GSTSlab,
  total: number
): GSTResult {
  const halfGST = gstAmount / 2;
  return {
    originalAmount: original,
    gstAmount,
    cgst: halfGST,
    sgst: halfGST,
    igst: gstAmount,
    totalAmount: total,
    slab,
  };
}

export const GST_SLAB_EXAMPLES: Record<GSTSlab, string[]> = {
  0: ["Fresh vegetables", "Milk", "Eggs", "Books"],
  3: ["Gold & silver", "Precious stones"],
  5: ["Packaged food", "Coal", "Railway tickets", "Economy class air tickets"],
  12: ["Mobile phones", "Processed food", "Computers", "Business class air tickets"],
  18: ["Most services", "Consumer electronics", "Restaurants (AC)", "Cement"],
  28: ["Luxury cars", "Tobacco", "Aerated drinks", "High-end motorcycles", "Casino/betting"],
};

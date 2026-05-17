export interface GratuityInputs {
  basicDearness: number;   // Basic + DA per month
  yearsOfService: number;  // can be fractional
  isGovtEmployee: boolean;
  lastDrawnSalary?: number; // for non-covered employees (optional)
}

export interface GratuityResult {
  gratuityAmount: number;
  taxFreeLimit: number;
  taxableGratuity: number;
  formula: string;
  isEligible: boolean; // service >= 5 years
  roundedYears: number;
  monthlyComponent: number; // per year contribution in CTC context
}

export function calculateGratuity(inputs: GratuityInputs): GratuityResult {
  const { basicDearness, yearsOfService, isGovtEmployee } = inputs;

  const isEligible = yearsOfService >= 4.5; // rounds to 5 completed years
  // Round years: fraction >= 6 months counts as full year
  const fraction = yearsOfService - Math.floor(yearsOfService);
  const roundedYears = fraction >= 0.5
    ? Math.ceil(yearsOfService)
    : Math.floor(yearsOfService);

  let gratuityAmount = 0;
  let formula = "";

  if (isGovtEmployee) {
    // Govt employees: (Basic + DA) / 4 × completed 6-month periods
    const halfYears = Math.floor(yearsOfService * 2);
    gratuityAmount = (basicDearness / 4) * halfYears;
    formula = "(Basic + DA) ÷ 4 × number of completed 6-month periods";
  } else {
    // Payment of Gratuity Act 1972 covered employees:
    // (Basic + DA) × 15/26 × years of service
    gratuityAmount = (basicDearness * 15 / 26) * roundedYears;
    formula = "(Basic + DA) × 15/26 × Years of Service";
  }

  // Statutory cap: ₹20 lakh (since 2018)
  gratuityAmount = Math.min(gratuityAmount, 2000000);

  // Tax exemption: govt employees fully exempt; private up to ₹20L
  const taxFreeLimit = isGovtEmployee ? gratuityAmount : Math.min(gratuityAmount, 2000000);
  const taxableGratuity = Math.max(0, gratuityAmount - taxFreeLimit);

  // Monthly component in CTC context: (Basic × 0.0481)
  const monthlyComponent = (basicDearness * 0.0481) / 12;

  return {
    gratuityAmount,
    taxFreeLimit,
    taxableGratuity,
    formula,
    isEligible,
    roundedYears,
    monthlyComponent,
  };
}

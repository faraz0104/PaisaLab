export interface HRAInputs {
  basicSalary: number;       // annual
  hraReceived: number;       // annual from employer
  rentPaid: number;          // annual
  isMetro: boolean;
}

export interface HRAResult {
  exemption: number;
  taxableHRA: number;
  // Three limits for transparency
  limit1_hraReceived: number;
  limit2_rentMinusBasicPct: number;
  limit3_pctOfBasic: number;
  isEligible: boolean; // rent > 0 and HRA received > 0
}

export function calculateHRA(inputs: HRAInputs): HRAResult {
  const { basicSalary, hraReceived, rentPaid, isMetro } = inputs;

  const isEligible = rentPaid > 0 && hraReceived > 0;

  if (!isEligible) {
    return {
      exemption: 0,
      taxableHRA: hraReceived,
      limit1_hraReceived: hraReceived,
      limit2_rentMinusBasicPct: 0,
      limit3_pctOfBasic: 0,
      isEligible,
    };
  }

  const limit1 = hraReceived;
  const limit2 = Math.max(0, rentPaid - basicSalary * 0.1);
  const limit3 = basicSalary * (isMetro ? 0.5 : 0.4);

  const exemption = Math.min(limit1, limit2, limit3);
  const taxableHRA = hraReceived - exemption;

  return {
    exemption,
    taxableHRA,
    limit1_hraReceived: limit1,
    limit2_rentMinusBasicPct: limit2,
    limit3_pctOfBasic: limit3,
    isEligible,
  };
}

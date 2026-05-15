// Indian number system: lakh/crore formatting with ₹ symbol

export function formatINR(amount: number, decimals = 0): string {
  if (isNaN(amount) || !isFinite(amount)) return "₹0";
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  const formatted = abs.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${sign}₹${formatted}`;
}

export function formatINRCompact(amount: number): string {
  if (isNaN(amount) || !isFinite(amount)) return "₹0";
  const abs = Math.abs(amount);
  const sign = amount < 0 ? "-" : "";
  if (abs >= 1_00_00_000) {
    return `${sign}₹${(abs / 1_00_00_000).toFixed(2)} Cr`;
  }
  if (abs >= 1_00_000) {
    return `${sign}₹${(abs / 1_00_000).toFixed(2)} L`;
  }
  if (abs >= 1_000) {
    return `${sign}₹${(abs / 1_000).toFixed(1)}K`;
  }
  return formatINR(amount);
}

const ones = [
  "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
  "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
  "Seventeen", "Eighteen", "Nineteen",
];
const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

function numToWords(n: number): string {
  if (n === 0) return "Zero";
  if (n < 20) return ones[n];
  if (n < 100) return `${tens[Math.floor(n / 10)]}${n % 10 ? " " + ones[n % 10] : ""}`;
  if (n < 1000) return `${ones[Math.floor(n / 100)]} Hundred${n % 100 ? " " + numToWords(n % 100) : ""}`;
  return "";
}

export function amountInWords(amount: number): string {
  if (isNaN(amount) || amount <= 0) return "";
  const n = Math.floor(amount);
  const crore = Math.floor(n / 1_00_00_000);
  const lakh = Math.floor((n % 1_00_00_000) / 1_00_000);
  const thousand = Math.floor((n % 1_00_000) / 1_000);
  const remainder = n % 1_000;
  const parts: string[] = [];
  if (crore > 0) parts.push(`${numToWords(crore)} Crore`);
  if (lakh > 0) parts.push(`${numToWords(lakh)} Lakh`);
  if (thousand > 0) parts.push(`${numToWords(thousand)} Thousand`);
  if (remainder > 0) parts.push(numToWords(remainder));
  return parts.join(" ");
}

export function parseINR(value: string): number {
  return Number(value.replace(/[₹,\s]/g, "")) || 0;
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomLetter = () => {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26)).toUpperCase();
};

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export const firstLetterUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

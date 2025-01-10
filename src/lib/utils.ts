import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const randomLetter = () => {
  return String.fromCharCode(65 + Math.floor(Math.random() * 26)).toUpperCase();
};

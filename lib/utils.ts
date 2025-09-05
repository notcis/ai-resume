import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const formatSummary = (value: any) => {
  const str = String(value || "");
  const hasHtml = /<\/?[a-z][\s\S]*>/i.test(str);
  if (hasHtml) return str;
  // escape HTML then convert newlines to <br/>
  const escaped = str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
  return escaped.replace(/\r\n|\r|\n/g, "<br/>");
};

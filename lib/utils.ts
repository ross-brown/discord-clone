import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class values using the clsx library and merges them
 * with Tailwind CSS utility classes using twMerge.
 *
 * @param inputs - The class values to be combined.
 * @returns A string representing the merged and formatted class names.
 *
 * @example
 * // Returns "text-red-500 bg-blue-700 my-2"
 * cn("text-red-500", "bg-blue-700", "my-2");
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

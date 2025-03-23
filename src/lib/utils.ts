import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function ny(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

export function cn(...inputs: ClassValue[]) {
   return twMerge(clsx(inputs))
}

/**
 * Format a date string into a localized date string
 * @param dateString ISO date string
 * @returns Formatted date string
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  } catch (error) {
    return dateString;
  }
}
import { format } from "date-fns";
import { enUS, es } from "date-fns/locale";
import i18n from "@/lib/i18n";

/**
 * Gets the date-fns locale based on current i18n language
 */
const getDateLocale = () => {
  const currentLang = i18n.language || "en";
  switch (currentLang) {
    case "es":
      return es;
    case "en":
    default:
      return enUS;
  }
};

/**
 * Formats a date with locale support
 * @param date - Date to format
 * @param formatString - Format string (e.g., "MMMM d, yyyy")
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string, formatString: string): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const locale = getDateLocale();
  return format(dateObj, formatString, { locale });
};

/**
 * Formats a date in a short format (e.g., "Jan 15, 2024")
 */
export const formatDateShort = (date: Date | string): string => {
  return formatDate(date, "MMM d, yyyy");
};

/**
 * Formats a date in a long format (e.g., "January 15, 2024")
 */
export const formatDateLong = (date: Date | string): string => {
  return formatDate(date, "MMMM d, yyyy");
};

/**
 * Formats a date with day of week (e.g., "Monday, January 15, 2024")
 */
export const formatDateWithDay = (date: Date | string): string => {
  return formatDate(date, "EEEE, MMMM d, yyyy");
};

/**
 * Formats time (e.g., "3:45 PM")
 */
export const formatTime = (date: Date | string): string => {
  return formatDate(date, "h:mm a");
};

/**
 * Formats date and time together (e.g., "Jan 15, 2024 • 3:45 PM")
 */
export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, "MMM d, yyyy • h:mm a");
};

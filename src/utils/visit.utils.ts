import {
  Calendar,
  CheckCircle2,
  Circle,
  X,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import type { Visit, VisitStatus } from "@/types/journey";

/**
 * Formats a visit status to a human-readable label
 * @param status - The visit status to format
 * @returns Capitalized status label (e.g., "Completed", "Scheduled")
 */
export const formatStatusLabel = (status: VisitStatus): string => {
  return status.charAt(0).toUpperCase() + status.slice(1);
};

/**
 * Gets the display title for a visit based on its type
 * @param visit - The visit object
 * @returns Formatted visit title string
 */
export const getVisitTitle = (visit: Visit): string => {
  switch (visit.type) {
    case "initial":
      return "Initial Consultation";
    case "labor_delivery":
      return "Labor & Delivery";
    case "pregnancy_loss":
      return "Pregnancy Loss Support";
    case "extended_postpartum":
      return `Extended Postpartum Visit ${visit.visitNumber}`;
    case "additional_postpartum":
      return `Additional Postpartum Visit ${visit.visitNumber}`;
    default:
      return `Prenatal/Postpartum Visit ${visit.visitNumber} of ${visit.totalOfType}`;
  }
};

/**
 * Gets the icon component for a visit status
 * @param status - The visit status
 * @returns Lucide icon component
 */
export const getStatusIcon = (status: VisitStatus): LucideIcon => {
  switch (status) {
    case "completed":
      return CheckCircle2;
    case "scheduled":
      return Calendar;
    case "available":
      return Circle;
    case "missed":
      return AlertCircle;
    case "cancelled":
      return X;
    default:
      return Circle;
  }
};

/**
 * Gets the badge styles for a visit status (for drawer/modal use)
 * @param status - The visit status
 * @returns Tailwind CSS classes for badge styling
 */
export const getStatusBadgeStyles = (status: VisitStatus): string => {
  switch (status) {
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "scheduled":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "missed":
      return "bg-red-50 text-red-700 border-red-200";
    case "cancelled":
      return "bg-gray-100 text-gray-700 border-gray-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

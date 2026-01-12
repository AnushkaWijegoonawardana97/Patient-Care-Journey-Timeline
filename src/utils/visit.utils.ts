import {
  Calendar,
  CheckCircle2,
  Circle,
  X,
  AlertCircle,
  type LucideIcon,
} from "lucide-react";
import i18n from "@/lib/i18n";
import type { Visit, VisitStatus } from "@/types/journey";

/**
 * Formats a visit status to a human-readable label
 * @param status - The visit status to format
 * @returns Translated status label
 */
export const formatStatusLabel = (status: VisitStatus): string => {
  return i18n.t(`visits.status.${status}`);
};

/**
 * Gets the display title for a visit based on its type
 * @param visit - The visit object
 * @returns Formatted visit title string with translations
 */
export const getVisitTitle = (visit: Visit): string => {
  switch (visit.type) {
    case "initial":
      return i18n.t("visits.types.initial");
    case "labor_delivery":
      return i18n.t("visits.types.laborDelivery");
    case "pregnancy_loss":
      return i18n.t("visits.types.pregnancyLoss");
    case "extended_postpartum":
      return i18n.t("visits.types.extendedPostpartum", { number: visit.visitNumber });
    case "additional_postpartum":
      return i18n.t("visits.types.additionalPostpartum", { number: visit.visitNumber });
    default:
      return i18n.t("visits.types.prenatalPostpartumWithNumber", {
        number: visit.visitNumber,
        total: visit.totalOfType,
      });
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

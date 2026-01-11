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

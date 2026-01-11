import * as React from "react";
import { Calendar, CheckCircle2, Circle, Clock, X } from "lucide-react";
import type { Visit } from "@/types/journey";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface VisitCardProps {
  visit: Visit;
  isLast?: boolean;
  onClick?: () => void;
}

const statusColors = {
  completed: "border-l-secondary-success bg-secondary-light/30",
  scheduled: "border-l-primary bg-primary-light/30",
  available: "border-l-gray-300 bg-white",
  missed: "border-l-tertiary-error bg-red-50/50",
  cancelled: "border-l-gray-400 bg-gray-50",
};

const statusIcons = {
  completed: <CheckCircle2 className="w-5 h-5 text-secondary-success" />,
  scheduled: <Calendar className="w-5 h-5 text-primary" />,
  available: <Circle className="w-5 h-5 text-gray-400" />,
  missed: <Clock className="w-5 h-5 text-tertiary-error" />,
  cancelled: <X className="w-5 h-5 text-gray-400" />,
};

const getVisitTitle = (visit: Visit): string => {
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

export const VisitCard: React.FC<VisitCardProps> = ({ visit, isLast = false, onClick }) => {
  return (
    <div className="relative pl-12 pb-8 group">
      {!isLast && (
        <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
      )}

      <div
        className={cn(
          "absolute left-4 top-1 -translate-x-1/2 p-1 rounded-full border-2 bg-white z-10",
          visit.status === "completed" ? "border-secondary-success" : visit.status === "scheduled" ? "border-primary" : "border-gray-300"
        )}
      >
        <div
          className={cn(
            "w-2 h-2 rounded-full",
            visit.status === "completed" ? "bg-secondary-success" : visit.status === "scheduled" ? "bg-primary" : "bg-gray-300"
          )}
        />
      </div>

      <div
        className={cn(
          "rounded-lg border shadow-sm transition-all duration-200 overflow-hidden",
          "hover:shadow-md cursor-pointer border-l-4",
          statusColors[visit.status]
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-label={`${getVisitTitle(visit)} - ${visit.status}`}
      >
        <div className="p-4 flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {statusIcons[visit.status]}
              <h3 className="font-semibold text-text-primary">{getVisitTitle(visit)}</h3>
            </div>

            <div className="text-sm text-text-secondary space-y-1">
              {visit.scheduledDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{format(new Date(visit.scheduledDate), "MMM d, yyyy • h:mm a")}</span>
                </div>
              )}
              {visit.completedDate && (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Completed {format(new Date(visit.completedDate), "MMM d, yyyy")}</span>
                </div>
              )}
              {visit.status === "available" && <span>Available to schedule</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitCard;

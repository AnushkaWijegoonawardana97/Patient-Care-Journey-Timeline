import * as React from "react";
import { Star } from "lucide-react";
import type { Milestone } from "@/types/journey";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface MilestoneMarkerProps {
  milestone: Milestone;
  isLast?: boolean;
}

const milestoneTypeStyles = {
  trimester: "bg-primary-light border-primary text-primary",
  due_date: "bg-secondary-light border-secondary-success text-secondary-emphasis",
  postpartum_week: "bg-tertiary-info border-primary text-primary-dark",
  custom: "bg-gray-100 border-gray-300 text-text-primary",
};

export const MilestoneMarker: React.FC<MilestoneMarkerProps> = ({ milestone, isLast = false }) => {
  const styleClass = milestoneTypeStyles[milestone.type] || milestoneTypeStyles.custom;

  return (
    <div className="relative pl-12 pb-8">
      {!isLast && (
        <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2" />
      )}

      <div className="absolute left-4 top-1.5 -translate-x-1/2 p-1.5 rounded-full bg-white border-2 border-primary z-10 shadow-sm">
        <Star className="w-3 h-3 text-primary fill-primary" />
      </div>

      <div className="flex items-center gap-3">
        <div className={cn("border px-3 py-1.5 rounded-full shadow-sm", styleClass)}>
          <span className="text-xs font-bold uppercase tracking-wide">{milestone.title}</span>
          {milestone.description && (
            <span className="text-xs ml-2 border-l border-current/30 pl-2">{milestone.description}</span>
          )}
        </div>
        <span className="text-xs text-text-secondary font-medium">
          {format(new Date(milestone.date), "MMM d, yyyy")}
        </span>
      </div>
    </div>
  );
};

export default MilestoneMarker;

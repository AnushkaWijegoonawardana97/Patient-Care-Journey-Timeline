import * as React from "react";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import type { Visit } from "@/types/journey";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { VISIT_STATUS_CONFIG } from "@/utils/visit.constants";
import { formatStatusLabel, getVisitTitle } from "@/utils/visit.utils";

export interface VisitCardProps {
  visit: Visit;
  isLast?: boolean;
  onClick?: () => void;
}

export const VisitCard: React.FC<VisitCardProps> = ({ visit, isLast = false, onClick }) => {
  const config = React.useMemo(() => VISIT_STATUS_CONFIG[visit.status], [visit.status]);
  const visitTitle = React.useMemo(() => getVisitTitle(visit), [visit]);
  const statusLabel = React.useMemo(() => formatStatusLabel(visit.status), [visit.status]);
  const hasActiveStatus = React.useMemo(
    () => visit.status === "completed" || visit.status === "scheduled",
    [visit.status]
  );

  const IconComponent = config.iconComponent;

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onClick?.();
      }
    },
    [onClick]
  );

  const ariaLabel = React.useMemo(
    () => `${visitTitle} - ${statusLabel}`,
    [visitTitle, statusLabel]
  );

  return (
    <div className="relative pl-12 pb-8 group">
      {!isLast && (
        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 dark:from-gray-600 to-transparent -translate-x-1/2" />
      )}

      <div className="absolute left-6 top-2 -translate-x-1/2 z-10">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center shadow-md",
            config.markerBg
          )}
        >
          <div className="w-3 h-3 rounded-full bg-white/90 dark:bg-card" />
        </div>
        {hasActiveStatus && (
          <div
            className={cn(
              "absolute inset-0 rounded-full blur-sm opacity-30 dark:opacity-40 -z-10",
              config.markerBg
            )}
          />
        )}
      </div>

      <div
        className={cn(
          "rounded-xl border shadow-sm transition-all duration-300 overflow-hidden",
          "hover:shadow-lg hover:scale-[1.01] cursor-pointer border-l-4",
          "group-hover:border-opacity-80 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2",
          "dark:bg-gray-800/50 dark:border-gray-700",
          config.border,
          config.bg
        )}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-label={ariaLabel}
      >
        <div className="p-4 flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-xs font-semibold border",
                  config.badge
                )}
              >
                {statusLabel}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <IconComponent className={cn("w-5 h-5 flex-shrink-0", config.iconColor)} />
              <h3 className="font-semibold text-text-primary dark:text-white text-base">{visitTitle}</h3>
            </div>

            <div className="text-sm text-text-secondary dark:text-gray-300 space-y-1.5">
              {visit.scheduledDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 flex-shrink-0 dark:text-gray-400" aria-hidden="true" />
                  <time dateTime={visit.scheduledDate}>
                    {format(new Date(visit.scheduledDate), "MMM d, yyyy • h:mm a")}
                  </time>
                </div>
              )}
              {visit.completedDate && (
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 dark:text-gray-400" aria-hidden="true" />
                  <time dateTime={visit.completedDate}>
                    Completed {format(new Date(visit.completedDate), "MMM d, yyyy")}
                  </time>
                </div>
              )}
              {visit.status === "available" && (
                <span className="text-text-secondary dark:text-gray-400">Available to schedule</span>
              )}
              {visit.doula && (
                <div className="flex items-center gap-1.5 pt-1">
                  <div
                    className="w-4 h-4 rounded-full bg-gray-200 dark:bg-gray-600 flex-shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-xs dark:text-gray-300">{visit.doula.name}</span>
                </div>
              )}
            </div>
          </div>

          <div
            className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            aria-hidden="true"
          >
            <ArrowRight className="w-5 h-5 text-text-secondary dark:text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitCard;

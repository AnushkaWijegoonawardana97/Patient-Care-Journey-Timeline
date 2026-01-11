import * as React from "react";
import { compareAsc, parseISO } from "date-fns";
import type { Patient, Visit, Milestone } from "@/types/journey";
import { VisitCard } from "@/components/molecules/VisitCard/VisitCard";
import { MilestoneMarker } from "@/components/molecules/MilestoneMarker/MilestoneMarker";

export interface TimelineContainerProps {
  patient: Patient;
  visits: Visit[];
  milestones: Milestone[];
  onVisitClick?: (visit: Visit) => void;
}

type TimelineItem =
  | { type: "visit"; date: string | undefined; data: Visit }
  | { type: "milestone"; date: string; data: Milestone };

export const TimelineContainer: React.FC<TimelineContainerProps> = ({
  patient,
  visits,
  milestones,
  onVisitClick,
}) => {
  const timelineItems = React.useMemo(() => {
    const relevantVisits = visits.filter((v) => {
      if (patient.insuranceType === "standard" && v.type === "additional_postpartum") {
        return false;
      }

      if (patient.carePathway === "labor_delivery" && v.type === "pregnancy_loss") {
        return false;
      }

      if (patient.carePathway === "pregnancy_loss" && v.type === "labor_delivery") {
        return false;
      }

      return true;
    });

    const items: TimelineItem[] = [
      ...relevantVisits.map((v) => ({
        type: "visit" as const,
        date: v.completedDate || v.scheduledDate,
        data: v,
      })),
      ...milestones.map((m) => ({
        type: "milestone" as const,
        date: m.date,
        data: m,
      })),
    ];

    return items.sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return compareAsc(parseISO(a.date), parseISO(b.date));
    });
  }, [visits, milestones, patient.insuranceType, patient.carePathway]);

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-sm border border-gray-100 min-h-[600px]">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary">Your Care Journey</h2>
        <p className="text-text-secondary">Timeline of your visits and important milestones</p>
      </div>

      <div className="relative">
        {timelineItems.length === 0 ? (
          <div className="text-center py-10 text-text-secondary">
            No journey items found.
          </div>
        ) : (
          timelineItems.map((item, index) => {
            const isLast = index === timelineItems.length - 1;

            if (item.type === "visit") {
              return (
                <VisitCard
                  key={item.data.id}
                  visit={item.data}
                  isLast={isLast}
                  onClick={() => onVisitClick?.(item.data)}
                />
              );
            } else {
              return (
                <MilestoneMarker key={item.data.id} milestone={item.data} isLast={isLast} />
              );
            }
          })
        )}
      </div>
    </div>
  );
};

export default TimelineContainer;

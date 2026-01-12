import * as React from "react";
import { compareAsc, parseISO } from "date-fns";
import { motion, useReducedMotion } from "framer-motion";
import type { Patient, Visit, Milestone } from "@/types/journey";
import { VisitCard } from "@/components/molecules/VisitCard/VisitCard";
import { MilestoneMarker } from "@/components/molecules/MilestoneMarker/MilestoneMarker";
import { cn } from "@/lib/utils";

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
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = React.useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: shouldReduceMotion ? 0 : 0.1,
          delayChildren: shouldReduceMotion ? 0 : 0.1,
        },
      },
    }),
    [shouldReduceMotion]
  );

  const itemVariants = React.useMemo(
    () => ({
      hidden: {
        opacity: shouldReduceMotion ? 1 : 0,
        y: shouldReduceMotion ? 0 : 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.4,
          ease: "easeOut" as const,
        },
      },
    }),
    [shouldReduceMotion]
  );

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
    <section className="p-4 sm:p-6 bg-white dark:bg-card rounded-lg shadow-sm border border-gray-100 dark:border-border min-h-[600px]" aria-labelledby="timeline-heading">
      <div className="mb-8">
        <h2 id="timeline-heading" className="text-2xl font-bold text-text-primary dark:text-white">Your Care Journey</h2>
        <p className="text-text-secondary dark:text-gray-300">Timeline of your visits and important milestones</p>
      </div>

      <div className="relative">
        {timelineItems.length === 0 ? (
          <div className="text-center py-10 text-text-secondary dark:text-gray-400" role="status" aria-live="polite">No journey items found.</div>
        ) : (
          <>
            {/* Central vertical timeline line - visible on desktop */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600 -translate-x-1/2 hidden lg:block" aria-hidden="true" />

            {/* Timeline items with alternating layout */}
            <motion.ol
              className="relative space-y-6 lg:space-y-12"
              role="list"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {timelineItems.map((item, index) => {
                const isLast = index === timelineItems.length - 1;
                const isEven = index % 2 === 0;
                const isLeft = isEven;

                if (item.type === "visit") {
                  return (
                    <motion.li
                      key={item.data.id}
                      variants={itemVariants}
                      className={cn(
                        "relative flex items-start",
                        isLeft
                          ? "lg:justify-start lg:pr-[calc(50%+1rem)]"
                          : "lg:justify-end lg:pl-[calc(50%+1rem)]"
                      )}
                    >
                      {/* Central timeline dot marker - visible on desktop */}
                      <div className="absolute left-6 lg:left-1/2 top-4 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 z-20 hidden lg:flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-lg" />
                      </div>

                      {/* Card wrapper - maintains card's internal structure */}
                      <div className="w-full">
                        <VisitCard
                          visit={item.data}
                          isLast={isLast}
                          onClick={() => onVisitClick?.(item.data)}
                        />
                      </div>
                    </motion.li>
                  );
                } else {
                  return (
                    <motion.li
                      key={item.data.id}
                      variants={itemVariants}
                      className={cn(
                        "relative flex items-start",
                        isLeft
                          ? "lg:justify-start lg:pr-[calc(50%+1rem)]"
                          : "lg:justify-end lg:pl-[calc(50%+1rem)]"
                      )}
                    >
                      {/* Central timeline dot marker - visible on desktop */}
                      <div className="absolute left-6 lg:left-1/2 top-4 lg:top-1/2 -translate-x-1/2 lg:-translate-y-1/2 z-20 hidden lg:flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-primary dark:bg-primary border-2 border-white dark:border-card shadow-lg" />
                      </div>

                      {/* Card wrapper - maintains card's internal structure */}
                      <div className="w-full">
                        <MilestoneMarker milestone={item.data} isLast={isLast} />
                      </div>
                    </motion.li>
                  );
                }
              })}
            </motion.ol>
          </>
        )}
      </div>
    </section>
  );
};

export default TimelineContainer;

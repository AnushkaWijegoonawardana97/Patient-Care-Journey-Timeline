import * as React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { ArrowRight, CheckCircle2, Calendar } from "lucide-react";

export interface MiniJourneyPreviewProps {
  currentPhase: "First Trimester" | "Second Trimester" | "Third Trimester" | "Postpartum";
  upcomingMilestone: string;
  milestoneDate?: string;
  lastCompletedVisit?: {
    date: string;
    type: string;
  };
  isUpcoming?: boolean;
}

const phaseOrder = {
  "First Trimester": 1,
  "Second Trimester": 2,
  "Third Trimester": 3,
  Postpartum: 4,
};

export const MiniJourneyPreview: React.FC<MiniJourneyPreviewProps> = ({
  currentPhase,
  upcomingMilestone,
  milestoneDate,
  lastCompletedVisit,
  isUpcoming = true,
}) => {
  const { t } = useTranslation();
  const currentPhaseIndex = phaseOrder[currentPhase];
  
  const phaseTranslations: Record<keyof typeof phaseOrder, string> = {
    "First Trimester": t("phases.firstTrimester"),
    "Second Trimester": t("phases.secondTrimester"),
    "Third Trimester": t("phases.thirdTrimester"),
    Postpartum: t("phases.postpartum"),
  };

  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-gray-100 dark:border-border overflow-hidden bg-gradient-to-br from-white via-primary-light/5 to-secondary-light/5 dark:from-card dark:via-primary/5 dark:to-secondary-success/5">
      <div className="p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center shadow-md">
            <ArrowRight className="h-5 w-5 text-white rotate-[-45deg]" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary dark:text-card-foreground">Your Care Journey</h2>
        </div>

        {/* Phase Timeline */}
        <div className="mb-8">
          <div className="relative flex items-center mb-4">
            {Object.keys(phaseOrder).map((phase, index) => {
              const phaseIndex = phaseOrder[phase as keyof typeof phaseOrder];
              const isActive = phaseIndex === currentPhaseIndex;
              const isCompleted = phaseIndex < currentPhaseIndex;
              const phases = Object.keys(phaseOrder);
              const isLast = index === phases.length - 1;

              return (
                <React.Fragment key={phase}>
                  <div className="flex flex-col items-center relative z-10" style={{ flex: 1 }}>
                    <div
                      className={`
                        w-4 h-4 rounded-full mb-2 transition-all shadow-md
                        ${isCompleted ? "bg-gradient-to-br from-secondary-success to-secondary-emphasis ring-2 ring-secondary-success/30" : ""}
                        ${isActive ? "bg-gradient-to-br from-primary to-primary-hover ring-4 ring-primary-light scale-125" : ""}
                        ${!isActive && !isCompleted ? "bg-gray-300 ring-2 ring-gray-200" : ""}
                      `}
                    />
                  </div>
                  {!isLast && (
                    <div
                      className={`
                        h-1 flex-1 -mx-2 relative z-0 transition-all
                        ${isCompleted ? "bg-gradient-to-r from-secondary-success to-secondary-emphasis" : "bg-gray-200"}
                      `}
                      style={{ marginTop: "-12px" }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
          <div className="flex justify-between text-xs font-semibold text-text-secondary dark:text-muted-foreground">
            <span>{phaseTranslations["First Trimester"]}</span>
            <span>{phaseTranslations["Second Trimester"]}</span>
            <span>{phaseTranslations["Third Trimester"]}</span>
            <span>{phaseTranslations.Postpartum}</span>
          </div>
        </div>

        {/* Last Completed Visit & Upcoming Milestone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Last Completed Visit */}
          {lastCompletedVisit && (
            <div className="bg-gradient-to-br from-emerald-50 to-green-50/50 dark:from-emerald-900/20 dark:to-green-900/10 rounded-xl p-5 border-2 border-emerald-200/50 dark:border-emerald-800/30 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-md">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  Last Completed
                </p>
              </div>
              <p className="text-base font-bold text-text-primary dark:text-card-foreground mb-1">{lastCompletedVisit.type}</p>
              <p className="text-sm text-text-secondary dark:text-muted-foreground">{lastCompletedVisit.date}</p>
            </div>
          )}

          {/* Upcoming Milestone */}
          <div className="bg-gradient-to-br from-secondary-light to-secondary-success/10 dark:from-secondary-success/20 dark:to-secondary-success/10 rounded-xl p-5 border-2 border-secondary-success/20 dark:border-secondary-success/30 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary-success to-secondary-emphasis flex items-center justify-center shadow-md">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <p className="text-xs font-semibold text-secondary-emphasis dark:text-secondary-accent uppercase tracking-wide">
                Upcoming Milestone
              </p>
            </div>
            {upcomingMilestone && upcomingMilestone !== "No milestones available" ? (
              <>
                <p className="text-base font-bold text-text-primary dark:text-card-foreground mb-1">{upcomingMilestone}</p>
                {milestoneDate ? (
                  <p className="text-sm text-text-secondary dark:text-muted-foreground">{milestoneDate}</p>
                ) : (
                  <p className="text-sm text-text-secondary dark:text-muted-foreground italic">Date to be determined</p>
                )}
                {!isUpcoming && (
                  <p className="text-xs text-text-secondary dark:text-muted-foreground mt-1 italic">Recent milestone</p>
                )}
              </>
            ) : (
              <>
                <p className="text-base font-bold text-text-primary dark:text-card-foreground mb-1">No milestones available</p>
                <p className="text-sm text-text-secondary dark:text-muted-foreground">Milestone information will appear here</p>
              </>
            )}
          </div>
        </div>

        {/* CTA Button */}
        <Button asChild className="w-full shadow-md hover:shadow-lg transition-all" size="lg">
          <Link to="/care-journey">
            View Full Care Journey
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default MiniJourneyPreview;

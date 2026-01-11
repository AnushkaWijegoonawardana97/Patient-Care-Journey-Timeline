import * as React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/atoms/Button/Button";
import { ArrowRight } from "lucide-react";

export interface MiniJourneyPreviewProps {
  currentPhase: "First Trimester" | "Second Trimester" | "Third Trimester" | "Postpartum";
  upcomingMilestone: string;
  milestoneDate?: string;
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
}) => {
  const currentPhaseIndex = phaseOrder[currentPhase];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 lg:p-8">
      <h2 className="text-xl font-bold text-text-primary mb-6">Your Care Journey</h2>

      {/* Phase Timeline */}
      <div className="mb-6">
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
                      w-3 h-3 rounded-full mb-2 transition-all
                      ${isCompleted ? "bg-secondary-success" : ""}
                      ${isActive ? "bg-primary ring-4 ring-primary-light" : ""}
                      ${!isActive && !isCompleted ? "bg-gray-300" : ""}
                    `}
                  />
                </div>
                {!isLast && (
                  <div
                    className={`
                      h-0.5 flex-1 -mx-2 relative z-0
                      ${isCompleted ? "bg-secondary-success" : "bg-gray-300"}
                    `}
                    style={{ marginTop: "-10px" }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-text-secondary">
          <span>First</span>
          <span>Second</span>
          <span>Third</span>
          <span>Postpartum</span>
        </div>
      </div>

      {/* Upcoming Milestone */}
      <div className="bg-secondary-light rounded-lg p-4 mb-6">
        <p className="text-sm font-medium text-secondary-emphasis mb-1">
          Upcoming Milestone
        </p>
        <p className="text-base font-semibold text-text-primary">{upcomingMilestone}</p>
        {milestoneDate && (
          <p className="text-xs text-text-secondary mt-1">{milestoneDate}</p>
        )}
      </div>

      {/* CTA Button */}
      <Button asChild className="w-full">
        <Link to="/care-journey">
          View Full Care Journey
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default MiniJourneyPreview;

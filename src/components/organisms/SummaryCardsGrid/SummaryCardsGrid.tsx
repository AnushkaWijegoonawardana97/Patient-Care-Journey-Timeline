import * as React from "react";
import { Calendar, CheckCircle2, Heart } from "lucide-react";
import { SummaryCard } from "@/components/molecules/SummaryCard/SummaryCard";

export interface VisitProgress {
  completed: number;
  total: number;
}

export interface NextVisit {
  date: string;
  time: string;
  type: string;
}

export interface JourneyStatus {
  status: string;
  message?: string;
}

export interface SummaryCardsGridProps {
  visitProgress: VisitProgress;
  nextVisit: NextVisit;
  journeyStatus: JourneyStatus;
}

export const SummaryCardsGrid: React.FC<SummaryCardsGridProps> = ({
  visitProgress,
  nextVisit,
  journeyStatus,
}) => {
  const progressPercentage = Math.round(
    (visitProgress.completed / visitProgress.total) * 100
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Visit Progress Card */}
      <SummaryCard
        title="Visit Progress"
        value={
          <div>
            <p className="text-2xl font-bold text-text-primary">
              {visitProgress.completed} of {visitProgress.total}
            </p>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-secondary-success h-2 rounded-full transition-all"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs text-text-secondary mt-1">{progressPercentage}% completed</p>
          </div>
        }
        icon={CheckCircle2}
        iconColor="text-secondary-success"
      />

      {/* Next Scheduled Visit Card */}
      <SummaryCard
        title="Next Visit"
        value={
          <div>
            <p className="text-lg font-bold text-text-primary">{nextVisit.date}</p>
            <p className="text-sm text-text-secondary mt-1">{nextVisit.time}</p>
            <p className="text-xs text-text-secondary mt-1">{nextVisit.type}</p>
          </div>
        }
        description="Upcoming appointment"
        icon={Calendar}
        iconColor="text-primary"
      />

      {/* Journey Status Card */}
      <SummaryCard
        title="Journey Status"
        value={
          <div>
            <p className="text-2xl font-bold text-text-primary">{journeyStatus.status}</p>
            {journeyStatus.message && (
              <p className="text-xs text-text-secondary mt-1">{journeyStatus.message}</p>
            )}
          </div>
        }
        icon={Heart}
        iconColor="text-secondary-success"
      />
    </div>
  );
};

export default SummaryCardsGrid;

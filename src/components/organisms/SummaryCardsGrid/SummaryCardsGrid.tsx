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
  const progressPercentage = Math.round((visitProgress.completed / visitProgress.total) * 100);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {/* Visit Progress Card */}
      <SummaryCard
        title="Visit Progress"
        value={
          <div>
            <p className="text-2xl font-bold text-text-primary dark:text-white">
              {visitProgress.completed} of {visitProgress.total}
            </p>
            <div className="mt-3 w-full bg-gray-100 dark:bg-gray-700/50 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-secondary-success to-secondary-emphasis dark:from-secondary-success dark:to-secondary-emphasis rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <p className="text-xs font-semibold text-text-secondary dark:text-gray-300 mt-2">
              {progressPercentage}% completed
            </p>
          </div>
        }
        icon={CheckCircle2}
        iconColor="text-secondary-success"
        className="dark:bg-gray-800/50 dark:border-gray-700"
      />

      {/* Next Scheduled Visit Card */}
      <SummaryCard
        title="Next Visit"
        value={
          <div>
            <p className="text-lg font-bold text-text-primary dark:text-white">{nextVisit.date}</p>
            <p className="text-sm text-text-secondary dark:text-gray-300 mt-1">{nextVisit.time}</p>
            <p className="text-xs text-text-secondary dark:text-gray-400 mt-1">{nextVisit.type}</p>
          </div>
        }
        description="Upcoming appointment"
        icon={Calendar}
        iconColor="text-primary"
        className="dark:bg-gray-800/50 dark:border-gray-700"
      />

      {/* Journey Status Card */}
      <SummaryCard
        title="Journey Status"
        value={
          <div>
            <p className="text-2xl font-bold text-text-primary dark:text-white">
              {journeyStatus.status}
            </p>
            {journeyStatus.message && (
              <p className="text-xs text-text-secondary dark:text-gray-300 mt-1">
                {journeyStatus.message}
              </p>
            )}
          </div>
        }
        icon={Heart}
        iconColor="text-secondary-success"
        className="dark:bg-gray-800/50 dark:border-gray-700"
      />
    </div>
  );
};

export default SummaryCardsGrid;

import * as React from "react";
import { Heart, Calendar } from "lucide-react";
import type { Patient, Visit } from "@/types/journey";
import { CircularProgress } from "@/components/atoms/CircularProgress/CircularProgress";
import { cn } from "@/lib/utils";

export interface JourneyStatusHeaderProps {
  patient: Patient;
  visits: Visit[];
}

export const JourneyStatusHeader: React.FC<JourneyStatusHeaderProps> = ({ patient, visits }) => {
  const relevantVisits = React.useMemo(() => {
    return visits.filter((v) => {
      if (patient.insuranceType === "standard" && v.type === "additional_postpartum") return false;
      return true;
    });
  }, [visits, patient.insuranceType]);

  const completedVisits = relevantVisits.filter((v) => v.status === "completed").length;
  const totalVisits = relevantVisits.length;
  const progress = totalVisits > 0 ? Math.round((completedVisits / totalVisits) * 100) : 0;

  const weekText =
    patient.currentWeek > 0
      ? `${patient.currentWeek} weeks pregnant`
      : `${Math.abs(patient.currentWeek)} weeks postpartum`;

  const insuranceTypeLabel = patient.insuranceType === "medi-cal" ? "Medi-Cal" : "Standard";

  return (
    <div
      className={cn(
        "bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden",
        "bg-gradient-to-br from-white via-primary-light/5 to-secondary-light/5"
      )}
    >
      <div className="p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left Section - Progress & Patient Info */}
          <div className="flex items-start gap-5">
            {/* Circular Progress with decorative background */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary-success/20 rounded-full blur-xl" />
              <CircularProgress
                percentage={progress}
                size={80}
                strokeWidth={8}
                className="relative z-10"
              />
            </div>

            {/* Patient Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-5 h-5 text-primary flex-shrink-0" />
                <h1 className="text-2xl lg:text-3xl font-bold text-text-primary">
                  Hi, {patient.name}
                </h1>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {completedVisits} of {totalVisits} visits completed
                  </span>
                </div>
                <p className="text-sm font-medium text-text-primary">{weekText}</p>
              </div>
            </div>
          </div>

          {/* Right Section - Insurance Plan Badge */}
          <div className="flex items-center gap-3 lg:flex-shrink-0">
            <div
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl border-2 shadow-sm",
                "bg-gradient-to-br from-primary-light/30 to-white",
                "border-primary/20"
              )}
            >
              <span className="text-sm font-semibold text-text-secondary">Plan:</span>
              <div
                className={cn(
                  "px-4 py-2 text-sm font-bold text-white rounded-lg shadow-md",
                  "bg-gradient-to-r from-primary to-primary-hover"
                )}
              >
                {insuranceTypeLabel}
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-text-secondary uppercase tracking-wide">
              Journey Progress
            </span>
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-secondary-success rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyStatusHeader;

import * as React from "react";
import type { Patient, Visit } from "@/types/journey";
import { CircularProgress } from "@/components/atoms/CircularProgress/CircularProgress";
import { cn } from "@/lib/utils";

export interface JourneyStatusHeaderProps {
  patient: Patient;
  visits: Visit[];
  onInsuranceTypeChange?: (type: "standard" | "medi-cal") => void;
}

export const JourneyStatusHeader: React.FC<JourneyStatusHeaderProps> = ({
  patient,
  visits,
  onInsuranceTypeChange,
}) => {
  const [insuranceType, setInsuranceType] = React.useState<"standard" | "medi-cal">(
    patient.insuranceType
  );

  const relevantVisits = React.useMemo(() => {
    return visits.filter((v) => {
      if (insuranceType === "standard" && v.type === "additional_postpartum") return false;
      return true;
    });
  }, [visits, insuranceType]);

  const completedVisits = relevantVisits.filter((v) => v.status === "completed").length;
  const totalVisits = relevantVisits.length;
  const progress = totalVisits > 0 ? Math.round((completedVisits / totalVisits) * 100) : 0;

  const weekText =
    patient.currentWeek > 0
      ? `${patient.currentWeek} weeks pregnant`
      : `${Math.abs(patient.currentWeek)} weeks postpartum`;

  const handleInsuranceToggle = (type: "standard" | "medi-cal") => {
    setInsuranceType(type);
    onInsuranceTypeChange?.(type);
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <CircularProgress percentage={progress} size={64} strokeWidth={6} />
            <div>
              <h1 className="text-xl font-bold text-text-primary">Hi, {patient.name}</h1>
              <p className="text-sm text-text-secondary">
                {completedVisits} of {totalVisits} visits completed • {weekText}
              </p>
            </div>
          </div>

          {onInsuranceTypeChange && (
            <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
              <span className="text-sm font-medium text-text-secondary pl-2">Plan:</span>
              <div className="flex bg-white rounded-md shadow-sm p-1">
                <button
                  onClick={() => handleInsuranceToggle("standard")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded transition-colors",
                    insuranceType === "standard"
                      ? "bg-primary text-white shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  Standard
                </button>
                <button
                  onClick={() => handleInsuranceToggle("medi-cal")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded transition-colors",
                    insuranceType === "medi-cal"
                      ? "bg-primary text-white shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  Medi-Cal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JourneyStatusHeader;

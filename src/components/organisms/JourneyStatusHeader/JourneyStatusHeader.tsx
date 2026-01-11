import * as React from "react";
import type { Patient, Visit } from "@/types/journey";
import { CircularProgress } from "@/components/atoms/CircularProgress/CircularProgress";

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

          {/* Display insurance type as read-only */}
          <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg border border-gray-200">
            <span className="text-sm font-medium text-text-secondary pl-2">Plan:</span>
            <div className="px-3 py-1.5 text-xs font-semibold bg-primary text-white rounded shadow-sm">
              {insuranceTypeLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JourneyStatusHeader;

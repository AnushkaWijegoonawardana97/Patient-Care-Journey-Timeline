import * as React from "react";
import { Activity, AlertCircle, RefreshCw } from "lucide-react";
import { DashboardLayout } from "@/components/templates/DashboardLayout/DashboardLayout";
import { JourneyStatusHeader } from "@/components/organisms/JourneyStatusHeader/JourneyStatusHeader";
import { TimelineContainer } from "@/components/organisms/TimelineContainer/TimelineContainer";
import { VisitDetailDrawer } from "@/components/organisms/VisitDetailDrawer/VisitDetailDrawer";
import { usePatientJourney } from "@/hooks/usePatientJourney";
import { Button } from "@/components/atoms/Button/Button";
import type { Visit } from "@/types/journey";

/** Loading skeleton for the journey page */
const JourneyLoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-6">
    {/* Header skeleton */}
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div className="flex-1">
          <div className="h-6 bg-gray-200 rounded w-48 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-64" />
        </div>
      </div>
    </div>

    {/* Timeline skeleton */}
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="relative pl-12 pb-8">
          <div className="absolute left-4 top-1 w-4 h-4 bg-gray-200 rounded-full" />
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="h-5 bg-gray-200 rounded w-48 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-32" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

/** Error state component */
const JourneyErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <AlertCircle className="w-8 h-8 text-red-600" />
    </div>
    <h2 className="text-xl font-bold text-text-primary mb-2">Unable to Load Journey</h2>
    <p className="text-text-secondary text-center mb-6 max-w-md">
      We couldn't load your care journey data. Please check your connection and try again.
    </p>
    <Button onClick={onRetry} className="flex items-center gap-2">
      <RefreshCw className="w-4 h-4" />
      Try Again
    </Button>
  </div>
);

/** Empty state component */
const JourneyEmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
      <Activity className="w-8 h-8 text-gray-400" />
    </div>
    <h2 className="text-xl font-bold text-text-primary mb-2">No Journey Data</h2>
    <p className="text-text-secondary text-center max-w-md">
      Your care journey hasn't been set up yet. Please contact your care team for assistance.
    </p>
  </div>
);

export const CareJourney: React.FC = () => {
  const { journey, isLoading, isError, refetch } = usePatientJourney();
  const [selectedVisit, setSelectedVisit] = React.useState<Visit | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [insuranceType, setInsuranceType] = React.useState<"standard" | "medi-cal">("medi-cal");

  // Update insurance type when journey data loads
  React.useEffect(() => {
    if (journey?.patient?.insuranceType) {
      setInsuranceType(journey.patient.insuranceType);
    }
  }, [journey?.patient?.insuranceType]);

  const journeyData = React.useMemo(() => {
    if (!journey) return null;
    return {
      ...journey,
      patient: {
        ...journey.patient,
        insuranceType,
      },
    };
  }, [journey, insuranceType]);

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedVisit(null);
  };

  const handleInsuranceTypeChange = (type: "standard" | "medi-cal") => {
    setInsuranceType(type);
  };

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout activeNavItem="Care Journey" patientName="Loading...">
        <JourneyLoadingSkeleton />
      </DashboardLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <DashboardLayout activeNavItem="Care Journey" patientName="User">
        <JourneyErrorState onRetry={refetch} />
      </DashboardLayout>
    );
  }

  // Empty state
  if (!journeyData) {
    return (
      <DashboardLayout activeNavItem="Care Journey" patientName="User">
        <JourneyEmptyState />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeNavItem="Care Journey" patientName={journeyData.patient.name}>
      <div className="-mx-4 sm:-mx-6 lg:-mx-8">
        <JourneyStatusHeader
          patient={journeyData.patient}
          visits={journeyData.visits}
          onInsuranceTypeChange={handleInsuranceTypeChange}
        />
      </div>
      <TimelineContainer
        patient={journeyData.patient}
        visits={journeyData.visits}
        milestones={journeyData.milestones}
        onVisitClick={handleVisitClick}
      />
      <VisitDetailDrawer visit={selectedVisit} isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </DashboardLayout>
  );
};

export default CareJourney;

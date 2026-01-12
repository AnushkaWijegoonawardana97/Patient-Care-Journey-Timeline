import * as React from "react";
import { Activity } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DashboardLayout } from "@/components/templates/DashboardLayout/DashboardLayout";
import { JourneyStatusHeader } from "@/components/organisms/JourneyStatusHeader/JourneyStatusHeader";
import { TimelineContainer } from "@/components/organisms/TimelineContainer/TimelineContainer";
import { VisitDetailDrawer } from "@/components/organisms/VisitDetailDrawer/VisitDetailDrawer";
import { LoadingSkeleton } from "@/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { ErrorState } from "@/components/molecules/ErrorState/ErrorState";
import { EmptyState } from "@/components/molecules/EmptyState/EmptyState";
import { usePatientJourney } from "@/hooks/usePatientJourney";
import type { Visit } from "@/types/journey";

export const CareJourney: React.FC = () => {
  const { t } = useTranslation();
  const { journey, isLoading, isError, refetch } = usePatientJourney();
  const [selectedVisit, setSelectedVisit] = React.useState<Visit | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleVisitClick = (visit: Visit) => {
    setSelectedVisit(visit);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedVisit(null);
  };

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout activeNavItem="careJourney" patientName={t("common.loading")}>
        <LoadingSkeleton variant="journey" />
      </DashboardLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <DashboardLayout activeNavItem="careJourney" patientName="User">
        <ErrorState
          title={t("careJourney.unableToLoad")}
          message={t("careJourney.unableToLoadMessage")}
          onRetry={refetch}
        />
      </DashboardLayout>
    );
  }

  // Empty state
  if (!journey) {
    return (
      <DashboardLayout activeNavItem="careJourney" patientName="User">
        <EmptyState
          icon={Activity}
          title={t("careJourney.noJourneyData")}
          message={t("careJourney.noJourneyDataMessage")}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeNavItem="careJourney" patientName={journey.patient.name}>
      <div className="space-y-4 lg:space-y-6 mt-6 lg:mt-8">
        <JourneyStatusHeader patient={journey.patient} visits={journey.visits} />
        <TimelineContainer
          patient={journey.patient}
          visits={journey.visits}
          milestones={journey.milestones}
          onVisitClick={handleVisitClick}
        />
      </div>
      <VisitDetailDrawer visit={selectedVisit} isOpen={isDrawerOpen} onClose={handleCloseDrawer} />
    </DashboardLayout>
  );
};

export default CareJourney;

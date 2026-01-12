import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatDateLong, formatTime } from "@/utils/dateUtils";
import { DashboardLayout } from "@/components/templates/DashboardLayout/DashboardLayout";
import { WelcomeBanner } from "@/components/organisms/WelcomeBanner/WelcomeBanner";
import { PatientProfile } from "@/components/organisms/PatientProfile/PatientProfile";
import { SummaryCardsGrid } from "@/components/organisms/SummaryCardsGrid/SummaryCardsGrid";
import { MiniJourneyPreview } from "@/components/organisms/MiniJourneyPreview/MiniJourneyPreview";
import { LoadingSkeleton } from "@/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { ErrorState } from "@/components/molecules/ErrorState/ErrorState";
import { usePatientJourney } from "@/hooks/usePatientJourney";
import { useAuth } from "@/hooks/useAuth";

/** Get current phase based on week - returns English key for internal use */
function getCurrentPhase(
  week: number
): "First Trimester" | "Second Trimester" | "Third Trimester" | "Postpartum" {
  if (week <= 0) return "Postpartum";
  if (week <= 13) return "First Trimester";
  if (week <= 27) return "Second Trimester";
  return "Third Trimester";
}

export const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { journey, isLoading, isError, refetch } = usePatientJourney();

  // Derive data from journey
  const dashboardData = React.useMemo(() => {
    if (!journey) return null;

    const { patient, visits, milestones } = journey;

    // Calculate visit progress
    const completedVisits = visits.filter((v) => v.status === "completed").length;
    const totalVisits = visits.filter((v) => v.type !== "additional_postpartum").length;

    // Get next scheduled visit
    const nextScheduledVisit = visits.find((v) => v.status === "scheduled");
    const nextVisit = nextScheduledVisit?.scheduledDate
      ? {
          date: formatDateLong(nextScheduledVisit.scheduledDate),
          time: formatTime(nextScheduledVisit.scheduledDate),
          type: nextScheduledVisit.type === "prenatal_postpartum" ? t("dashboard.checkUp") : t("dashboard.checkUp"),
        }
      : null;

    // Determine journey status
    const missedVisits = visits.filter((v) => v.status === "missed").length;
    const journeyStatus = {
      status: missedVisits > 0 ? t("dashboard.needsAttention") : t("dashboard.onTrack"),
      message: missedVisits > 0 ? t("dashboard.missedVisits", { count: missedVisits }) : t("dashboard.allAppointmentsScheduled"),
    };

    // Get upcoming milestone - compare dates at start of day to avoid timezone issues
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    // Find the next milestone that hasn't passed yet
    const upcomingMilestones = milestones
      .filter((m) => {
        const milestoneDate = new Date(m.date);
        const milestoneDay = new Date(
          milestoneDate.getFullYear(),
          milestoneDate.getMonth(),
          milestoneDate.getDate()
        );
        return milestoneDay >= today;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Get the next upcoming milestone, or the last milestone if all have passed
    const upcomingMilestone =
      upcomingMilestones[0] ||
      milestones.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

    // Get last completed visit
    const completedVisitsList = visits
      .filter((v) => v.status === "completed" && v.completedDate)
      .sort((a, b) => new Date(b.completedDate!).getTime() - new Date(a.completedDate!).getTime());
    const lastCompletedVisit = completedVisitsList[0];

    return {
      patientName: patient.name,
      phase: getCurrentPhase(patient.currentWeek),
      visitProgress: { completed: completedVisits, total: totalVisits },
      nextVisit,
      journeyStatus,
      upcomingMilestone: upcomingMilestone?.title || t("dashboard.noMilestonesAvailable"),
      milestoneDate: upcomingMilestone
        ? formatDateLong(upcomingMilestone.date)
        : undefined,
      isUpcoming: upcomingMilestones.length > 0,
      lastCompletedVisit: lastCompletedVisit
        ? {
            date: formatDateLong(lastCompletedVisit.completedDate!),
            type:
              lastCompletedVisit.type === "prenatal_postpartum"
                ? t("visits.types.prenatalPostpartumWithNumber", { number: lastCompletedVisit.visitNumber, total: lastCompletedVisit.totalOfType || 8 })
                : lastCompletedVisit.type === "initial"
                ? t("visits.types.initial")
                : lastCompletedVisit.type === "labor_delivery"
                ? t("visits.types.laborDelivery")
                : t("dashboard.checkUp"),
          }
        : undefined,
    };
  }, [journey]);

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout activeNavItem="dashboard" patientName={t("common.loading")}>
        <LoadingSkeleton variant="dashboard" />
      </DashboardLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <DashboardLayout activeNavItem="dashboard" patientName={user?.name || "User"}>
        <ErrorState
          title={t("errors.unableToLoad")}
          message={t("errors.genericMessage")}
          onRetry={refetch}
        />
      </DashboardLayout>
    );
  }

  // Use API data or fallback to defaults
  const patientName = dashboardData?.patientName || user?.name || "User";
  const phase = dashboardData?.phase || "Second Trimester";
  const promptMessage = t("dashboard.promptMessage");

  const visitProgress = dashboardData?.visitProgress || { completed: 0, total: 0 };
  const nextVisit = dashboardData?.nextVisit || {
    date: t("common.loading"),
    time: "",
    type: t("dashboard.checkUp"),
  };
  const journeyStatus = dashboardData?.journeyStatus || {
    status: t("dashboard.onTrack"),
    message: t("dashboard.allAppointmentsScheduled"),
  };
  const upcomingMilestone = dashboardData?.upcomingMilestone || t("dashboard.noMilestonesAvailable");
  const milestoneDate = dashboardData?.milestoneDate;
  const lastCompletedVisit = dashboardData?.lastCompletedVisit;
  const isUpcoming = dashboardData?.isUpcoming ?? true;

  return (
    <DashboardLayout activeNavItem="dashboard" patientName={patientName}>
      <div className="space-y-4 lg:space-y-6 mt-6 lg:mt-8">
        {/* Welcome Banner and Patient Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {/* Welcome Banner takes 2 columns */}
          <div className="lg:col-span-2 flex">
            <WelcomeBanner
              patientName={patientName}
              promptMessage={promptMessage}
              primaryActionLabel={t("dashboard.viewCareJourney")}
              primaryActionTo="/care-journey"
              secondaryActionLabel={t("dashboard.viewProgress")}
              secondaryActionTo="/care-journey"
              imageUrl="/login-page-image.jpg"
            />
          </div>

          {/* Patient Profile takes 1 column */}
          <div className="lg:col-span-1 flex">
            <PatientProfile
              patientName={patientName}
              gender="Female"
              age="28 y.o."
              height="165cm"
              bloodType="O+"
            />
          </div>
        </div>

        {/* Summary Cards */}
        <SummaryCardsGrid
          visitProgress={visitProgress}
          nextVisit={nextVisit}
          journeyStatus={journeyStatus}
        />

        {/* Mini Journey Preview */}
        <MiniJourneyPreview
          currentPhase={phase}
          upcomingMilestone={upcomingMilestone}
          milestoneDate={milestoneDate}
          lastCompletedVisit={lastCompletedVisit}
          isUpcoming={isUpcoming}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

import * as React from "react";
import { format } from "date-fns";
import { DashboardLayout } from "@/components/templates/DashboardLayout/DashboardLayout";
import { WelcomeBanner } from "@/components/organisms/WelcomeBanner/WelcomeBanner";
import { PatientProfile } from "@/components/organisms/PatientProfile/PatientProfile";
import { SummaryCardsGrid } from "@/components/organisms/SummaryCardsGrid/SummaryCardsGrid";
import { MiniJourneyPreview } from "@/components/organisms/MiniJourneyPreview/MiniJourneyPreview";
import { LoadingSkeleton } from "@/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { ErrorState } from "@/components/molecules/ErrorState/ErrorState";
import { usePatientJourney } from "@/hooks/usePatientJourney";
import { useAuth } from "@/hooks/useAuth";

/** Get current phase based on week */
function getCurrentPhase(
  week: number
): "First Trimester" | "Second Trimester" | "Third Trimester" | "Postpartum" {
  if (week <= 0) return "Postpartum";
  if (week <= 13) return "First Trimester";
  if (week <= 27) return "Second Trimester";
  return "Third Trimester";
}

export const Dashboard: React.FC = () => {
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
          date: format(new Date(nextScheduledVisit.scheduledDate), "MMMM d, yyyy"),
          time: format(new Date(nextScheduledVisit.scheduledDate), "h:mm a"),
          type: nextScheduledVisit.type === "prenatal_postpartum" ? "Prenatal Visit" : "Check-up",
        }
      : null;

    // Determine journey status
    const missedVisits = visits.filter((v) => v.status === "missed").length;
    const journeyStatus = {
      status: missedVisits > 0 ? "Needs Attention" : "On Track",
      message: missedVisits > 0 ? `${missedVisits} missed visit(s)` : "All appointments scheduled",
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
      upcomingMilestone: upcomingMilestone?.title || "No milestones available",
      milestoneDate: upcomingMilestone
        ? format(new Date(upcomingMilestone.date), "MMMM d, yyyy")
        : undefined,
      isUpcoming: upcomingMilestones.length > 0,
      lastCompletedVisit: lastCompletedVisit
        ? {
            date: format(new Date(lastCompletedVisit.completedDate!), "MMMM d, yyyy"),
            type:
              lastCompletedVisit.type === "prenatal_postpartum"
                ? `Prenatal Visit ${lastCompletedVisit.visitNumber}`
                : lastCompletedVisit.type === "initial"
                ? "Initial Consultation"
                : lastCompletedVisit.type === "labor_delivery"
                ? "Labor & Delivery"
                : "Visit",
          }
        : undefined,
    };
  }, [journey]);

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout activeNavItem="Dashboard" patientName="Loading...">
        <LoadingSkeleton variant="dashboard" />
      </DashboardLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <DashboardLayout activeNavItem="Dashboard" patientName={user?.name || "User"}>
        <ErrorState
          title="Unable to Load Dashboard"
          message="We couldn't load your dashboard data. Please check your connection and try again."
          onRetry={refetch}
        />
      </DashboardLayout>
    );
  }

  // Use API data or fallback to defaults
  const patientName = dashboardData?.patientName || user?.name || "User";
  const phase = dashboardData?.phase || ("Second Trimester" as const);
  const promptMessage =
    "You have upcoming appointments and milestones. How would you like to continue your care journey today?";

  const visitProgress = dashboardData?.visitProgress || { completed: 0, total: 0 };
  const nextVisit = dashboardData?.nextVisit || {
    date: "Not scheduled",
    time: "",
    type: "Prenatal Visit",
  };
  const journeyStatus = dashboardData?.journeyStatus || {
    status: "On Track",
    message: "All appointments scheduled",
  };
  const upcomingMilestone = dashboardData?.upcomingMilestone || "No milestones available";
  const milestoneDate = dashboardData?.milestoneDate;
  const lastCompletedVisit = dashboardData?.lastCompletedVisit;
  const isUpcoming = dashboardData?.isUpcoming ?? true;

  return (
    <DashboardLayout activeNavItem="Dashboard" patientName={patientName}>
      <div className="space-y-4 lg:space-y-6 mt-6 lg:mt-8">
        {/* Welcome Banner and Patient Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 items-stretch">
          {/* Welcome Banner takes 2 columns */}
          <div className="lg:col-span-2 flex">
            <WelcomeBanner
              patientName={patientName}
              promptMessage={promptMessage}
              primaryActionLabel="View Care Journey"
              primaryActionTo="/care-journey"
              secondaryActionLabel="View Progress"
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

import * as React from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout/DashboardLayout";
import { WelcomeBanner } from "@/components/organisms/WelcomeBanner/WelcomeBanner";
import { PatientProfile } from "@/components/organisms/PatientProfile/PatientProfile";
import { SummaryCardsGrid } from "@/components/organisms/SummaryCardsGrid/SummaryCardsGrid";
import { MiniJourneyPreview } from "@/components/organisms/MiniJourneyPreview/MiniJourneyPreview";

export const Dashboard: React.FC = () => {
  // Dummy data - will be replaced with API data later
  const patientName = "Sarah";
  const phase = "Second Trimester" as const;
  const promptMessage =
    "You have upcoming appointments and milestones. How would you like to continue your care journey today?";

  const visitProgress = {
    completed: 5,
    total: 8,
  };

  const nextVisit = {
    date: "January 25, 2024",
    time: "10:00 AM",
    type: "Routine Check-up",
  };

  const journeyStatus = {
    status: "On Track",
    message: "All appointments scheduled",
  };

  const upcomingMilestone = "20-Week Anatomy Scan";
  const milestoneDate = "Scheduled for January 30, 2024";

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
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;

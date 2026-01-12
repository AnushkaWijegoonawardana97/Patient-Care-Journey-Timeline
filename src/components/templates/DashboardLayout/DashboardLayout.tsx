import * as React from "react";
import { TopNavigation } from "@/components/organisms/TopNavigation/TopNavigation";
import { BottomNavigation } from "@/components/organisms/BottomNavigation/BottomNavigation";
import { SkipLink } from "@/components/atoms/SkipLink/SkipLink";

export interface DashboardLayoutProps {
  children: React.ReactNode;
  activeNavItem?: string;
  patientName?: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  activeNavItem = "Dashboard",
  patientName = "Patient",
}) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <SkipLink href="#main-content">Skip to main content</SkipLink>
      <SkipLink href="#navigation">Skip to navigation</SkipLink>
      <TopNavigation activeNavItem={activeNavItem} patientName={patientName} />
      <main id="main-content" className="pt-0 pb-16 lg:pb-0 container mx-auto" role="main">
        <div className="p-4 sm:p-6 lg:p-8 mx-auto">{children}</div>
      </main>
      <BottomNavigation activeNavItem={activeNavItem} />
    </div>
  );
};

export default DashboardLayout;

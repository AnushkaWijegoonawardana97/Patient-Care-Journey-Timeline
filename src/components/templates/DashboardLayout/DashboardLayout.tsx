import * as React from "react";
import { TopNavigation } from "@/components/organisms/TopNavigation/TopNavigation";
import { BottomNavigation } from "@/components/organisms/BottomNavigation/BottomNavigation";

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
      <TopNavigation activeNavItem={activeNavItem} patientName={patientName} />
      <main className="pt-0 pb-16 lg:pb-0 container mx-auto">
        <div className="p-4 sm:p-6 lg:p-8 mx-auto">{children}</div>
      </main>
      <BottomNavigation activeNavItem={activeNavItem} />
    </div>
  );
};

export default DashboardLayout;

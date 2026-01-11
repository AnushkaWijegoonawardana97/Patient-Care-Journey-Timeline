import * as React from "react";
import { DashboardLayout } from "@/components/templates/DashboardLayout/DashboardLayout";
import { ProfileSummarySection } from "@/components/organisms/ProfileSummarySection/ProfileSummarySection";
import { ThemeToggle } from "@/components/molecules/ThemeToggle/ThemeToggle";
import { LanguageToggle } from "@/components/molecules/LanguageToggle/LanguageToggle";

export const Settings: React.FC = () => {
  const patientName = "Sarah";

  return (
    <DashboardLayout activeNavItem="Settings" patientName={patientName}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Settings</h1>
          <p className="text-text-secondary">Manage your account settings and preferences</p>
        </div>

        <ProfileSummarySection
          patientName={patientName}
          gender="Female"
          age="28 y.o."
          height="165cm"
          bloodType="O+"
          email="sarah@example.com"
          phone="+1 (555) 123-4567"
          address="123 Health St, San Francisco, CA 94102"
        />

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold text-text-primary mb-6">Preferences</h2>
          <div className="space-y-6">
            <div className="pb-6 border-b border-gray-200">
              <ThemeToggle />
            </div>
            <div>
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

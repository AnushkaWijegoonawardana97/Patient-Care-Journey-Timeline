import * as React from "react";
import { Settings as SettingsIcon } from "lucide-react";
import { DashboardLayout } from "@/components/templates/DashboardLayout/DashboardLayout";
import { ProfileSummarySection } from "@/components/organisms/ProfileSummarySection/ProfileSummarySection";
import { ThemeToggle } from "@/components/molecules/ThemeToggle/ThemeToggle";
import { LanguageToggle } from "@/components/molecules/LanguageToggle/LanguageToggle";
import { useAuth } from "@/hooks/useAuth";

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const patientName = user?.name || "User";

  return (
    <DashboardLayout activeNavItem="Settings" patientName={patientName}>
      <div className="space-y-6 lg:space-y-8 mt-6 lg:mt-8">
        {/* Minimal Page Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
            <SettingsIcon className="w-5 h-5 text-primary dark:text-primary" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-white">
              Settings
            </h1>
            <p className="text-sm text-text-secondary dark:text-gray-400 mt-0.5">
              Manage your preferences and account
            </p>
          </div>
        </div>

        {/* Profile Summary Section */}
        <ProfileSummarySection
          patientName={patientName}
          gender="Female"
          age="28 y.o."
          height="165cm"
          bloodType="O+"
          email={user?.email || "sarah@example.com"}
          phone="+1 (555) 123-4567"
          address="123 Health St, San Francisco, CA 94102"
        />

        {/* Preferences Section - Modern & Minimal */}
        <div className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden bg-gradient-to-br from-white via-primary-light/3 to-secondary-light/3 dark:from-gray-800/50 dark:via-gray-800/30 dark:to-gray-800/50">
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary-hover rounded-full" />
              <h2 className="text-lg font-semibold text-text-primary dark:text-white">
                Preferences
              </h2>
            </div>
            <div className="space-y-8">
              <ThemeToggle />
              <div className="border-t border-gray-100 dark:border-gray-700 pt-8">
                <LanguageToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

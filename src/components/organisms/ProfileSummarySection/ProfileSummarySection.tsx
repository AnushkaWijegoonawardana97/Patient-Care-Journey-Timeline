import * as React from "react";
import { User, Calendar, Ruler, Droplet, Mail, Phone, MapPin } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { InfoCard } from "@/components/molecules/InfoCard/InfoCard";

export interface ProfileSummarySectionProps {
  patientName: string;
  avatarUrl?: string;
  gender: string;
  age: string;
  height?: string;
  bloodType?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export const ProfileSummarySection: React.FC<ProfileSummarySectionProps> = ({
  patientName,
  avatarUrl,
  gender,
  age,
  height,
  bloodType,
  email,
  phone,
  address,
}) => {
  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-gray-100 dark:border-border overflow-hidden bg-gradient-to-br from-white via-primary-light/3 to-secondary-light/3 dark:from-card dark:via-primary/5 dark:to-secondary-success/5">
      <div className="p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-primary to-primary-hover rounded-full" />
            <h2 className="text-lg font-semibold text-text-primary dark:text-card-foreground">
              Profile Summary
            </h2>
          </div>
        </div>

        <div className="flex flex-col items-center mb-8 pb-8 border-b border-gray-100 dark:border-border">
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-secondary-success/15 dark:from-primary/20 dark:to-secondary-success/20 rounded-full blur-xl" />
            <Avatar
              src={avatarUrl || "/patient-avatar.jpg"}
              alt={patientName}
              fallback={patientName}
              size="lg"
              className="relative z-10 ring-2 ring-white dark:ring-card shadow-md"
            />
          </div>
          <h3 className="text-xl font-bold text-text-primary dark:text-card-foreground mb-1">
            {patientName}
          </h3>
          <p className="text-xs text-text-secondary dark:text-muted-foreground">Patient Profile</p>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-xs font-semibold text-text-secondary dark:text-muted-foreground mb-4 uppercase tracking-wider">
              Personal Information
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <InfoCard
                icon={User}
                label="Gender"
                value={gender}
                iconBgColor="bg-gradient-to-br from-primary-light to-primary/20"
                iconColor="text-primary"
              />
              <InfoCard
                icon={Calendar}
                label="Age"
                value={age}
                iconBgColor="bg-gradient-to-br from-pink-100 to-pink-200/50"
                iconColor="text-pink-600"
              />
              {height && (
                <InfoCard
                  icon={Ruler}
                  label="Height"
                  value={height}
                  iconBgColor="bg-gradient-to-br from-secondary-light to-secondary-success/20"
                  iconColor="text-secondary-success"
                />
              )}
              {bloodType && (
                <InfoCard
                  icon={Droplet}
                  label="Blood Type"
                  value={bloodType}
                  iconBgColor="bg-gradient-to-br from-red-100 to-red-200/50"
                  iconColor="text-red-600"
                />
              )}
            </div>
          </div>

          {(email || phone || address) && (
            <div>
              <h4 className="text-xs font-semibold text-text-secondary dark:text-muted-foreground mb-4 uppercase tracking-wider">
                Contact Information
              </h4>
              <div className="space-y-3">
                {email && (
                  <div className="flex items-center gap-3 p-3.5 bg-gray-50/60 dark:bg-muted/60 rounded-lg border border-gray-100 dark:border-border hover:bg-gray-50 dark:hover:bg-muted transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary dark:text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-text-secondary dark:text-muted-foreground mb-0.5">
                        Email
                      </p>
                      <p className="text-sm font-medium text-text-primary dark:text-card-foreground truncate">
                        {email}
                      </p>
                    </div>
                  </div>
                )}
                {phone && (
                  <div className="flex items-center gap-3 p-3.5 bg-gray-50/60 dark:bg-muted/60 rounded-lg border border-gray-100 dark:border-border hover:bg-gray-50 dark:hover:bg-muted transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-secondary-success/10 to-secondary-success/5 dark:from-secondary-success/20 dark:to-secondary-success/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-4 h-4 text-secondary-success dark:text-secondary-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-text-secondary dark:text-muted-foreground mb-0.5">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-text-primary dark:text-card-foreground">
                        {phone}
                      </p>
                    </div>
                  </div>
                )}
                {address && (
                  <div className="flex items-center gap-3 p-3.5 bg-gray-50/60 dark:bg-muted/60 rounded-lg border border-gray-100 dark:border-border hover:bg-gray-50 dark:hover:bg-muted transition-colors">
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-pink-100/80 to-pink-200/40 dark:from-pink-900/30 dark:to-pink-800/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-text-secondary dark:text-muted-foreground mb-0.5">
                        Address
                      </p>
                      <p className="text-sm font-medium text-text-primary dark:text-card-foreground">
                        {address}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSummarySection;

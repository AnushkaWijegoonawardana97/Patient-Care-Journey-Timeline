import * as React from "react";
import { User, Calendar, Ruler, Droplet } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { Button } from "@/components/atoms/Button/Button";
import { InfoCard } from "@/components/molecules/InfoCard/InfoCard";
import { Link } from "react-router-dom";

export interface PatientProfileProps {
  patientName: string;
  avatarUrl?: string;
  gender: string;
  age: string;
  height?: string;
  bloodType?: string;
  onViewAllClick?: () => void;
}

export const PatientProfile: React.FC<PatientProfileProps> = ({
  patientName,
  avatarUrl,
  gender,
  age,
  height,
  bloodType,
  onViewAllClick,
}) => {
  return (
    <div className="bg-white dark:bg-card rounded-xl shadow-sm border border-gray-100 dark:border-border overflow-hidden h-full flex flex-col w-full bg-gradient-to-br from-white via-primary-light/5 to-secondary-light/5 dark:from-card dark:via-primary/5 dark:to-secondary-success/5">
      <div className="p-6 flex flex-col items-center flex-1 justify-between gap-6">
        {/* Header Section with Avatar */}
        <div className="flex flex-col items-center flex-shrink-0 w-full">
          {/* Profile Picture with decorative ring */}
          <div className="relative mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary-success/30 dark:from-primary/20 dark:to-secondary-success/20 rounded-full blur-xl" />
            <Avatar
              src={avatarUrl || "/patient-avatar.jpg"}
              alt={patientName}
              fallback={patientName}
              size="lg"
              className="relative z-10 ring-4 ring-white dark:ring-card shadow-lg"
            />
          </div>

          {/* Patient Name */}
          <h2 className="text-xl font-bold text-text-primary dark:text-card-foreground mb-1 text-center">{patientName}</h2>
          <p className="text-xs text-text-secondary dark:text-muted-foreground mb-4">Patient Profile</p>
        </div>

        {/* Info Cards Section */}
        <div className="flex-1 flex flex-col justify-center min-h-0 w-full">
          <div className="grid grid-cols-4 gap-3 w-full mb-4">
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

        {/* View All Button */}
        <Button
          asChild
          variant="default"
          className="w-full bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg transition-all shadow-md"
          size="lg"
        >
          <Link to="/profile" onClick={onViewAllClick}>
            See all information
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default PatientProfile;

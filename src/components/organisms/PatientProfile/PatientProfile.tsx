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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 h-full flex flex-col w-full">
      <div className="flex flex-col items-start flex-1 justify-between gap-4 w-full">
        <div className="flex flex-col items-center flex-shrink-0">
          {/* Profile Picture */}
          <Avatar
            src={avatarUrl}
            alt={patientName}
            fallback={patientName}
            size="lg"
            className="mb-4"
          />

          {/* Patient Name */}
          <h2 className="text-xl font-bold text-text-primary mb-4 text-center">{patientName}</h2>
        </div>

        <div className="flex-1 flex flex-col justify-between min-h-0 w-full">
          {/* Info Cards - Flex Row */}
          <div className="flex flex-row flex-wrap gap-3 w-full mb-4 justify-center">
            <InfoCard
              icon={User}
              label="Gender"
              value={gender}
              iconBgColor="bg-primary-light"
              iconColor="text-primary"
            />
            <InfoCard
              icon={Calendar}
              label="Age"
              value={age}
              iconBgColor="bg-pink-100"
              iconColor="text-pink-600"
            />
            {height && (
              <InfoCard
                icon={Ruler}
                label="Height"
                value={height}
                iconBgColor="bg-secondary-light"
                iconColor="text-secondary-success"
              />
            )}
            {bloodType && (
              <InfoCard
                icon={Droplet}
                label="Blood Type"
                value={bloodType}
                iconBgColor="bg-red-100"
                iconColor="text-red-600"
              />
            )}
          </div>

          {/* View All Button */}
          <Button asChild variant="default" className="w-full bg-primary hover:bg-primary-hover">
            <Link to="/profile" onClick={onViewAllClick}>
              See all information
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;

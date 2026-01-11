import * as React from "react";
import { User, Calendar, Ruler, Droplet, Mail, Phone, MapPin } from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { InfoCard } from "@/components/molecules/InfoCard/InfoCard";
import { Badge } from "@/components/atoms/Badge/Badge";

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-text-primary">Profile Summary</h2>
        <Badge variant="outline" className="bg-gray-50 text-text-secondary border-gray-200">
          Read Only
        </Badge>
      </div>

      <div className="flex flex-col items-center mb-6 pb-6 border-b border-gray-200">
        <Avatar
          src={avatarUrl}
          alt={patientName}
          fallback={patientName}
          size="lg"
          className="mb-4"
        />
        <h3 className="text-2xl font-bold text-text-primary mb-1">{patientName}</h3>
        <p className="text-sm text-text-secondary">Patient Profile</p>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
            Personal Information
          </h4>
          <div className="grid grid-cols-2 gap-3">
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
        </div>

        {(email || phone || address) && (
          <div>
            <h4 className="text-sm font-semibold text-text-secondary mb-3 uppercase tracking-wide">
              Contact Information
            </h4>
            <div className="space-y-3">
              {email && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 text-text-secondary" />
                  <div>
                    <p className="text-xs text-text-secondary mb-0.5">Email</p>
                    <p className="text-sm font-medium text-text-primary">{email}</p>
                  </div>
                </div>
              )}
              {phone && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 text-text-secondary" />
                  <div>
                    <p className="text-xs text-text-secondary mb-0.5">Phone</p>
                    <p className="text-sm font-medium text-text-primary">{phone}</p>
                  </div>
                </div>
              )}
              {address && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-text-secondary" />
                  <div>
                    <p className="text-xs text-text-secondary mb-0.5">Address</p>
                    <p className="text-sm font-medium text-text-primary">{address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSummarySection;

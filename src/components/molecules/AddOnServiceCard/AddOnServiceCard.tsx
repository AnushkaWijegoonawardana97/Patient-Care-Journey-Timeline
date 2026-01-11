import * as React from "react";
import type { AddOnService } from "@/types/addOnServices";
import { Badge } from "@/components/atoms/Badge/Badge";
import { cn } from "@/lib/utils";

export interface AddOnServiceCardProps {
  service: AddOnService;
  className?: string;
}

export const AddOnServiceCard: React.FC<AddOnServiceCardProps> = ({ service, className }) => {
  const isComingSoon = service.status === "coming_soon";

  return (
    <div className={cn("bg-white rounded-xl p-5 shadow-sm border border-gray-100", className)}>
      {/* Image Placeholder */}
      <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
        <img
          src="/login-page-image.jpg"
          alt={service.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Service Name */}
      <h3 className="text-base font-bold text-text-primary mb-0.5">{service.name}</h3>

      {/* Status Badge */}
      <div className="mb-4">
        <Badge
          variant="outline"
          className={
            isComingSoon
              ? "bg-tertiary-info text-primary-dark border-0 text-xs"
              : "bg-secondary-light text-secondary-emphasis border-0 text-xs"
          }
        >
          {isComingSoon ? "Coming Soon" : "Optional Add-On"}
        </Badge>
      </div>

      {/* Description */}
      <div>
        <p className="text-xs text-text-secondary italic mb-0.5">Description</p>
        <p className="text-sm text-text-primary leading-relaxed">{service.description}</p>
      </div>
    </div>
  );
};

export default AddOnServiceCard;

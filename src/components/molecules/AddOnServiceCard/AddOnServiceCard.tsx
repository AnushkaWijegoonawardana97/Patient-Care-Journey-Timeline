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
    <div
      className={cn(
        "bg-white dark:bg-card rounded-xl shadow-sm border border-gray-100 dark:border-border",
        // Mobile: horizontal layout
        "flex flex-row gap-4 p-4",
        // Desktop: vertical layout
        "md:flex-col md:gap-0 md:p-5",
        className
      )}
    >
      {/* Image - smaller on mobile, full width on desktop */}
      <div className="w-20 h-20 flex-shrink-0 md:w-full md:h-auto md:aspect-square md:mb-4 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={service.imageUrl || "/login-page-image.jpg"}
          alt={service.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Service Name */}
        <h3 className="text-sm md:text-base font-bold text-text-primary dark:text-card-foreground mb-0.5 truncate">
          {service.name}
        </h3>

        {/* Status Badge */}
        <div className="mb-2 md:mb-4">
          <Badge
            variant="outline"
            className={
              isComingSoon
                ? "bg-tertiary-info dark:bg-tertiary-info/20 text-primary-dark dark:text-tertiary-info border-0 text-xs"
                : "bg-secondary-light dark:bg-secondary-success/20 text-secondary-emphasis dark:text-secondary-accent border-0 text-xs"
            }
          >
            {isComingSoon ? "Coming Soon" : "Optional Add-On"}
          </Badge>
        </div>

        {/* Description - compact on mobile, full on desktop */}
        <div>
          {/* Label only shown on desktop */}
          <p className="hidden md:block text-xs text-text-secondary dark:text-muted-foreground italic mb-0.5">Description</p>
          {/* Description text - truncated on mobile, full on desktop */}
          <p className="text-xs md:text-sm text-text-primary dark:text-card-foreground leading-relaxed line-clamp-2 md:line-clamp-none">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddOnServiceCard;

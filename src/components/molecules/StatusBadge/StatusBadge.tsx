import * as React from "react";
import type { VisitStatus } from "@/types/journey";
import { getStatusIcon, formatStatusLabel, getStatusBadgeStyles } from "@/utils/visit.utils";
import { cn } from "@/lib/utils";

export interface StatusBadgeProps {
  status: VisitStatus;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = "md",
  className,
}) => {
  const IconComponent = React.useMemo(() => getStatusIcon(status), [status]);
  const label = React.useMemo(() => formatStatusLabel(status), [status]);
  const badgeStyles = React.useMemo(() => getStatusBadgeStyles(status), [status]);

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs gap-1",
    md: "px-3 py-1.5 text-xs gap-1.5",
    lg: "px-4 py-2 text-sm gap-2",
  };

  const iconSizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md font-semibold border",
        sizeClasses[size],
        badgeStyles,
        className
      )}
    >
      <IconComponent className={iconSizeClasses[size]} />
      {label}
    </span>
  );
};

export default StatusBadge;

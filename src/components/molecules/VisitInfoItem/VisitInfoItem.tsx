import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface VisitInfoItemProps {
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
  label: string;
  value: React.ReactNode;
  secondaryValue?: React.ReactNode;
  className?: string;
}

export const VisitInfoItem: React.FC<VisitInfoItemProps> = ({
  icon: Icon,
  iconBg = "bg-primary-light",
  iconColor = "text-primary",
  label,
  value,
  secondaryValue,
  className,
}) => {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="flex-shrink-0 mt-0.5">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center shadow-sm",
            iconBg
          )}
        >
          <Icon className={cn("w-5 h-5", iconColor)} />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-secondary mb-1">{label}</p>
        <div className="text-base text-text-primary">{value}</div>
        {secondaryValue && (
          <p className="text-sm text-text-secondary mt-1">{secondaryValue}</p>
        )}
      </div>
    </div>
  );
};

export default VisitInfoItem;

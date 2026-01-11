import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SummaryCardProps {
  title: string;
  value: string | React.ReactNode;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  className?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor = "text-primary",
  className,
}) => {
  return (
    <div
      className={cn(
        "rounded-lg bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <div className="mt-2">
            {typeof value === "string" ? (
              <p className="text-2xl font-bold text-text-primary">{value}</p>
            ) : (
              value
            )}
          </div>
          {description && (
            <p className="mt-1 text-xs text-text-secondary">{description}</p>
          )}
        </div>
        {Icon && (
          <div className={cn("ml-4", iconColor)}>
            <Icon className="h-8 w-8" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;

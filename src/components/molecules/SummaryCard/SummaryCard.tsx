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
        "rounded-xl bg-white dark:bg-gray-800/50 p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 overflow-hidden",
        "bg-gradient-to-br from-white via-primary-light/3 to-secondary-light/3 dark:from-gray-800/50 dark:via-gray-800/30 dark:to-gray-800/50",
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-text-secondary dark:text-gray-400 uppercase tracking-wide mb-3">
            {title}
          </p>
          <div className="mt-2">
            {typeof value === "string" ? (
              <p className="text-2xl font-bold text-text-primary dark:text-white">{value}</p>
            ) : (
              value
            )}
          </div>
          {description && (
            <p className="mt-2 text-xs text-text-secondary dark:text-gray-400">{description}</p>
          )}
        </div>
        {Icon && (
          <div className="flex-shrink-0">
            <div className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center shadow-md",
              iconColor === "text-primary" ? "bg-gradient-to-br from-primary-light to-primary/20 dark:from-primary/30 dark:to-primary/20" :
              iconColor === "text-secondary-success" ? "bg-gradient-to-br from-secondary-light to-secondary-success/20 dark:from-secondary-success/40 dark:to-secondary-success/30" :
              "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600"
            )}>
              <Icon className={cn(
                "h-6 w-6",
                iconColor,
                iconColor === "text-primary" ? "dark:text-primary" :
                iconColor === "text-secondary-success" ? "dark:text-secondary-success" :
                "dark:text-gray-300"
              )} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;

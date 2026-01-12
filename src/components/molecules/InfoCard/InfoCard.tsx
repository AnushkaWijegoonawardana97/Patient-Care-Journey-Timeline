import * as React from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InfoCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconBgColor?: string;
  iconColor?: string;
  className?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  icon: Icon,
  label,
  value,
  iconBgColor = "bg-gray-100",
  iconColor = "text-text-primary",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-muted rounded-lg",
        className
      )}
    >
      <div
        className={cn("w-8 h-8 rounded-full flex items-center justify-center mb-1.5", iconBgColor)}
      >
        <Icon className={cn("h-4 w-4", iconColor)} />
      </div>
      <div>
        <p className="text-xs text-text-secondary dark:text-muted-foreground mb-0.5">{label}</p>
        <p className="text-xs font-semibold text-text-primary dark:text-card-foreground">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;

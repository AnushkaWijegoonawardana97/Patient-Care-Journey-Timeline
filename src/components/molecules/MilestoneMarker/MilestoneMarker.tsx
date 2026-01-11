import * as React from "react";
import { Baby, Calendar, Heart, Sparkles, type LucideIcon } from "lucide-react";
import type { Milestone, MilestoneType } from "@/types/journey";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface MilestoneMarkerProps {
  milestone: Milestone;
  isLast?: boolean;
}

const milestoneConfig: Record<
  MilestoneType,
  {
    icon: LucideIcon;
    gradient: string;
    iconBg: string;
    iconColor: string;
    badgeColor: string;
    badgeText: string;
  }
> = {
  trimester: {
    icon: Baby,
    gradient: "from-blue-50 via-indigo-50 to-purple-50",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    iconColor: "text-white",
    badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    badgeText: "Milestone",
  },
  due_date: {
    icon: Calendar,
    gradient: "from-emerald-50 via-green-50 to-teal-50",
    iconBg: "bg-gradient-to-br from-emerald-500 to-green-600",
    iconColor: "text-white",
    badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    badgeText: "Due Date",
  },
  postpartum_week: {
    icon: Heart,
    gradient: "from-pink-50 via-rose-50 to-fuchsia-50",
    iconBg: "bg-gradient-to-br from-pink-500 to-rose-600",
    iconColor: "text-white",
    badgeColor: "bg-pink-100 text-pink-700 border-pink-200",
    badgeText: "Postpartum",
  },
  custom: {
    icon: Sparkles,
    gradient: "from-amber-50 via-yellow-50 to-orange-50",
    iconBg: "bg-gradient-to-br from-amber-500 to-orange-600",
    iconColor: "text-white",
    badgeColor: "bg-amber-100 text-amber-700 border-amber-200",
    badgeText: "Milestone",
  },
};

export const MilestoneMarker: React.FC<MilestoneMarkerProps> = ({ milestone, isLast = false }) => {
  const config = milestoneConfig[milestone.type] || milestoneConfig.custom;
  const Icon = config.icon;

  return (
    <div className="relative pl-12 pb-8">
      {/* Timeline connector line */}
      {!isLast && (
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 to-transparent -translate-x-1/2" />
      )}

      {/* Celebratory icon marker */}
      <div className="absolute left-6 top-2 -translate-x-1/2 z-10">
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shadow-lg", config.iconBg)}>
          <Icon className={cn("w-6 h-6", config.iconColor)} />
        </div>
        {/* Decorative sparkle effect */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full opacity-75 animate-pulse" />
      </div>

      {/* Milestone card */}
      <div
        className={cn(
          "ml-4 rounded-xl border-2 shadow-md overflow-hidden transition-all hover:shadow-lg",
          `bg-gradient-to-br ${config.gradient}`,
          "border-white/50"
        )}
      >
        <div className="p-4">
          {/* Badge and date row */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold border",
                config.badgeColor
              )}
            >
              {config.badgeText}
            </span>
            <span className="text-xs font-medium text-text-secondary">
              {format(new Date(milestone.date), "MMM d, yyyy")}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-text-primary mb-1">{milestone.title}</h3>

          {/* Description */}
          {milestone.description && (
            <p className="text-sm text-text-secondary leading-relaxed">{milestone.description}</p>
          )}

          {/* Celebration decoration */}
          <div className="flex items-center gap-1 mt-3 pt-3 border-t border-white/50">
            <Sparkles className="w-4 h-4 text-yellow-500" />
            <span className="text-xs font-medium text-text-secondary italic">
              A special moment in your journey
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneMarker;

import * as React from "react";
import { Baby, Calendar, Heart, Sparkles, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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
  const shouldReduceMotion = useReducedMotion();
  const config = milestoneConfig[milestone.type] || milestoneConfig.custom;
  const Icon = config.icon;

  const markerVariants = React.useMemo(
    () => ({
      hidden: {
        opacity: shouldReduceMotion ? 1 : 0,
        y: shouldReduceMotion ? 0 : 20,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0 : 0.4,
          ease: "easeOut" as const,
        },
      },
    }),
    [shouldReduceMotion]
  );

  const pulseVariants = React.useMemo(
    () => ({
      animate: {
        scale: shouldReduceMotion ? 1 : [1, 1.1, 1],
        opacity: shouldReduceMotion ? 0.75 : [0.75, 1, 0.75],
        transition: {
          duration: shouldReduceMotion ? 0 : 2,
          repeat: Infinity,
          ease: "easeInOut" as const,
        },
      },
    }),
    [shouldReduceMotion]
  );

  return (
    <article className="relative pl-12 pb-8" aria-labelledby={`milestone-${milestone.id}-title`}>
      {/* Timeline connector line */}
      {!isLast && (
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 dark:from-gray-600 to-transparent -translate-x-1/2" aria-hidden="true" />
      )}

      {/* Celebratory icon marker */}
      <motion.div
        className="absolute left-6 top-2 -translate-x-1/2 z-10"
        aria-hidden="true"
        variants={markerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center shadow-lg", config.iconBg)}>
          <Icon className={cn("w-6 h-6", config.iconColor)} aria-hidden="true" />
        </div>
        {/* Decorative sparkle effect */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 dark:bg-yellow-400 rounded-full opacity-75 dark:opacity-90"
          aria-hidden="true"
          variants={pulseVariants}
          animate="animate"
        />
      </motion.div>

      {/* Milestone card */}
      <motion.div
        className={cn(
          "ml-4 rounded-xl border-2 shadow-md overflow-hidden",
          `bg-gradient-to-br ${config.gradient}`,
          "border-white/50 dark:border-gray-700/50",
          "dark:from-gray-800/80 dark:via-gray-800/60 dark:to-gray-800/80"
        )}
        variants={markerVariants}
        initial="hidden"
        animate="visible"
        whileHover={shouldReduceMotion ? undefined : { boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.2 }}
      >
        <div className="p-4">
          {/* Badge and date row */}
          <div className="flex items-center justify-between mb-3">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-xs font-semibold border",
                config.badgeColor,
                "dark:bg-opacity-20 dark:text-opacity-90 dark:border-opacity-30"
              )}
            >
              {config.badgeText}
            </span>
            <time dateTime={milestone.date} className="text-xs font-medium text-text-secondary dark:text-gray-300">
              {format(new Date(milestone.date), "MMM d, yyyy")}
            </time>
          </div>

          {/* Title */}
          <h3 id={`milestone-${milestone.id}-title`} className="text-lg font-bold text-text-primary dark:text-white mb-1">{milestone.title}</h3>

          {/* Description */}
          {milestone.description && (
            <p className="text-sm text-text-secondary dark:text-gray-300 leading-relaxed">{milestone.description}</p>
          )}

          {/* Celebration decoration */}
          <div className="flex items-center gap-1 mt-3 pt-3 border-t border-white/50 dark:border-gray-700/50" aria-hidden="true">
            <Sparkles className="w-4 h-4 text-yellow-500 dark:text-yellow-400" aria-hidden="true" />
            <span className="text-xs font-medium text-text-secondary dark:text-gray-400 italic">
              A special moment in your journey
            </span>
          </div>
        </div>
      </motion.div>
    </article>
  );
};

export default MilestoneMarker;

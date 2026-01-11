import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  X,
  type LucideIcon,
} from "lucide-react";
import type { VisitStatus } from "@/types/journey";

export interface VisitStatusConfig {
  border: string;
  gradient: string;
  bg: string;
  markerBg: string;
  iconComponent: LucideIcon;
  iconColor: string;
  badge: string;
}

export const VISIT_STATUS_CONFIG: Record<VisitStatus, VisitStatusConfig> = {
  completed: {
    border: "border-l-secondary-success",
    gradient: "from-emerald-50/50 to-green-50/30",
    bg: "bg-gradient-to-br from-emerald-50/50 to-green-50/30",
    markerBg: "bg-gradient-to-br from-emerald-500 to-green-600",
    iconComponent: CheckCircle2,
    iconColor: "text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
  },
  scheduled: {
    border: "border-l-primary",
    gradient: "from-blue-50/50 to-indigo-50/30",
    bg: "bg-gradient-to-br from-blue-50/50 to-indigo-50/30",
    markerBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    iconComponent: Calendar,
    iconColor: "text-blue-600",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
  },
  available: {
    border: "border-l-gray-300",
    gradient: "from-gray-50/50 to-slate-50/30",
    bg: "bg-gradient-to-br from-gray-50/50 to-slate-50/30",
    markerBg: "bg-gradient-to-br from-gray-400 to-slate-500",
    iconComponent: Circle,
    iconColor: "text-gray-500",
    badge: "bg-gray-100 text-gray-700 border-gray-200",
  },
  missed: {
    border: "border-l-tertiary-error",
    gradient: "from-red-50/50 to-rose-50/30",
    bg: "bg-gradient-to-br from-red-50/50 to-rose-50/30",
    markerBg: "bg-gradient-to-br from-red-500 to-rose-600",
    iconComponent: Clock,
    iconColor: "text-red-600",
    badge: "bg-red-100 text-red-700 border-red-200",
  },
  cancelled: {
    border: "border-l-gray-400",
    gradient: "from-gray-50/50 to-slate-50/30",
    bg: "bg-gradient-to-br from-gray-50/50 to-slate-50/30",
    markerBg: "bg-gradient-to-br from-gray-400 to-slate-500",
    iconComponent: X,
    iconColor: "text-gray-500",
    badge: "bg-gray-100 text-gray-700 border-gray-200",
  },
};

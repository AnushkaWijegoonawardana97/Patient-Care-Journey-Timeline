import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavigationItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  active?: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({
  icon: Icon,
  label,
  to,
  active = false,
}) => {
  const location = useLocation();
  const isActive = active || location.pathname === to;

  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
        isActive
          ? "bg-primary-light text-primary"
          : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
      )}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-primary" : "")} />
      <span>{label}</span>
    </Link>
  );
};

export default NavigationItem;

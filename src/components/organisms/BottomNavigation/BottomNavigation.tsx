import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface BottomNavigationProps {
  activeNavItem?: string;
}

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: Calendar, label: "Care Journey", to: "/care-journey" },
  { icon: PlusCircle, label: "Add-On", to: "/add-on-services" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeNavItem = "Dashboard",
}) => {
  const location = useLocation();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-card border-t border-gray-200 dark:border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navigationItems.map((item) => {
          const isActive =
            activeNavItem === item.label || location.pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                isActive
                  ? "text-secondary-success dark:text-secondary-success"
                  : "text-text-secondary dark:text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-secondary-success dark:text-secondary-success")} />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;

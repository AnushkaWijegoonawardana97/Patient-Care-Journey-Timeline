import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  Settings,
  Search,
  Bell,
  ChevronDown,
  LogOut,
} from "lucide-react";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { cn } from "@/lib/utils";

export interface TopNavigationProps {
  activeNavItem?: string;
  patientName?: string;
}

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: Calendar, label: "Care Journey", to: "/care-journey" },
  { icon: PlusCircle, label: "Add-On Services", to: "/add-on-services" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeNavItem = "Dashboard",
  patientName = "Patient",
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 container mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo-dark.png" alt="Raya Health" className="h-20 w-auto" />
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white rounded-lg px-2 py-1">
          {navigationItems.map((item) => {
            const isActive = activeNavItem === item.label || location.pathname === item.to;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary-success text-white"
                    : "text-text-secondary hover:bg-gray-100 hover:text-text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5 text-text-secondary" />
          </button>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5 text-text-secondary" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-tertiary-error rounded-full" />
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Avatar size="sm" fallback={patientName.charAt(0)} />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-text-primary">{patientName}</p>
                <p className="text-xs text-text-secondary">Patient ID</p>
              </div>
              <ChevronDown className="h-4 w-4 text-text-secondary" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-secondary hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;

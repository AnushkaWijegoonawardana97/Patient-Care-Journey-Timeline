import * as React from "react";
import { LayoutDashboard, Calendar, PlusCircle, Settings, Menu, X, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { NavigationItem } from "@/components/molecules/NavigationItem/NavigationItem";
import { cn } from "@/lib/utils";

export interface SidebarNavigationProps {
  activeNavItem?: string;
}

const navigationItems = [
  { icon: LayoutDashboard, label: "Dashboard", to: "/dashboard" },
  { icon: Calendar, label: "Care Journey", to: "/care-journey" },
  { icon: PlusCircle, label: "Add-On Services", to: "/add-on-services" },
  { icon: Settings, label: "Settings", to: "/settings" },
];

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  activeNavItem = "Dashboard",
}) => {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dummy logout - just navigate to login
    navigate("/");
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md hover:bg-gray-50"
        aria-label="Toggle menu"
      >
        {isMobileOpen ? (
          <X className="h-6 w-6 text-text-primary" />
        ) : (
          <Menu className="h-6 w-6 text-text-primary" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transition-transform duration-300",
          "lg:translate-x-0",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <img src="/logo.webp" alt="Raya Health" className="h-8 w-auto" />
            <span className="text-xl font-bold text-secondary-success">Raya Health</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navigationItems.map((item) => (
              <div key={item.to} onClick={() => setIsMobileOpen(false)}>
                <NavigationItem
                  icon={item.icon}
                  label={item.label}
                  to={item.to}
                  active={activeNavItem === item.label}
                />
              </div>
            ))}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-text-secondary hover:bg-gray-100 hover:text-text-primary transition-colors w-full"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>

        {/* Mobile Overlay */}
        {isMobileOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/20 z-30"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </aside>
    </>
  );
};

export default SidebarNavigation;

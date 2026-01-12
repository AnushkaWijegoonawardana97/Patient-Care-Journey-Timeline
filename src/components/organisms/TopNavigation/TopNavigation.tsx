import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  PlusCircle,
  Settings,
  ChevronDown,
  LogOut,
  Globe,
  Sun,
  Moon,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export interface TopNavigationProps {
  activeNavItem?: string;
  patientName?: string;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeNavItem,
  patientName = "Patient",
}) => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = React.useState(false);

  const navigationItems = [
    { icon: LayoutDashboard, label: t("navigation.dashboard"), to: "/dashboard", key: "dashboard" },
    { icon: Calendar, label: t("navigation.careJourney"), to: "/care-journey", key: "careJourney" },
    { icon: PlusCircle, label: t("navigation.addOnServices"), to: "/add-on-services", key: "addOnServices" },
    { icon: Settings, label: t("navigation.settings"), to: "/settings", key: "settings" },
  ];

  const languages = [
    { code: "en", name: t("common.english") },
    { code: "es", name: t("common.spanish") },
  ];

  const currentLanguage = i18n.language || "en";

  const handleLogout = () => {
    navigate("/");
  };

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowLanguageMenu(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-card border-b border-gray-200 dark:border-border">
      <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 container mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo-dark.png" alt="Raya Health" className="h-20 w-auto" />
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white dark:bg-card rounded-lg px-2 py-1">
          {navigationItems.map((item) => {
            const isActive = activeNavItem === item.key || location.pathname === item.to;
            const Icon = item.icon;

            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary-success text-white dark:bg-secondary-success dark:text-white"
                    : "text-text-secondary dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted hover:text-text-primary dark:hover:text-card-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-muted transition-colors"
              aria-label={t("common.changeLanguage")}
              title={t("common.language")}
            >
              <Globe className="h-5 w-5 text-text-secondary dark:text-muted-foreground" />
            </button>

            {/* Language Dropdown Menu */}
            {showLanguageMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowLanguageMenu(false)} />
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-card rounded-lg shadow-lg border border-gray-200 dark:border-border py-1 z-20">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang.code)}
                      className={cn(
                        "w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors text-left",
                        currentLanguage === lang.code
                          ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-medium"
                          : "text-text-secondary dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted"
                      )}
                    >
                      <span>{lang.name}</span>
                      {currentLanguage === lang.code && (
                        <span className="ml-auto text-primary dark:text-primary">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-muted transition-colors"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <Sun className="h-5 w-5 text-text-secondary dark:text-muted-foreground" />
            ) : (
              <Moon className="h-5 w-5 text-text-secondary dark:text-muted-foreground" />
            )}
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-muted transition-colors"
            >
              <Avatar
                src="/patient-avatar.jpg"
                size="sm"
                alt={patientName}
                fallback={patientName.charAt(0)}
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-medium text-text-primary dark:text-card-foreground">
                  {patientName}
                </p>
                <p className="text-xs text-text-secondary dark:text-muted-foreground">
                  {t("navigation.patientId")}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-text-secondary dark:text-muted-foreground" />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-card rounded-lg shadow-lg border border-gray-200 dark:border-border py-1 z-20">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-text-secondary dark:text-muted-foreground hover:bg-gray-100 dark:hover:bg-muted transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t("navigation.logout")}</span>
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

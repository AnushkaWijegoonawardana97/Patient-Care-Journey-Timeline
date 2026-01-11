import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
          {theme === "light" ? (
            <Sun className="w-5 h-5 text-primary" />
          ) : (
            <Moon className="w-5 h-5 text-primary" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">Theme</p>
          <p className="text-xs text-text-secondary">Choose your preferred theme</p>
        </div>
      </div>
      <button
        onClick={toggleTheme}
        className={cn(
          "relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          theme === "dark" ? "bg-primary" : "bg-gray-300"
        )}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        role="switch"
        aria-checked={theme === "dark"}
      >
        <span
          className={cn(
            "inline-block h-6 w-6 transform rounded-full bg-white transition-transform shadow-sm",
            theme === "dark" ? "translate-x-7" : "translate-x-1"
          )}
        >
          <span className="flex h-full w-full items-center justify-center">
            {theme === "light" ? (
              <Sun className="h-3.5 w-3.5 text-gray-600" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-primary" />
            )}
          </span>
        </span>
      </button>
    </div>
  );
};

export default ThemeToggle;

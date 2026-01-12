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
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
          {theme === "light" ? (
            <Sun className="w-5 h-5 text-primary dark:text-primary" />
          ) : (
            <Moon className="w-5 h-5 text-primary dark:text-primary" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary dark:text-white mb-0.5">Theme</p>
          <p className="text-xs text-text-secondary dark:text-gray-400">Choose your preferred theme</p>
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

import * as React from "react";
import { Globe, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LanguageToggleProps {
  className?: string;
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
];

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const [currentLanguage] = React.useState("en");
  const currentLangName = languages.find((lang) => lang.code === currentLanguage)?.name || "English";

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100/80 to-gray-200/40 dark:from-muted/20 dark:to-muted/10 flex items-center justify-center">
          <Globe className="w-5 h-5 text-text-secondary dark:text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary dark:text-white mb-0.5">Language</p>
          <p className="text-xs text-text-secondary dark:text-gray-400">Display only (coming soon)</p>
        </div>
      </div>
      <div className="relative">
        <button
          disabled
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800",
            "text-sm font-medium text-text-secondary dark:text-gray-400 cursor-not-allowed opacity-60"
          )}
          aria-label="Language selector (display only)"
          aria-disabled="true"
        >
          <span>{currentLangName}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="absolute top-full mt-1 right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 opacity-0 pointer-events-none">
          {languages.map((lang) => (
            <div
              key={lang.code}
              className="px-4 py-2 text-sm text-text-secondary dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-not-allowed"
            >
              {lang.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageToggle;

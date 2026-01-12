import * as React from "react";
import { Globe, ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import { cn } from "@/lib/utils";

export interface LanguageToggleProps {
  className?: string;
}

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
];

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const { t } = useTranslation();
  const [showMenu, setShowMenu] = React.useState(false);
  const currentLanguage = i18n.language || "en";
  const currentLangName = languages.find((lang) => lang.code === currentLanguage)?.name || "English";

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setShowMenu(false);
  };

  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-gray-100/80 to-gray-200/40 dark:from-muted/20 dark:to-muted/10 flex items-center justify-center">
          <Globe className="w-5 h-5 text-text-secondary dark:text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary dark:text-white mb-0.5">
            {t("common.language")}
          </p>
        </div>
      </div>
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700",
            "bg-white dark:bg-gray-800 text-sm font-medium text-text-primary dark:text-white",
            "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          )}
          aria-label={t("common.changeLanguage")}
        >
          <span>{currentLangName}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {showMenu && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
            <div className="absolute top-full mt-1 right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg py-1 z-20">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={cn(
                    "w-full flex items-center gap-2 px-4 py-2 text-sm transition-colors text-left",
                    currentLanguage === lang.code
                      ? "bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary font-medium"
                      : "text-text-secondary dark:text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-700"
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
    </div>
  );
};

export default LanguageToggle;

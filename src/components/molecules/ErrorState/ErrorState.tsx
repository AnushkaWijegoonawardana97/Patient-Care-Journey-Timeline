import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/atoms/Button/Button";
import { cn } from "@/lib/utils";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
  retryLabel,
  className,
}) => {
  const { t } = useTranslation();
  const displayTitle = title || t("errors.generic");
  const displayMessage = message || t("errors.genericMessage");
  const displayRetryLabel = retryLabel || t("common.buttons.tryAgain");
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4",
        className
      )}
    >
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
      </div>
      <h2 className="text-xl font-bold text-text-primary dark:text-card-foreground mb-2 text-center">
        {displayTitle}
      </h2>
      <p className="text-text-secondary dark:text-muted-foreground text-center mb-6 max-w-md">{displayMessage}</p>
      {onRetry && (
        <Button onClick={onRetry} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          {displayRetryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;

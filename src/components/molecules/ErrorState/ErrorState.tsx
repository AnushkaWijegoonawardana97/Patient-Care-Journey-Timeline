import * as React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
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
  title = "Something went wrong",
  message = "We couldn't load the data. Please check your connection and try again.",
  onRetry,
  retryLabel = "Try Again",
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4",
        className
      )}
    >
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-red-600" />
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2 text-center">
        {title}
      </h2>
      <p className="text-text-secondary text-center mb-6 max-w-md">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4" />
          {retryLabel}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;

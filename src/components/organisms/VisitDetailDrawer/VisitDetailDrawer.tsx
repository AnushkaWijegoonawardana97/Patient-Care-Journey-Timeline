import * as React from "react";
import { X, Calendar, Clock, User, FileText, CheckCircle2 } from "lucide-react";
import type { Visit } from "@/types/journey";
import { format } from "date-fns";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { StatusBadge } from "@/components/molecules/StatusBadge/StatusBadge";
import { VisitInfoItem } from "@/components/molecules/VisitInfoItem/VisitInfoItem";
import { getVisitTitle } from "@/utils/visit.utils";
import { VISIT_STATUS_CONFIG } from "@/utils/visit.constants";
import { cn } from "@/lib/utils";

export interface VisitDetailDrawerProps {
  visit: Visit | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VisitDetailDrawer: React.FC<VisitDetailDrawerProps> = ({ visit, isOpen, onClose }) => {
  const statusConfig = React.useMemo(() => {
    if (!visit) return null;
    return VISIT_STATUS_CONFIG[visit.status];
  }, [visit?.status]);

  const visitTitle = React.useMemo(() => {
    if (!visit) return "";
    return getVisitTitle(visit);
  }, [visit]);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!visit || !isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="visit-detail-title"
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto">
            {/* Visit Header Section with Background Image */}
            <div className={cn("relative p-8 border-b overflow-hidden", "border-gray-200")}>
              {/* Background Image with Overlay */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: "url('/overnight-doula-image.jpg')",
                }}
                aria-hidden="true"
              />
              {/* Gradient Overlay for Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />
              {/* Subtle Pattern Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] opacity-30" />

              {/* Close Button - Top Right */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary/50 shadow-lg"
                aria-label="Close drawer"
              >
                <X className="h-5 w-5 text-text-primary" />
              </button>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex flex-col items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3
                      id="visit-detail-title"
                      className="text-3xl font-bold text-white mb-3 drop-shadow-lg"
                    >
                      {visitTitle}
                    </h3>
                    {visit.type === "prenatal_postpartum" && (
                      <p className="text-base text-white/90 mb-4 font-medium">
                        Visit {visit.visitNumber} of {visit.totalOfType}
                      </p>
                    )}
                  </div>
                  <StatusBadge
                    status={visit.status}
                    size="md"
                    className="bg-white/95 backdrop-blur-sm"
                  />
                </div>

                {/* Decorative Elements */}
                <div className="flex items-center gap-2 mt-6">
                  <div className="h-1 w-12 bg-white/60 rounded-full" />
                  <div className="h-1 w-8 bg-white/40 rounded-full" />
                  <div className="h-1 w-4 bg-white/30 rounded-full" />
                </div>
              </div>
            </div>

            {/* Visit Information Section */}
            <div className="p-6 lg:p-8 space-y-5 bg-gradient-to-b from-white to-gray-50/30 dark:from-gray-900 dark:to-gray-800/50">
              {visit.scheduledDate && (
                <VisitInfoItem
                  icon={Calendar}
                  iconBg="bg-gradient-to-br from-blue-500 to-indigo-600"
                  iconColor="text-white"
                  label="Scheduled Date"
                  value={
                    <time dateTime={visit.scheduledDate}>
                      {format(new Date(visit.scheduledDate), "EEEE, MMMM d, yyyy")}
                    </time>
                  }
                  secondaryValue={
                    <time dateTime={visit.scheduledDate}>
                      {format(new Date(visit.scheduledDate), "h:mm a")}
                    </time>
                  }
                />
              )}

              {visit.completedDate && (
                <VisitInfoItem
                  icon={CheckCircle2}
                  iconBg="bg-gradient-to-br from-emerald-500 to-green-600"
                  iconColor="text-white"
                  label="Completed Date"
                  value={
                    <time dateTime={visit.completedDate}>
                      {format(new Date(visit.completedDate), "EEEE, MMMM d, yyyy")}
                    </time>
                  }
                  secondaryValue={
                    <time dateTime={visit.completedDate}>
                      {format(new Date(visit.completedDate), "h:mm a")}
                    </time>
                  }
                />
              )}

              {visit.durationMinutes && (
                <VisitInfoItem
                  icon={Clock}
                  iconBg="bg-gradient-to-br from-blue-500 to-indigo-600"
                  iconColor="text-white"
                  label="Duration"
                  value={`${visit.durationMinutes} minutes`}
                />
              )}
            </div>

            {/* Doula Section */}
            {visit.doula && (
              <div className="px-6 lg:px-8 py-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-text-primary dark:text-white">Your Care Provider</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">Assigned Doula</p>
                  </div>
                </div>
                <div
                  className={cn(
                    "rounded-2xl border-2 p-5 shadow-md transition-all hover:shadow-lg",
                    "bg-gradient-to-br",
                    statusConfig?.gradient || "from-purple-50/50 to-pink-50/30",
                    "border-purple-200/50 dark:border-purple-800/30",
                    "dark:from-purple-900/30 dark:to-pink-900/20"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={visit.doula.photo || "/doula-avatar.JPG"}
                      alt={visit.doula.name}
                      fallback={visit.doula.name}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-semibold text-text-primary dark:text-white mb-1">
                        {visit.doula.name}
                      </p>
                      {visit.doula.languages.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="text-xs font-medium text-text-secondary dark:text-gray-400">
                            Languages:
                          </span>
                          {visit.doula.languages.map((lang: string, index: number) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-text-primary dark:text-gray-300 shadow-sm"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Notes Section */}
            {visit.notes && (
              <div className="px-6 lg:px-8 pt-6 pb-6 border-t border-gray-200 dark:border-gray-700 bg-gradient-to-b from-gray-50/30 to-white dark:from-gray-800/50 dark:to-gray-900">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-text-primary dark:text-white">Visit Notes</p>
                    <p className="text-xs text-text-secondary dark:text-gray-400">
                      Important information from your visit
                    </p>
                  </div>
                </div>
                <div
                  className={cn(
                    "rounded-2xl border-2 p-5 shadow-md",
                    "bg-gradient-to-br",
                    statusConfig?.gradient || "from-blue-50/50 to-indigo-50/30",
                    "border-blue-200/50 dark:border-blue-800/30",
                    "dark:from-blue-900/30 dark:to-indigo-900/20"
                  )}
                >
                  <p className="text-sm text-text-primary dark:text-gray-200 leading-relaxed whitespace-pre-wrap">
                    {visit.notes}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitDetailDrawer;

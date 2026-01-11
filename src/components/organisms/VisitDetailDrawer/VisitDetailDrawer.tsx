import * as React from "react";
import {
  X,
  Calendar,
  Clock,
  User,
  FileText,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import type { Visit } from "@/types/journey";
import { format } from "date-fns";
import { Button } from "@/components/atoms/Button/Button";
import { Avatar } from "@/components/atoms/Avatar/Avatar";
import { cn } from "@/lib/utils";

export interface VisitDetailDrawerProps {
  visit: Visit | null;
  isOpen: boolean;
  onClose: () => void;
}

const getVisitTitle = (visit: Visit): string => {
  switch (visit.type) {
    case "initial":
      return "Initial Consultation";
    case "labor_delivery":
      return "Labor & Delivery";
    case "pregnancy_loss":
      return "Pregnancy Loss Support";
    case "extended_postpartum":
      return `Extended Postpartum Visit ${visit.visitNumber}`;
    case "additional_postpartum":
      return `Additional Postpartum Visit ${visit.visitNumber}`;
    default:
      return `Prenatal/Postpartum Visit ${visit.visitNumber} of ${visit.totalOfType}`;
  }
};

const getStatusLabel = (status: Visit["status"]): string => {
  switch (status) {
    case "completed":
      return "Completed";
    case "scheduled":
      return "Scheduled";
    case "available":
      return "Available";
    case "missed":
      return "Missed";
    case "cancelled":
      return "Cancelled";
  }
};

const getStatusIcon = (status: Visit["status"]) => {
  switch (status) {
    case "completed":
      return <CheckCircle2 className="w-4 h-4" />;
    case "scheduled":
      return <Calendar className="w-4 h-4" />;
    case "available":
      return <Circle className="w-4 h-4" />;
    case "missed":
      return <AlertCircle className="w-4 h-4" />;
    case "cancelled":
      return <X className="w-4 h-4" />;
  }
};

const getStatusBadgeStyles = (status: Visit["status"]) => {
  switch (status) {
    case "completed":
      return "bg-secondary-light text-secondary-emphasis border-secondary-success/20";
    case "scheduled":
      return "bg-primary-light text-primary border-primary/20";
    case "missed":
      return "bg-red-50 text-red-700 border-red-200";
    case "cancelled":
      return "bg-gray-100 text-gray-700 border-gray-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
};

export const VisitDetailDrawer: React.FC<VisitDetailDrawerProps> = ({ visit, isOpen, onClose }) => {
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
        className="fixed inset-0 bg-black/50 z-40 lg:bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={cn(
          "fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="visit-detail-title"
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gray-50/50">
            <h2 id="visit-detail-title" className="text-xl font-bold text-text-primary">
              Visit Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close drawer"
            >
              <X className="h-5 w-5 text-text-secondary" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="pb-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-text-primary mb-3">{getVisitTitle(visit)}</h3>
              {visit.type === "prenatal_postpartum" && (
                <p className="text-sm text-text-secondary mb-3">
                  Visit {visit.visitNumber} of {visit.totalOfType}
                </p>
              )}
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold border",
                    getStatusBadgeStyles(visit.status)
                  )}
                >
                  {getStatusIcon(visit.status)}
                  {getStatusLabel(visit.status)}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {visit.scheduledDate && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-secondary mb-1">Scheduled Date</p>
                    <p className="text-base text-text-primary">
                      {format(new Date(visit.scheduledDate), "EEEE, MMMM d, yyyy")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {format(new Date(visit.scheduledDate), "h:mm a")}
                    </p>
                  </div>
                </div>
              )}

              {visit.completedDate && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-10 h-10 rounded-lg bg-secondary-light flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-secondary-success" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-secondary mb-1">Completed Date</p>
                    <p className="text-base text-text-primary">
                      {format(new Date(visit.completedDate), "EEEE, MMMM d, yyyy")}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {format(new Date(visit.completedDate), "h:mm a")}
                    </p>
                  </div>
                </div>
              )}

              {visit.durationMinutes && (
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-10 h-10 rounded-lg bg-primary-light flex items-center justify-center">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-text-secondary mb-1">Duration</p>
                    <p className="text-base text-text-primary">{visit.durationMinutes} minutes</p>
                  </div>
                </div>
              )}
            </div>

            {visit.doula && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-text-secondary" />
                  <p className="text-sm font-semibold text-text-secondary">Assigned Doula</p>
                </div>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={visit.doula.photo}
                      alt={visit.doula.name}
                      fallback={visit.doula.name}
                      size="lg"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-lg font-semibold text-text-primary mb-1">
                        {visit.doula.name}
                      </p>
                      {visit.doula.languages.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-medium text-text-secondary">Languages:</span>
                          {visit.doula.languages.map((lang, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-white border border-gray-200 text-text-primary"
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

            {visit.notes && (
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-5 h-5 text-text-secondary" />
                  <p className="text-sm font-semibold text-text-secondary">Notes</p>
                </div>
                <div className="bg-primary-light/30 border border-primary-light rounded-lg p-4">
                  <p className="text-sm text-text-primary leading-relaxed">{visit.notes}</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 bg-gray-50/50">
            <Button onClick={onClose} className="w-full" variant="secondary">
              Close
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default VisitDetailDrawer;

import * as React from "react";
import { Activity, Bone, Moon, Hand, Heart, Target } from "lucide-react";
import { DashboardLayout } from "@/components/templates/DashboardLayout/DashboardLayout";
import { AddOnServiceCard } from "@/components/molecules/AddOnServiceCard/AddOnServiceCard";
import { LoadingSkeleton } from "@/components/molecules/LoadingSkeleton/LoadingSkeleton";
import { ErrorState } from "@/components/molecules/ErrorState/ErrorState";
import { useAddOnServices } from "@/hooks/useAddOnServices";
import { useAuth } from "@/hooks/useAuth";
import type { AddOnService } from "@/types/addOnServices";

/** Fallback services if API fails or for offline mode */
const FALLBACK_SERVICES: AddOnService[] = [
  {
    id: "acupuncture",
    name: "Acupuncture",
    icon: Activity,
    description:
      "Support your wellness journey with traditional acupuncture techniques designed to promote relaxation and balance.",
    status: "coming_soon",
  },
  {
    id: "chiropractic",
    name: "Chiropractic Care",
    icon: Bone,
    description:
      "Gentle chiropractic adjustments to help alleviate pregnancy-related discomfort and support natural alignment.",
    status: "coming_soon",
  },
  {
    id: "overnight-doula",
    name: "Overnight Doula Care",
    icon: Moon,
    description:
      "Receive additional support during overnight hours to help you rest and recover while ensuring your baby's needs are met.",
    status: "optional_addon",
  },
  {
    id: "prenatal-massage",
    name: "Prenatal Massage",
    icon: Hand,
    description:
      "Specialized massage therapy tailored for expectant mothers to reduce tension and promote relaxation.",
    status: "optional_addon",
  },
  {
    id: "postpartum-massage",
    name: "Postpartum Massage",
    icon: Heart,
    description:
      "Therapeutic massage designed to support your body's recovery after birth and ease muscle tension.",
    status: "optional_addon",
  },
  {
    id: "pelvic-floor-therapy",
    name: "Pelvic Floor Therapy",
    icon: Target,
    description:
      "Specialized support for pelvic health through gentle exercises to strengthen and restore function.",
    status: "coming_soon",
  },
];

export const AddOnServices: React.FC = () => {
  const { user } = useAuth();
  const { services, isLoading, isError, refetch } = useAddOnServices();

  // Use API services or fallback
  const displayServices = services && services.length > 0 ? services : FALLBACK_SERVICES;

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout activeNavItem="Add-On Services" patientName={user?.name || "User"}>
        <LoadingSkeleton variant="services" count={6} />
      </DashboardLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <DashboardLayout activeNavItem="Add-On Services" patientName={user?.name || "User"}>
        <ErrorState
          title="Unable to Load Services"
          message="We couldn't load the add-on services. Please check your connection and try again."
          onRetry={refetch}
        />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeNavItem="Add-On Services" patientName={user?.name || "Sarah"}>
      <div className="space-y-6 mt-6 lg:mt-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
            <Bone className="w-5 h-5 text-primary dark:text-primary" />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-text-primary dark:text-white">
              Add-On Services
            </h1>
            <p className="text-sm text-text-secondary dark:text-gray-400 mt-0.5">
              Optional services to enhance your care journey
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayServices.map((service) => (
            <AddOnServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddOnServices;

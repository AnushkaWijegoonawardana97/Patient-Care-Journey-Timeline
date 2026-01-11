import * as React from "react";
import { Activity, Bone, Moon, Hand, Heart, Target, AlertCircle, RefreshCw } from "lucide-react";
import { DashboardLayout } from "@/components/templates/DashboardLayout/DashboardLayout";
import { AddOnServiceCard } from "@/components/molecules/AddOnServiceCard/AddOnServiceCard";
import { Button } from "@/components/atoms/Button/Button";
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

/** Loading skeleton for services */
const ServicesLoadingSkeleton: React.FC = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-48 mb-6" />
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="w-full aspect-square bg-gray-200 rounded-lg mb-4" />
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-200 rounded w-full mb-1" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      ))}
    </div>
  </div>
);

/** Error state component */
const ServicesErrorState: React.FC<{ onRetry: () => void }> = ({ onRetry }) => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <AlertCircle className="w-8 h-8 text-red-600" />
    </div>
    <h2 className="text-xl font-bold text-text-primary mb-2">Unable to Load Services</h2>
    <p className="text-text-secondary text-center mb-6 max-w-md">
      We couldn't load the add-on services. Please check your connection and try again.
    </p>
    <Button onClick={onRetry} className="flex items-center gap-2">
      <RefreshCw className="w-4 h-4" />
      Try Again
    </Button>
  </div>
);

export const AddOnServices: React.FC = () => {
  const { user } = useAuth();
  const { services, isLoading, isError, refetch } = useAddOnServices();

  // Use API services or fallback
  const displayServices = services && services.length > 0 ? services : FALLBACK_SERVICES;

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout activeNavItem="Add-On Services" patientName={user?.name || "User"}>
        <div className="space-y-6">
          <ServicesLoadingSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  // Error state
  if (isError) {
    return (
      <DashboardLayout activeNavItem="Add-On Services" patientName={user?.name || "User"}>
        <ServicesErrorState onRetry={refetch} />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeNavItem="Add-On Services" patientName={user?.name || "Sarah"}>
      <div className="space-y-6">
        {/* Header */}
        <h1 className="text-xl font-bold text-text-primary">Add-On Services</h1>

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

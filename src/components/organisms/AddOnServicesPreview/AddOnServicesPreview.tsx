import * as React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AddOnServiceCard } from "@/components/molecules/AddOnServiceCard/AddOnServiceCard";
import { Button } from "@/components/atoms/Button/Button";
import type { AddOnService } from "@/types/addOnServices";

export interface AddOnServicesPreviewProps {
  services: AddOnService[];
}

export const AddOnServicesPreview: React.FC<AddOnServicesPreviewProps> = ({ services }) => {
  const previewServices = services.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text-primary">Additional Services</h2>
      </div>
      <p className="text-sm text-text-secondary mb-6">
        Enhance your care journey with these optional services.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {previewServices.map((service) => (
          <AddOnServiceCard key={service.id} service={service} />
        ))}
      </div>

      <Button asChild variant="secondary" className="w-full sm:w-auto">
        <Link to="/add-on-services" className="flex items-center justify-center gap-2">
          View All Add-On Services
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
};

export default AddOnServicesPreview;

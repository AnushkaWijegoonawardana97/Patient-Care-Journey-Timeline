import * as React from "react";
import { AddOnServiceCard } from "@/components/molecules/AddOnServiceCard/AddOnServiceCard";
import type { AddOnService } from "@/types/addOnServices";

export interface AddOnServicesOverviewProps {
  services: AddOnService[];
}

export const AddOnServicesOverview: React.FC<AddOnServicesOverviewProps> = ({ services }) => {
  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-text-primary mb-2">Additional Services</h2>
        <p className="text-text-secondary">
          Explore optional services that may enhance your care journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {services.map((service) => (
          <AddOnServiceCard key={service.id} service={service} />
        ))}
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm text-text-secondary text-center">
          <strong className="font-semibold text-text-primary">Note:</strong> These services may be
          available as optional add-ons in the future and are not included in your current care
          plan.
        </p>
      </div>
    </div>
  );
};

export default AddOnServicesOverview;

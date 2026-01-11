import apiClient from "./api";
import type { AddOnService } from "@/types/addOnServices";
import { toAddOnServices, type AddOnServiceDTO } from "@/dto/addOnServices.dto";

/** Add-on services service for fetching optional services */
export const addOnServicesService = {
  /** Get all available add-on services */
  async getAddOnServices(): Promise<AddOnService[]> {
    const response = await apiClient.get<AddOnServiceDTO[]>("/add-on-services");
    return toAddOnServices(response.data);
  },
};

export default addOnServicesService;

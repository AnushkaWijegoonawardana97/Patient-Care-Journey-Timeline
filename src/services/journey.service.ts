import apiClient from "./api";
import type { PatientJourney, Visit } from "@/types/journey";
import { toPatientJourney, toVisit, type PatientJourneyResponseDTO, type VisitDTO } from "@/dto/journey.dto";

/** Journey service for handling patient journey operations */
export const journeyService = {
  /** Get patient journey data including visits and milestones */
  async getPatientJourney(): Promise<PatientJourney> {
    const response = await apiClient.get<PatientJourneyResponseDTO>("/journey");
    return toPatientJourney(response.data);
  },

  /** Get specific visit details */
  async getVisitDetails(visitId: string): Promise<Visit> {
    const response = await apiClient.get<VisitDTO>(`/journey/visits/${visitId}`);
    return toVisit(response.data);
  },
};

export default journeyService;

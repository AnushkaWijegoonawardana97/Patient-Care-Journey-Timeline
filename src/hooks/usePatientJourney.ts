import { useQuery } from "@tanstack/react-query";
import { journeyService } from "@/services/journey.service";
import { queryKeys } from "@/lib/queryKeys";
import type { PatientJourney } from "@/types/journey";

interface UsePatientJourneyResult {
  journey: PatientJourney | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

/** Hook for fetching patient journey data */
export function usePatientJourney(): UsePatientJourneyResult {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.journey.patient(),
    queryFn: () => journeyService.getPatientJourney(),
    staleTime: 5 * 60 * 1000,
  });

  return {
    journey: data,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export default usePatientJourney;

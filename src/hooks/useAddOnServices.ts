import { useQuery } from "@tanstack/react-query";
import { addOnServicesService } from "@/services/addOnServices.service";
import { queryKeys } from "@/lib/queryKeys";
import type { AddOnService } from "@/types/addOnServices";

interface UseAddOnServicesResult {
  services: AddOnService[] | undefined;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => void;
}

/** Hook for fetching add-on services */
export function useAddOnServices(): UseAddOnServicesResult {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: queryKeys.addOnServices.list(),
    queryFn: () => addOnServicesService.getAddOnServices(),
    staleTime: 10 * 60 * 1000,
  });

  return {
    services: data,
    isLoading,
    isError,
    error,
    refetch,
  };
}

export default useAddOnServices;

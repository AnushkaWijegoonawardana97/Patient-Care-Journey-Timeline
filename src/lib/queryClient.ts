import { QueryClient } from "@tanstack/react-query";

/** Create and configure the QueryClient */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /** Retry failed requests up to 3 times */
      retry: 3,
      /** Keep data fresh for 5 minutes */
      staleTime: 5 * 60 * 1000,
      /** Cache data for 10 minutes */
      cacheTime: 10 * 60 * 1000,
      /** Don't refetch on window focus by default */
      refetchOnWindowFocus: false,
    },
    mutations: {
      /** Retry failed mutations once */
      retry: 1,
    },
  },
});

export default queryClient;

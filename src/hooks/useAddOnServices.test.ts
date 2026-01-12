import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAddOnServices } from './useAddOnServices';
import * as addOnServicesService from '@/services/addOnServices.service';
import type { AddOnService } from '@/types/addOnServices';

// Mock the add-on services service
vi.mock('@/services/addOnServices.service', () => ({
  addOnServicesService: {
    getAddOnServices: vi.fn(),
  },
}));

// Mock queryKeys
vi.mock('@/lib/queryKeys', () => ({
  queryKeys: {
    addOnServices: {
      list: () => ['addOnServices', 'list'],
    },
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const mockServices: AddOnService[] = [
  {
    id: 's_001',
    name: 'Lactation Support',
    description: 'Professional lactation consultation',
    image: '/lactation.jpg',
    status: 'available',
  },
  {
    id: 's_002',
    name: 'Mental Health Support',
    description: 'Counseling services',
    image: '/mental-health.jpg',
    status: 'coming_soon',
  },
];

const mockAddOnServicesService = addOnServicesService.addOnServicesService as {
  getAddOnServices: ReturnType<typeof vi.fn>;
};

describe('useAddOnServices', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return services data when query succeeds', async () => {
    mockAddOnServicesService.getAddOnServices.mockResolvedValue(mockServices);

    const { result } = renderHook(() => useAddOnServices(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.services).toEqual(mockServices);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockAddOnServicesService.getAddOnServices).toHaveBeenCalledTimes(1);
  });

  it('should return loading state during fetch', () => {
    mockAddOnServicesService.getAddOnServices.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useAddOnServices(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.services).toBeUndefined();
  });

  it('should return error state when query fails', async () => {
    const mockError = new Error('Failed to fetch services');
    mockAddOnServicesService.getAddOnServices.mockRejectedValue(mockError);

    const { result } = renderHook(() => useAddOnServices(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.services).toBeUndefined();
    expect(result.current.error).toBe(mockError);
    expect(result.current.isLoading).toBe(false);
  });

  it('should call addOnServicesService.getAddOnServices() correctly', async () => {
    mockAddOnServicesService.getAddOnServices.mockResolvedValue(mockServices);

    renderHook(() => useAddOnServices(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockAddOnServicesService.getAddOnServices).toHaveBeenCalled();
    });

    expect(mockAddOnServicesService.getAddOnServices).toHaveBeenCalledWith();
  });

  it('should handle refetch functionality', async () => {
    mockAddOnServicesService.getAddOnServices.mockResolvedValue(mockServices);

    const { result } = renderHook(() => useAddOnServices(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Clear previous calls
    mockAddOnServicesService.getAddOnServices.mockClear();

    // Call refetch
    result.current.refetch();

    await waitFor(() => {
      expect(mockAddOnServicesService.getAddOnServices).toHaveBeenCalled();
    });
  });
});

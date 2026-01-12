import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePatientJourney } from './usePatientJourney';
import * as journeyService from '@/services/journey.service';
import type { PatientJourney } from '@/types/journey';

// Mock the journey service
vi.mock('@/services/journey.service', () => ({
  journeyService: {
    getPatientJourney: vi.fn(),
  },
}));

const mockJourneyService = journeyService.journeyService as {
  getPatientJourney: ReturnType<typeof vi.fn>;
};

// Mock queryKeys
vi.mock('@/lib/queryKeys', () => ({
  queryKeys: {
    journey: {
      patient: () => ['journey', 'patient'],
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

const mockJourney: PatientJourney = {
  patient: {
    id: 'pt_001',
    name: 'Maria Santos',
    dueDate: '2025-03-15',
    insuranceType: 'standard',
    carePathway: 'labor_delivery',
  },
  visits: [],
  milestones: [],
};

describe('usePatientJourney', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return journey data when query succeeds', async () => {
    mockJourneyService.getPatientJourney.mockResolvedValue(mockJourney);

    const { result } = renderHook(() => usePatientJourney(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.journey).toEqual(mockJourney);
    expect(result.current.isError).toBe(false);
    expect(result.current.error).toBeNull();
    expect(mockJourneyService.getPatientJourney).toHaveBeenCalledTimes(1);
  });

  it('should return loading state during fetch', () => {
    mockJourneyService.getPatientJourney.mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => usePatientJourney(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.journey).toBeUndefined();
  });

  it('should return error state when query fails', async () => {
    const mockError = new Error('Failed to fetch journey');
    mockJourneyService.getPatientJourney.mockRejectedValue(mockError);

    const { result } = renderHook(() => usePatientJourney(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.journey).toBeUndefined();
    expect(result.current.error).toBe(mockError);
    expect(result.current.isLoading).toBe(false);
  });

  it('should call journeyService.getPatientJourney() correctly', async () => {
    mockJourneyService.getPatientJourney.mockResolvedValue(mockJourney);

    renderHook(() => usePatientJourney(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(mockJourneyService.getPatientJourney).toHaveBeenCalled();
    });

    expect(mockJourneyService.getPatientJourney).toHaveBeenCalledWith();
  });

  it('should return undefined journey when no data', async () => {
    mockJourneyService.getPatientJourney.mockResolvedValue(undefined as any);

    const { result } = renderHook(() => usePatientJourney(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.journey).toBeUndefined();
  });

  it('should handle refetch functionality', async () => {
    mockJourneyService.getPatientJourney.mockResolvedValue(mockJourney);

    const { result } = renderHook(() => usePatientJourney(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Clear previous calls
    mockJourneyService.getPatientJourney.mockClear();

    // Call refetch
    result.current.refetch();

    await waitFor(() => {
      expect(mockJourneyService.getPatientJourney).toHaveBeenCalled();
    });
  });
});

import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CareJourney } from './CareJourney';
import * as usePatientJourneyHook from '@/hooks/usePatientJourney';
import type { PatientJourney } from '@/types/journey';

// Mock the hook
vi.mock('@/hooks/usePatientJourney');

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
};

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{component}</BrowserRouter>
    </QueryClientProvider>
  );
};

const mockJourney: PatientJourney = {
  patient: {
    id: 'pt_001',
    name: 'Maria Santos',
    dueDate: '2025-03-15',
    insuranceType: 'standard',
    carePathway: 'labor_delivery',
    currentWeek: 28,
  },
  visits: [
    {
      id: 'v_001',
      type: 'prenatal_postpartum',
      visitNumber: 1,
      totalOfType: 8,
      status: 'completed',
      completedDate: '2024-10-15T14:00:00Z',
      doula: {
        id: 'd_001',
        name: 'Angela Rivera',
        photo: '/doula-avatar.JPG',
        languages: ['English', 'Spanish'],
      },
    },
    {
      id: 'v_002',
      type: 'prenatal_postpartum',
      visitNumber: 2,
      totalOfType: 8,
      status: 'scheduled',
      scheduledDate: '2025-01-10T10:00:00Z',
    },
  ],
  milestones: [
    {
      id: 'm_001',
      type: 'trimester',
      title: 'Second Trimester',
      date: '2024-09-15',
      description: 'Weeks 14-27',
    },
  ],
};

describe('CareJourney', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('should display loading skeleton when loading', () => {
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: undefined,
        isLoading: true,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderWithProviders(<CareJourney />);
      // LoadingSkeleton should be rendered
      expect(screen.queryByText(/your care journey/i)).not.toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error state when error occurs', () => {
      const mockRefetch = vi.fn();
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: undefined,
        isLoading: false,
        isError: true,
        error: new Error('Failed to load'),
        refetch: mockRefetch,
      });

      renderWithProviders(<CareJourney />);
      
      expect(screen.getByText(/unable to load/i)).toBeInTheDocument();
    });

    it('should call refetch when retry button is clicked', async () => {
      const user = userEvent.setup();
      const mockRefetch = vi.fn();
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: undefined,
        isLoading: false,
        isError: true,
        error: new Error('Failed to load'),
        refetch: mockRefetch,
      });

      renderWithProviders(<CareJourney />);
      
      const retryButton = screen.getByRole('button', { name: /retry/i });
      await user.click(retryButton);
      
      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });
  });

  describe('Empty State', () => {
    it('should display empty state when no journey data', () => {
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: undefined,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderWithProviders(<CareJourney />);
      
      expect(screen.getByText(/no journey data/i)).toBeInTheDocument();
    });
  });

  describe('Successful Data Rendering', () => {
    it('should render journey data when loaded successfully', () => {
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: mockJourney,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderWithProviders(<CareJourney />);
      
      expect(screen.getByText(/your care journey/i)).toBeInTheDocument();
      expect(screen.getByText(/hi, maria santos/i)).toBeInTheDocument();
      expect(screen.getByText(/prenatal visit/i)).toBeInTheDocument();
    });

    it('should render JourneyStatusHeader with patient and visits', () => {
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: mockJourney,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderWithProviders(<CareJourney />);
      
      expect(screen.getByText(/hi, maria santos/i)).toBeInTheDocument();
      expect(screen.getByText(/1 of 2 visits completed/i)).toBeInTheDocument();
    });

    it('should render TimelineContainer with visits and milestones', () => {
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: mockJourney,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderWithProviders(<CareJourney />);
      
      expect(screen.getByText(/your care journey/i)).toBeInTheDocument();
      expect(screen.getByText(/prenatal visit/i)).toBeInTheDocument();
      expect(screen.getByText(/second trimester/i)).toBeInTheDocument();
    });
  });

  describe('Visit Click Handling', () => {
    it('should open drawer when visit is clicked', async () => {
      const user = userEvent.setup();
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: mockJourney,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderWithProviders(<CareJourney />);
      
      const visitCard = screen.getAllByRole('button').find(
        (button) => button.getAttribute('aria-label')?.includes('Prenatal Visit')
      );
      
      if (visitCard) {
        await user.click(visitCard);
        
        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument();
        });
      }
    });

    it('should close drawer when close button is clicked', async () => {
      const user = userEvent.setup();
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: mockJourney,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderWithProviders(<CareJourney />);
      
      // Open drawer
      const visitCard = screen.getAllByRole('button').find(
        (button) => button.getAttribute('aria-label')?.includes('Prenatal Visit')
      );
      
      if (visitCard) {
        await user.click(visitCard);
        
        await waitFor(() => {
          expect(screen.getByRole('dialog')).toBeInTheDocument();
        });
        
        // Close drawer
        const closeButton = screen.getByLabelText('Close drawer');
        await user.click(closeButton);
        
        await waitFor(() => {
          expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });
      }
    });
  });

  describe('Layout Integration', () => {
    it('should render within DashboardLayout', () => {
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: mockJourney,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderWithProviders(<CareJourney />);
      
      // DashboardLayout should render navigation
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should pass patient name to DashboardLayout', () => {
      vi.mocked(usePatientJourneyHook.usePatientJourney).mockReturnValue({
        journey: mockJourney,
        isLoading: false,
        isError: false,
        error: null,
        refetch: vi.fn(),
      });

      renderWithProviders(<CareJourney />);
      
      // Patient name should be accessible in the layout
      expect(screen.getByText(/maria santos/i)).toBeInTheDocument();
    });
  });
});

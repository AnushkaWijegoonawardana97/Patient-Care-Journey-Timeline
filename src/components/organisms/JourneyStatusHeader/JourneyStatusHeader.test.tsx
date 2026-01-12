import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { JourneyStatusHeader } from './JourneyStatusHeader';
import type { Patient, Visit } from '@/types/journey';

const createMockPatient = (overrides: Partial<Patient>): Patient => ({
  id: 'pt_001',
  name: 'Maria Santos',
  dueDate: '2025-03-15',
  insuranceType: 'standard',
  carePathway: 'labor_delivery',
  currentWeek: 28,
  ...overrides,
});

const createMockVisit = (overrides: Partial<Visit>): Visit => ({
  id: 'v_001',
  type: 'prenatal_postpartum',
  visitNumber: 1,
  totalOfType: 8,
  status: 'scheduled',
  scheduledDate: '2025-01-10T10:00:00Z',
  ...overrides,
});

describe('JourneyStatusHeader', () => {
  describe('Progress Calculation', () => {
    it('should calculate progress correctly', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', status: 'completed' }),
        createMockVisit({ id: 'v_002', status: 'completed' }),
        createMockVisit({ id: 'v_003', status: 'scheduled' }),
        createMockVisit({ id: 'v_004', status: 'available' }),
      ];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      expect(screen.getByText(/2 of 4 visits completed/i)).toBeInTheDocument();
      // There are multiple 50% elements (circular progress and progress bar), use getAllByText
      const percentageElements = screen.getAllByText(/50%/i);
      expect(percentageElements.length).toBeGreaterThan(0);
    });

    it('should show 0% when no visits are completed', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', status: 'scheduled' }),
        createMockVisit({ id: 'v_002', status: 'available' }),
      ];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      expect(screen.getByText(/0 of 2 visits completed/i)).toBeInTheDocument();
      // There are multiple 0% elements, use getAllByText
      const percentageElements = screen.getAllByText(/0%/i);
      expect(percentageElements.length).toBeGreaterThan(0);
    });

    it('should show 100% when all visits are completed', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', status: 'completed' }),
        createMockVisit({ id: 'v_002', status: 'completed' }),
      ];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      expect(screen.getByText(/2 of 2 visits completed/i)).toBeInTheDocument();
      // There are multiple 100% elements, use getAllByText
      const percentageElements = screen.getAllByText(/100%/i);
      expect(percentageElements.length).toBeGreaterThan(0);
    });

    it('should handle empty visits array', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      expect(screen.getByText(/0 of 0 visits completed/i)).toBeInTheDocument();
      // There are multiple 0% elements, use getAllByText
      const percentageElements = screen.getAllByText(/0%/i);
      expect(percentageElements.length).toBeGreaterThan(0);
    });
  });

  describe('Insurance Type Display', () => {
    it('should display Standard for standard insurance', () => {
      const patient = createMockPatient({ insuranceType: 'standard' });
      const visits: Visit[] = [];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      expect(screen.getByText(/standard/i)).toBeInTheDocument();
    });

    it('should display Medi-Cal for medi-cal insurance', () => {
      const patient = createMockPatient({ insuranceType: 'medi-cal' });
      const visits: Visit[] = [];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      expect(screen.getByText(/medi-cal/i)).toBeInTheDocument();
    });
  });

  describe('Week Text Calculation', () => {
    it('should display weeks pregnant for positive currentWeek', () => {
      const patient = createMockPatient({ currentWeek: 28 });
      const visits: Visit[] = [];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      expect(screen.getByText(/28 weeks pregnant/i)).toBeInTheDocument();
    });

    it('should display weeks postpartum for negative currentWeek', () => {
      const patient = createMockPatient({ currentWeek: -6 });
      const visits: Visit[] = [];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      expect(screen.getByText(/6 weeks postpartum/i)).toBeInTheDocument();
    });

    it('should handle zero currentWeek', () => {
      const patient = createMockPatient({ currentWeek: 0 });
      const visits: Visit[] = [];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      expect(screen.getByText(/0 weeks postpartum/i)).toBeInTheDocument();
    });
  });

  describe('Patient Name Display', () => {
    it('should display patient name with greeting', () => {
      const patient = createMockPatient({ name: 'Maria Santos' });
      const visits: Visit[] = [];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      expect(screen.getByText(/hi, maria santos/i)).toBeInTheDocument();
    });
  });

  describe('Insurance Filtering', () => {
    it('should filter out additional_postpartum visits for standard insurance', () => {
      const patient = createMockPatient({ insuranceType: 'standard' });
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', type: 'prenatal_postpartum', status: 'completed' }),
        createMockVisit({ id: 'v_002', type: 'additional_postpartum', status: 'completed' }),
      ];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      // Should only count the prenatal_postpartum visit
      expect(screen.getByText(/1 of 1 visits completed/i)).toBeInTheDocument();
    });

    it('should include additional_postpartum visits for medi-cal insurance', () => {
      const patient = createMockPatient({ insuranceType: 'medi-cal' });
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', type: 'prenatal_postpartum', status: 'completed' }),
        createMockVisit({ id: 'v_002', type: 'additional_postpartum', status: 'completed' }),
      ];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      // Should count both visits
      expect(screen.getByText(/2 of 2 visits completed/i)).toBeInTheDocument();
    });
  });

  describe('Circular Progress', () => {
    it('should render circular progress component', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', status: 'completed' }),
        createMockVisit({ id: 'v_002', status: 'scheduled' }),
      ];

      render(<JourneyStatusHeader patient={patient} visits={visits} />);

      // CircularProgress should have aria-label with percentage
      const progress = screen.getByLabelText(/50% complete/i);
      expect(progress).toBeInTheDocument();
    });
  });

  describe('Progress Bar', () => {
    it('should render progress bar with correct width', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', status: 'completed' }),
        createMockVisit({ id: 'v_002', status: 'scheduled' }),
      ];

      const { container } = render(<JourneyStatusHeader patient={patient} visits={visits} />);

      const progressBar = container.querySelector('.h-full.bg-gradient-to-r');
      expect(progressBar).toBeInTheDocument();
      expect(progressBar).toHaveStyle({ width: '50%' });
    });
  });
});

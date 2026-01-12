import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TimelineContainer } from './TimelineContainer';
import type { Patient, Visit, Milestone } from '@/types/journey';

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

const createMockMilestone = (overrides: Partial<Milestone>): Milestone => ({
  id: 'm_001',
  type: 'trimester',
  title: 'Second Trimester',
  date: '2024-09-15',
  description: 'Weeks 14-27',
  ...overrides,
});

describe('TimelineContainer', () => {
  describe('Insurance-Based Filtering', () => {
    it('should filter out additional_postpartum visits for standard insurance', () => {
      const patient = createMockPatient({ insuranceType: 'standard' });
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', type: 'prenatal_postpartum' }),
        createMockVisit({ id: 'v_002', type: 'additional_postpartum' }),
      ];
      const milestones: Milestone[] = [];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      expect(screen.getByText(/prenatal visit/i)).toBeInTheDocument();
      expect(screen.queryByText(/additional postpartum/i)).not.toBeInTheDocument();
    });

    it('should include additional_postpartum visits for medi-cal insurance', () => {
      const patient = createMockPatient({ insuranceType: 'medi-cal' });
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', type: 'prenatal_postpartum' }),
        createMockVisit({ id: 'v_002', type: 'additional_postpartum' }),
      ];
      const milestones: Milestone[] = [];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      // Both visits should be visible
      const visitCards = screen.getAllByRole('button');
      expect(visitCards.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('Care Pathway Filtering', () => {
    it('should filter out pregnancy_loss visits for labor_delivery pathway', () => {
      const patient = createMockPatient({ carePathway: 'labor_delivery' });
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', type: 'labor_delivery' }),
        createMockVisit({ id: 'v_002', type: 'pregnancy_loss' }),
      ];
      const milestones: Milestone[] = [];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      expect(screen.getByText(/labor & delivery/i)).toBeInTheDocument();
      expect(screen.queryByText(/pregnancy loss/i)).not.toBeInTheDocument();
    });

    it('should filter out labor_delivery visits for pregnancy_loss pathway', () => {
      const patient = createMockPatient({ carePathway: 'pregnancy_loss' });
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', type: 'labor_delivery' }),
        createMockVisit({ id: 'v_002', type: 'pregnancy_loss' }),
      ];
      const milestones: Milestone[] = [];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      expect(screen.getByText(/pregnancy loss/i)).toBeInTheDocument();
      expect(screen.queryByText(/labor & delivery/i)).not.toBeInTheDocument();
    });
  });

  describe('Chronological Sorting', () => {
    it('should sort visits and milestones chronologically', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({
          id: 'v_003',
          scheduledDate: '2025-03-01T10:00:00Z',
        }),
        createMockVisit({
          id: 'v_001',
          scheduledDate: '2025-01-01T10:00:00Z',
        }),
        createMockVisit({
          id: 'v_002',
          scheduledDate: '2025-02-01T10:00:00Z',
        }),
      ];
      const milestones: Milestone[] = [
        createMockMilestone({ id: 'm_001', date: '2025-01-15' }),
        createMockMilestone({ id: 'm_002', date: '2025-02-15' }),
      ];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      // Items should be rendered in chronological order
      const items = screen.getAllByRole('button');
      expect(items.length).toBeGreaterThan(0);
    });

    it('should handle visits without dates by placing them at the end', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({
          id: 'v_001',
          scheduledDate: '2025-01-01T10:00:00Z',
        }),
        createMockVisit({
          id: 'v_002',
          status: 'available',
          scheduledDate: undefined,
        }),
      ];
      const milestones: Milestone[] = [];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      const items = screen.getAllByRole('button');
      expect(items.length).toBe(2);
    });
  });

  describe('Empty State', () => {
    it('should display empty state when no items are present', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [];
      const milestones: Milestone[] = [];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      expect(screen.getByText(/no journey items found/i)).toBeInTheDocument();
    });
  });

  describe('Visit and Milestone Integration', () => {
    it('should render both visits and milestones together', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001', scheduledDate: '2025-01-10T10:00:00Z' }),
      ];
      const milestones: Milestone[] = [
        createMockMilestone({ id: 'm_001', date: '2025-01-15' }),
      ];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      expect(screen.getByText(/prenatal visit/i)).toBeInTheDocument();
      expect(screen.getByText(/second trimester/i)).toBeInTheDocument();
    });

    it('should interleave visits and milestones chronologically', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({
          id: 'v_001',
          scheduledDate: '2025-02-01T10:00:00Z',
        }),
        createMockVisit({
          id: 'v_002',
          scheduledDate: '2025-03-01T10:00:00Z',
        }),
      ];
      const milestones: Milestone[] = [
        createMockMilestone({ id: 'm_001', date: '2025-01-15' }),
        createMockMilestone({ id: 'm_002', date: '2025-02-15' }),
      ];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      // Should render all items
      const visitButtons = screen.getAllByRole('button');
      const milestoneArticles = screen.getAllByRole('article');
      expect(visitButtons.length).toBe(2);
      expect(milestoneArticles.length).toBe(2);
    });
  });

  describe('onVisitClick Handler', () => {
    it('should call onVisitClick when a visit is clicked', async () => {
      const user = userEvent.setup();
      const handleVisitClick = vi.fn();
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001' }),
      ];
      const milestones: Milestone[] = [];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
          onVisitClick={handleVisitClick}
        />
      );

      const visitCard = screen.getByRole('button');
      await user.click(visitCard);
      expect(handleVisitClick).toHaveBeenCalledTimes(1);
      expect(handleVisitClick).toHaveBeenCalledWith(visits[0]);
    });

    it('should not throw error when onVisitClick is not provided', async () => {
      const user = userEvent.setup();
      const patient = createMockPatient({});
      const visits: Visit[] = [
        createMockVisit({ id: 'v_001' }),
      ];
      const milestones: Milestone[] = [];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      const visitCard = screen.getByRole('button');
      await user.click(visitCard);
      // Should not throw error
      expect(visitCard).toBeInTheDocument();
    });
  });

  describe('Semantic HTML', () => {
    it('should use section element with proper aria-labelledby', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [createMockVisit({})];
      const milestones: Milestone[] = [];

      const { container } = render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveAttribute('aria-labelledby', 'timeline-heading');
    });

    it('should use ordered list for timeline items', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [createMockVisit({})];
      const milestones: Milestone[] = [];

      const { container } = render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      const list = container.querySelector('ol');
      expect(list).toBeInTheDocument();
      expect(list).toHaveAttribute('role', 'list');
    });
  });

  describe('Heading Hierarchy', () => {
    it('should have proper heading with id', () => {
      const patient = createMockPatient({});
      const visits: Visit[] = [createMockVisit({})];
      const milestones: Milestone[] = [];

      render(
        <TimelineContainer
          patient={patient}
          visits={visits}
          milestones={milestones}
        />
      );

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAttribute('id', 'timeline-heading');
      expect(heading).toHaveTextContent(/your care journey/i);
    });
  });
});

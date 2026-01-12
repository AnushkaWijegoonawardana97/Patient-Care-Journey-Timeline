import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VisitCard } from './VisitCard';
import type { Visit } from '@/types/journey';

const mockDoula = {
  id: 'd_001',
  name: 'Angela Rivera',
  photo: '/doula-avatar.JPG',
  languages: ['English', 'Spanish'],
};

const createMockVisit = (overrides: Partial<Visit>): Visit => ({
  id: 'v_001',
  type: 'prenatal_postpartum',
  visitNumber: 1,
  totalOfType: 8,
  status: 'scheduled',
  scheduledDate: '2025-01-10T10:00:00Z',
  ...overrides,
});

describe('VisitCard', () => {
  describe('Rendering', () => {
    it('should render visit card with scheduled status', () => {
      const visit = createMockVisit({ status: 'scheduled' });
      render(<VisitCard visit={visit} />);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByText(/prenatal visit/i)).toBeInTheDocument();
      expect(screen.getByText(/scheduled/i)).toBeInTheDocument();
    });

    it('should render visit card with completed status', () => {
      const visit = createMockVisit({
        status: 'completed',
        completedDate: '2025-01-10T11:00:00Z',
      });
      render(<VisitCard visit={visit} />);
      
      expect(screen.getByText(/completed/i)).toBeInTheDocument();
    });

    it('should render visit card with available status', () => {
      const visit = createMockVisit({ status: 'available' });
      render(<VisitCard visit={visit} />);
      
      expect(screen.getByText(/available/i)).toBeInTheDocument();
      expect(screen.getByText(/available to schedule/i)).toBeInTheDocument();
    });

    it('should render visit card with missed status', () => {
      const visit = createMockVisit({ status: 'missed' });
      render(<VisitCard visit={visit} />);
      
      expect(screen.getByText(/missed/i)).toBeInTheDocument();
    });

    it('should render visit card with cancelled status', () => {
      const visit = createMockVisit({ status: 'cancelled' });
      render(<VisitCard visit={visit} />);
      
      expect(screen.getByText(/cancelled/i)).toBeInTheDocument();
    });

    it('should render initial visit type', () => {
      const visit = createMockVisit({
        type: 'initial',
        visitNumber: 1,
        totalOfType: 1,
      });
      render(<VisitCard visit={visit} />);
      
      expect(screen.getByText(/initial visit/i)).toBeInTheDocument();
    });

    it('should render labor & delivery visit type', () => {
      const visit = createMockVisit({
        type: 'labor_delivery',
        visitNumber: 1,
        totalOfType: 1,
      });
      render(<VisitCard visit={visit} />);
      
      expect(screen.getByText(/labor & delivery/i)).toBeInTheDocument();
    });
  });

  describe('Date and Time Display', () => {
    it('should display scheduled date and time', () => {
      const visit = createMockVisit({
        status: 'scheduled',
        scheduledDate: '2025-01-15T14:30:00Z',
      });
      render(<VisitCard visit={visit} />);
      
      expect(screen.getByText(/jan 15, 2025/i)).toBeInTheDocument();
      expect(screen.getByText(/2:30 pm/i)).toBeInTheDocument();
    });

    it('should display completed date', () => {
      const visit = createMockVisit({
        status: 'completed',
        completedDate: '2025-01-10T11:00:00Z',
      });
      render(<VisitCard visit={visit} />);
      
      expect(screen.getByText(/completed jan 10, 2025/i)).toBeInTheDocument();
    });

    it('should not display date for available visits', () => {
      const visit = createMockVisit({ status: 'available' });
      render(<VisitCard visit={visit} />);
      
      const timeElements = screen.queryAllByRole('time');
      expect(timeElements.length).toBe(0);
    });
  });

  describe('Doula Information', () => {
    it('should display doula name when doula is assigned', () => {
      const visit = createMockVisit({ doula: mockDoula });
      render(<VisitCard visit={visit} />);
      
      expect(screen.getByText('Angela Rivera')).toBeInTheDocument();
    });

    it('should not display doula information when not assigned', () => {
      const visit = createMockVisit({ doula: undefined });
      render(<VisitCard visit={visit} />);
      
      expect(screen.queryByText('Angela Rivera')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('should call onClick when card is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const visit = createMockVisit({});
      
      render(<VisitCard visit={visit} onClick={handleClick} />);
      
      await user.click(screen.getByRole('button'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick when Enter key is pressed', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const visit = createMockVisit({});
      
      render(<VisitCard visit={visit} onClick={handleClick} />);
      
      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick when Space key is pressed', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const visit = createMockVisit({});
      
      render(<VisitCard visit={visit} onClick={handleClick} />);
      
      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard(' ');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when onClick prop is not provided', async () => {
      const user = userEvent.setup();
      const visit = createMockVisit({});
      
      render(<VisitCard visit={visit} />);
      
      await user.click(screen.getByRole('button'));
      // Should not throw error
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  describe('Visual States', () => {
    it('should not show connector line when isLast is true', () => {
      const visit = createMockVisit({});
      const { container } = render(<VisitCard visit={visit} isLast={true} />);
      
      const connector = container.querySelector('.absolute.left-6.top-12');
      expect(connector).not.toBeInTheDocument();
    });

    it('should show connector line when isLast is false', () => {
      const visit = createMockVisit({});
      const { container } = render(<VisitCard visit={visit} isLast={false} />);
      
      const connector = container.querySelector('.absolute.left-6.top-12');
      expect(connector).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle visit without scheduled or completed date', () => {
      const visit = createMockVisit({
        status: 'available',
        scheduledDate: undefined,
        completedDate: undefined,
      });
      
      render(<VisitCard visit={visit} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should handle visit with both scheduled and completed dates', () => {
      const visit = createMockVisit({
        status: 'completed',
        scheduledDate: '2025-01-10T10:00:00Z',
        completedDate: '2025-01-10T11:00:00Z',
      });
      
      render(<VisitCard visit={visit} />);
      expect(screen.getByText(/completed/i)).toBeInTheDocument();
    });

    it('should handle extended postpartum visit type', () => {
      const visit = createMockVisit({
        type: 'extended_postpartum',
        visitNumber: 1,
        totalOfType: 2,
      });
      
      render(<VisitCard visit={visit} />);
      expect(screen.getByText(/extended postpartum/i)).toBeInTheDocument();
    });
  });

  describe('ARIA Attributes', () => {
    it('should have proper aria-label', () => {
      const visit = createMockVisit({ status: 'scheduled' });
      render(<VisitCard visit={visit} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-label');
      expect(card.getAttribute('aria-label')).toContain('Prenatal Visit');
      expect(card.getAttribute('aria-label')).toContain('Scheduled');
    });

    it('should have tabIndex for keyboard navigation', () => {
      const visit = createMockVisit({});
      render(<VisitCard visit={visit} />);
      
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });
});

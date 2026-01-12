import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MilestoneMarker } from './MilestoneMarker';
import type { Milestone } from '@/types/journey';

const createMockMilestone = (overrides: Partial<Milestone>): Milestone => ({
  id: 'm_001',
  type: 'trimester',
  title: 'Second Trimester',
  date: '2024-09-15',
  description: 'Weeks 14-27',
  ...overrides,
});

describe('MilestoneMarker', () => {
  describe('Milestone Types', () => {
    it('should render trimester milestone', () => {
      const milestone = createMockMilestone({ type: 'trimester' });
      render(<MilestoneMarker milestone={milestone} />);
      
      expect(screen.getByText('Second Trimester')).toBeInTheDocument();
      expect(screen.getByText(/milestone/i)).toBeInTheDocument();
    });

    it('should render due_date milestone', () => {
      const milestone = createMockMilestone({
        type: 'due_date',
        title: 'Due Date',
        date: '2025-03-15',
      });
      render(<MilestoneMarker milestone={milestone} />);
      
      expect(screen.getByText('Due Date')).toBeInTheDocument();
      expect(screen.getByText(/due date/i)).toBeInTheDocument();
    });

    it('should render postpartum_week milestone', () => {
      const milestone = createMockMilestone({
        type: 'postpartum_week',
        title: '6 Weeks Postpartum',
        date: '2025-04-26',
      });
      render(<MilestoneMarker milestone={milestone} />);
      
      expect(screen.getByText('6 Weeks Postpartum')).toBeInTheDocument();
      expect(screen.getByText(/postpartum/i)).toBeInTheDocument();
    });

    it('should render custom milestone', () => {
      const milestone = createMockMilestone({
        type: 'custom',
        title: 'Custom Milestone',
        date: '2025-05-01',
      });
      render(<MilestoneMarker milestone={milestone} />);
      
      expect(screen.getByText('Custom Milestone')).toBeInTheDocument();
      expect(screen.getByText(/milestone/i)).toBeInTheDocument();
    });
  });

  describe('Date Formatting', () => {
    it('should format date correctly', () => {
      const milestone = createMockMilestone({ date: '2024-09-15' });
      render(<MilestoneMarker milestone={milestone} />);
      
      expect(screen.getByText(/sep 15, 2024/i)).toBeInTheDocument();
    });

    it('should use semantic time element with dateTime attribute', () => {
      const milestone = createMockMilestone({ date: '2024-09-15' });
      const { container } = render(<MilestoneMarker milestone={milestone} />);
      
      const timeElement = container.querySelector('time[datetime="2024-09-15"]');
      expect(timeElement).toBeInTheDocument();
    });
  });

  describe('Description Rendering', () => {
    it('should render description when provided', () => {
      const milestone = createMockMilestone({
        description: 'Weeks 14-27',
      });
      render(<MilestoneMarker milestone={milestone} />);
      
      expect(screen.getByText('Weeks 14-27')).toBeInTheDocument();
    });

    it('should not render description when not provided', () => {
      const milestone = createMockMilestone({
        description: undefined,
      });
      render(<MilestoneMarker milestone={milestone} />);
      
      expect(screen.queryByText(/weeks/i)).not.toBeInTheDocument();
    });
  });

  describe('Visual States', () => {
    it('should not show connector line when isLast is true', () => {
      const milestone = createMockMilestone({});
      const { container } = render(<MilestoneMarker milestone={milestone} isLast={true} />);
      
      const connector = container.querySelector('.absolute.left-6.top-16');
      expect(connector).not.toBeInTheDocument();
    });

    it('should show connector line when isLast is false', () => {
      const milestone = createMockMilestone({});
      const { container } = render(<MilestoneMarker milestone={milestone} isLast={false} />);
      
      const connector = container.querySelector('.absolute.left-6.top-16');
      expect(connector).toBeInTheDocument();
    });
  });

  describe('Semantic HTML', () => {
    it('should use article element', () => {
      const milestone = createMockMilestone({});
      const { container } = render(<MilestoneMarker milestone={milestone} />);
      
      const article = container.querySelector('article');
      expect(article).toBeInTheDocument();
    });

    it('should have proper heading with id', () => {
      const milestone = createMockMilestone({ id: 'm_001' });
      render(<MilestoneMarker milestone={milestone} />);
      
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveAttribute('id', 'milestone-m_001-title');
      expect(heading).toHaveTextContent('Second Trimester');
    });

    it('should mark decorative elements with aria-hidden', () => {
      const milestone = createMockMilestone({});
      const { container } = render(<MilestoneMarker milestone={milestone} />);
      
      const decorativeElements = container.querySelectorAll('[aria-hidden="true"]');
      expect(decorativeElements.length).toBeGreaterThan(0);
    });
  });

  describe('Badge Display', () => {
    it('should display appropriate badge for each milestone type', () => {
      const trimesterMilestone = createMockMilestone({ type: 'trimester' });
      const { rerender } = render(<MilestoneMarker milestone={trimesterMilestone} />);
      
      expect(screen.getByText(/milestone/i)).toBeInTheDocument();
      
      const dueDateMilestone = createMockMilestone({
        type: 'due_date',
        title: 'Due Date',
      });
      rerender(<MilestoneMarker milestone={dueDateMilestone} />);
      
      expect(screen.getByText(/due date/i)).toBeInTheDocument();
    });
  });
});

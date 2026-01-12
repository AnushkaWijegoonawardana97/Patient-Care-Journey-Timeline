import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VisitDetailDrawer } from './VisitDetailDrawer';
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

describe('VisitDetailDrawer', () => {
  beforeEach(() => {
    document.body.style.overflow = '';
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  describe('Drawer Open/Close', () => {
    it('should not render when isOpen is false', () => {
      const visit = createMockVisit({});
      render(<VisitDetailDrawer visit={visit} isOpen={false} onClose={vi.fn()} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should not render when visit is null', () => {
      render(<VisitDetailDrawer visit={null} isOpen={true} onClose={vi.fn()} />);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true and visit is provided', () => {
      const visit = createMockVisit({});
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      const visit = createMockVisit({});

      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={handleClose} />);

      const closeButton = screen.getByLabelText('Close drawer');
      await user.click(closeButton);

      expect(handleClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when backdrop is clicked', async () => {
      const user = userEvent.setup();
      const handleClose = vi.fn();
      const visit = createMockVisit({});

      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={handleClose} />);

      const backdrop = screen.getByRole('dialog').previousElementSibling;
      if (backdrop) {
        await user.click(backdrop as HTMLElement);
        expect(handleClose).toHaveBeenCalledTimes(1);
      }
    });
  });

  describe('Visit Data Display', () => {
    it('should display visit title', () => {
      const visit = createMockVisit({});
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText(/prenatal visit/i)).toBeInTheDocument();
    });

    it('should display visit number for prenatal_postpartum visits', () => {
      const visit = createMockVisit({
        type: 'prenatal_postpartum',
        visitNumber: 3,
        totalOfType: 8,
      });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText(/visit 3 of 8/i)).toBeInTheDocument();
    });

    it('should display scheduled date and time', () => {
      const visit = createMockVisit({
        status: 'scheduled',
        scheduledDate: '2025-01-15T14:30:00Z',
      });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText(/january 15, 2025/i)).toBeInTheDocument();
      expect(screen.getByText(/2:30 pm/i)).toBeInTheDocument();
    });

    it('should display completed date and time', () => {
      const visit = createMockVisit({
        status: 'completed',
        completedDate: '2025-01-10T11:00:00Z',
      });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText(/january 10, 2025/i)).toBeInTheDocument();
      expect(screen.getByText(/11:00 am/i)).toBeInTheDocument();
    });

    it('should display duration when provided', () => {
      const visit = createMockVisit({
        durationMinutes: 60,
      });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText(/60 minutes/i)).toBeInTheDocument();
    });
  });

  describe('Visit Status Variants', () => {
    it('should display status badge for scheduled visit', () => {
      const visit = createMockVisit({ status: 'scheduled' });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText(/scheduled/i)).toBeInTheDocument();
    });

    it('should display status badge for completed visit', () => {
      const visit = createMockVisit({ status: 'completed' });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText(/completed/i)).toBeInTheDocument();
    });

    it('should display status badge for missed visit', () => {
      const visit = createMockVisit({ status: 'missed' });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText(/missed/i)).toBeInTheDocument();
    });

    it('should display status badge for cancelled visit', () => {
      const visit = createMockVisit({ status: 'cancelled' });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText(/cancelled/i)).toBeInTheDocument();
    });
  });

  describe('Doula Information', () => {
    it('should display doula information when doula is assigned', () => {
      const visit = createMockVisit({ doula: mockDoula });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText('Angela Rivera')).toBeInTheDocument();
      expect(screen.getByText(/your care provider/i)).toBeInTheDocument();
      expect(screen.getByText(/assigned doula/i)).toBeInTheDocument();
    });

    it('should display doula languages', () => {
      const visit = createMockVisit({ doula: mockDoula });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText('English')).toBeInTheDocument();
      expect(screen.getByText('Spanish')).toBeInTheDocument();
    });

    it('should not display doula section when doula is not assigned', () => {
      const visit = createMockVisit({ doula: undefined });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.queryByText(/your care provider/i)).not.toBeInTheDocument();
    });
  });

  describe('Notes Display', () => {
    it('should display visit notes when provided', () => {
      const visit = createMockVisit({
        notes: 'Patient is doing well. Discussed nutrition and exercise.',
      });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.getByText(/visit notes/i)).toBeInTheDocument();
      expect(screen.getByText(/patient is doing well/i)).toBeInTheDocument();
    });

    it('should not display notes section when notes are not provided', () => {
      const visit = createMockVisit({ notes: undefined });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(screen.queryByText(/visit notes/i)).not.toBeInTheDocument();
    });
  });

  describe('Body Scroll Lock', () => {
    it('should lock body scroll when drawer is open', () => {
      const visit = createMockVisit({});
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(document.body.style.overflow).toBe('hidden');
    });

    it('should restore body scroll when drawer closes', () => {
      const visit = createMockVisit({});
      const { rerender } = render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      expect(document.body.style.overflow).toBe('hidden');

      rerender(<VisitDetailDrawer visit={null} isOpen={false} onClose={vi.fn()} />);
      expect(document.body.style.overflow).toBe('');
    });
  });

  describe('ARIA Attributes', () => {
    it('should have dialog role', () => {
      const visit = createMockVisit({});
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toBeInTheDocument();
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'visit-detail-title');
    });

    it('should have proper title id', () => {
      const visit = createMockVisit({});
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      const title = screen.getByText(/prenatal visit/i);
      expect(title).toHaveAttribute('id', 'visit-detail-title');
    });
  });
});

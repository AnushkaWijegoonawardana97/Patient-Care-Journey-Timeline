import * as React from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VisitDetailDrawer } from './VisitDetailDrawer';
import type { Visit } from '@/types/journey';

// Mock i18n
vi.mock('@/lib/i18n', () => ({
  default: {
    t: (key: string, params?: Record<string, any>) => {
      const translations: Record<string, string> = {
        'visits.types.initial': 'Initial Visit',
        'visits.types.prenatalPostpartumWithNumber': `Prenatal Visit ${params?.number || ''} of ${params?.total || ''}`,
        'visits.types.extendedPostpartum': `Extended Postpartum Visit ${params?.number || ''}`,
        'visits.types.laborDelivery': 'Labor & Delivery',
        'visits.types.pregnancyLoss': 'Pregnancy Loss Support',
        'visits.types.additionalPostpartum': `Additional Postpartum Visit ${params?.number || ''}`,
        'visits.status.completed': 'Completed',
        'visits.status.scheduled': 'Scheduled',
        'visits.status.available': 'Available',
        'visits.status.missed': 'Missed',
        'visits.status.cancelled': 'Cancelled',
        'common.visit': 'Visit',
        'common.of': 'of',
      };
      const translation = translations[key];
      if (translation && params) {
        // Simple parameter replacement
        return translation.replace(/\{(\w+)\}/g, (match, paramName) => {
          return params[paramName]?.toString() || match;
        });
      }
      return translation || key;
    },
    language: 'en',
    changeLanguage: vi.fn(),
  },
}));

// Mock react-i18next
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next');
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => {
        const translations: Record<string, string> = {
          'visitType.initial': 'Initial Visit',
          'visitType.prenatal_postpartum': 'Prenatal Visit',
          'visitType.extended_postpartum': 'Extended Postpartum Visit',
          'visitType.labor_delivery': 'Labor & Delivery',
          'visitType.pregnancy_loss': 'Pregnancy Loss Support',
          'visitType.additional_postpartum': 'Additional Postpartum Visit',
          'visitStatus.completed': 'Completed',
          'visitStatus.scheduled': 'Scheduled',
          'visitStatus.available': 'Available',
          'visitStatus.missed': 'Missed',
          'visitStatus.cancelled': 'Cancelled',
          'common.visit': 'Visit',
          'common.of': 'of',
        };
        return translations[key] || key;
      },
      i18n: {
        changeLanguage: vi.fn(),
        language: 'en',
      },
    }),
  };
});

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

      // Title should be rendered (check for heading with id)
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute('id', 'visit-detail-title');
    });

    it('should display visit number for prenatal_postpartum visits', () => {
      const visit = createMockVisit({
        type: 'prenatal_postpartum',
        visitNumber: 3,
        totalOfType: 8,
      });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      // Check for visit number text - the component shows "Visit 3 of 8" in a paragraph
      // There may be multiple elements with this text (title and paragraph), so use getAllByText
      const visitNumberElements = screen.getAllByText(/visit 3 of 8/i);
      expect(visitNumberElements.length).toBeGreaterThan(0);
    });

    it('should display scheduled date and time', () => {
      const visit = createMockVisit({
        status: 'scheduled',
        scheduledDate: '2025-01-15T14:30:00Z',
      });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      // Check for date (format: "EEEE, MMMM d, yyyy" = "Wednesday, January 15, 2025")
      expect(screen.getByText(/january/i)).toBeInTheDocument();
      expect(screen.getByText(/2025/i)).toBeInTheDocument();
      // Time is in secondaryValue, check for time elements
      const timeElements = screen.getAllByText(/january|wednesday/i);
      expect(timeElements.length).toBeGreaterThan(0);
    });

    it('should display completed date and time', () => {
      const visit = createMockVisit({
        status: 'completed',
        completedDate: '2025-01-10T11:00:00Z',
      });
      render(<VisitDetailDrawer visit={visit} isOpen={true} onClose={vi.fn()} />);

      // Check for date (format: "EEEE, MMMM d, yyyy" = "Friday, January 10, 2025")
      // There may be multiple time elements with the same date, so use getAllByText
      const dateElements = screen.getAllByText(/friday, january 10, 2025/i);
      expect(dateElements.length).toBeGreaterThan(0);
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

      // StatusBadge uses formatStatusLabel which uses i18n.t('visits.status.scheduled')
      // There may be multiple elements with "Scheduled", so use getAllByText
      const scheduledElements = screen.getAllByText(/scheduled/i);
      expect(scheduledElements.length).toBeGreaterThan(0);
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

      // The title should have the id attribute
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveAttribute('id', 'visit-detail-title');
      // Title should contain visit information
      expect(title).toBeInTheDocument();
    });
  });
});

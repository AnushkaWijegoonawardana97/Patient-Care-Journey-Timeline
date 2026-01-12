import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatStatusLabel, getVisitTitle, getStatusIcon, getStatusBadgeStyles } from './visit.utils';
import type { Visit, VisitStatus } from '@/types/journey';
import * as i18n from '@/lib/i18n';

// Mock i18n
vi.mock('@/lib/i18n', () => ({
  default: {
    t: vi.fn((key: string, params?: Record<string, any>) => {
      // Simple mock implementation
      if (key.includes('status')) {
        const statusMap: Record<string, string> = {
          'visits.status.completed': 'Completed',
          'visits.status.scheduled': 'Scheduled',
          'visits.status.available': 'Available',
          'visits.status.missed': 'Missed',
          'visits.status.cancelled': 'Cancelled',
        };
        return statusMap[key] || key;
      }
      if (key.includes('types')) {
        if (key.includes('initial')) return 'Initial Visit';
        if (key.includes('laborDelivery')) return 'Labor & Delivery';
        if (key.includes('pregnancyLoss')) return 'Pregnancy Loss';
        if (key.includes('extendedPostpartum')) {
          return `Extended Postpartum Visit ${params?.number || ''}`;
        }
        if (key.includes('additionalPostpartum')) {
          return `Additional Postpartum Visit ${params?.number || ''}`;
        }
        if (key.includes('prenatalPostpartumWithNumber')) {
          return `Prenatal/Postpartum Visit ${params?.number || ''} of ${params?.total || ''}`;
        }
      }
      return key;
    }),
  },
}));

describe('visit.utils', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('formatStatusLabel', () => {
    it('should return correct translation for completed status', () => {
      const result = formatStatusLabel('completed');
      expect(i18n.default.t).toHaveBeenCalledWith('visits.status.completed');
      expect(result).toBe('Completed');
    });

    it('should return correct translation for scheduled status', () => {
      const result = formatStatusLabel('scheduled');
      expect(i18n.default.t).toHaveBeenCalledWith('visits.status.scheduled');
      expect(result).toBe('Scheduled');
    });

    it('should return correct translation for available status', () => {
      const result = formatStatusLabel('available');
      expect(i18n.default.t).toHaveBeenCalledWith('visits.status.available');
      expect(result).toBe('Available');
    });

    it('should return correct translation for missed status', () => {
      const result = formatStatusLabel('missed');
      expect(i18n.default.t).toHaveBeenCalledWith('visits.status.missed');
      expect(result).toBe('Missed');
    });

    it('should return correct translation for cancelled status', () => {
      const result = formatStatusLabel('cancelled');
      expect(i18n.default.t).toHaveBeenCalledWith('visits.status.cancelled');
      expect(result).toBe('Cancelled');
    });
  });

  describe('getVisitTitle', () => {
    it('should return correct title for initial visit', () => {
      const visit: Visit = {
        id: 'v_001',
        type: 'initial',
        visitNumber: 1,
        totalOfType: 1,
        status: 'scheduled',
      };

      const result = getVisitTitle(visit);
      expect(i18n.default.t).toHaveBeenCalledWith('visits.types.initial');
      expect(result).toBe('Initial Visit');
    });

    it('should return correct title for labor_delivery visit', () => {
      const visit: Visit = {
        id: 'v_002',
        type: 'labor_delivery',
        visitNumber: 1,
        totalOfType: 1,
        status: 'scheduled',
      };

      const result = getVisitTitle(visit);
      expect(i18n.default.t).toHaveBeenCalledWith('visits.types.laborDelivery');
      expect(result).toBe('Labor & Delivery');
    });

    it('should return correct title for pregnancy_loss visit', () => {
      const visit: Visit = {
        id: 'v_003',
        type: 'pregnancy_loss',
        visitNumber: 1,
        totalOfType: 1,
        status: 'scheduled',
      };

      const result = getVisitTitle(visit);
      expect(i18n.default.t).toHaveBeenCalledWith('visits.types.pregnancyLoss');
      expect(result).toBe('Pregnancy Loss');
    });

    it('should return correct title for extended_postpartum with number', () => {
      const visit: Visit = {
        id: 'v_004',
        type: 'extended_postpartum',
        visitNumber: 1,
        totalOfType: 1,
        status: 'scheduled',
      };

      const result = getVisitTitle(visit);
      expect(i18n.default.t).toHaveBeenCalledWith('visits.types.extendedPostpartum', { number: 1 });
      expect(result).toContain('Extended Postpartum Visit');
    });

    it('should return correct title for additional_postpartum with number', () => {
      const visit: Visit = {
        id: 'v_005',
        type: 'additional_postpartum',
        visitNumber: 2,
        totalOfType: 1,
        status: 'scheduled',
      };

      const result = getVisitTitle(visit);
      expect(i18n.default.t).toHaveBeenCalledWith('visits.types.additionalPostpartum', { number: 2 });
      expect(result).toContain('Additional Postpartum Visit');
    });

    it('should return correct title for prenatal/postpartum with number and total', () => {
      const visit: Visit = {
        id: 'v_006',
        type: 'prenatal_postpartum',
        visitNumber: 3,
        totalOfType: 8,
        status: 'scheduled',
      };

      const result = getVisitTitle(visit);
      expect(i18n.default.t).toHaveBeenCalledWith('visits.types.prenatalPostpartumWithNumber', {
        number: 3,
        total: 8,
      });
      expect(result).toContain('Prenatal/Postpartum Visit');
    });
  });

  describe('getStatusIcon', () => {
    it('should return CheckCircle2 icon for completed status', () => {
      const Icon = getStatusIcon('completed');
      expect(Icon).toBeDefined();
      expect(typeof Icon).toBe('function');
    });

    it('should return Calendar icon for scheduled status', () => {
      const Icon = getStatusIcon('scheduled');
      expect(Icon).toBeDefined();
      expect(typeof Icon).toBe('function');
    });

    it('should return Circle icon for available status', () => {
      const Icon = getStatusIcon('available');
      expect(Icon).toBeDefined();
      expect(typeof Icon).toBe('function');
    });

    it('should return AlertCircle icon for missed status', () => {
      const Icon = getStatusIcon('missed');
      expect(Icon).toBeDefined();
      expect(typeof Icon).toBe('function');
    });

    it('should return X icon for cancelled status', () => {
      const Icon = getStatusIcon('cancelled');
      expect(Icon).toBeDefined();
      expect(typeof Icon).toBe('function');
    });

    it('should return Circle icon for unknown status', () => {
      const Icon = getStatusIcon('unknown' as VisitStatus);
      expect(Icon).toBeDefined();
      expect(typeof Icon).toBe('function');
    });
  });

  describe('getStatusBadgeStyles', () => {
    it('should return correct styles for completed status', () => {
      const result = getStatusBadgeStyles('completed');
      expect(result).toBe('bg-emerald-50 text-emerald-700 border-emerald-200');
    });

    it('should return correct styles for scheduled status', () => {
      const result = getStatusBadgeStyles('scheduled');
      expect(result).toBe('bg-blue-50 text-blue-700 border-blue-200');
    });

    it('should return correct styles for missed status', () => {
      const result = getStatusBadgeStyles('missed');
      expect(result).toBe('bg-red-50 text-red-700 border-red-200');
    });

    it('should return correct styles for cancelled status', () => {
      const result = getStatusBadgeStyles('cancelled');
      expect(result).toBe('bg-gray-100 text-gray-700 border-gray-300');
    });

    it('should return default styles for available status', () => {
      const result = getStatusBadgeStyles('available');
      expect(result).toBe('bg-gray-100 text-gray-700 border-gray-300');
    });

    it('should return default styles for unknown status', () => {
      const result = getStatusBadgeStyles('unknown' as VisitStatus);
      expect(result).toBe('bg-gray-100 text-gray-700 border-gray-300');
    });
  });
});

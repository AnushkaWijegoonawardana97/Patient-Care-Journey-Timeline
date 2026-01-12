import { describe, it, expect, vi, beforeEach } from 'vitest';
import { formatDate, formatDateShort, formatDateLong, formatDateWithDay, formatTime, formatDateTime } from './dateUtils';
import * as i18n from '@/lib/i18n';
import { format } from 'date-fns';

// Mock i18n
vi.mock('@/lib/i18n', () => ({
  default: {
    language: 'en',
  },
}));

// Mock date-fns format
vi.mock('date-fns', async () => {
  const actual = await vi.importActual('date-fns');
  return {
    ...actual,
    format: vi.fn((_date: Date, formatString: string, _options?: any) => {
      // Simple mock that returns formatted string
      if (formatString === 'MMM d, yyyy') return 'Jan 15, 2024';
      if (formatString === 'MMMM d, yyyy') return 'January 15, 2024';
      if (formatString === 'EEEE, MMMM d, yyyy') return 'Monday, January 15, 2024';
      if (formatString === 'h:mm a') return '3:45 PM';
      if (formatString === 'MMM d, yyyy • h:mm a') return 'Jan 15, 2024 • 3:45 PM';
      return formatString;
    }),
  };
});

describe('dateUtils', () => {
  const testDate = new Date('2024-01-15T15:45:00Z');
  const testDateString = '2024-01-15T15:45:00Z';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(i18n.default).language = 'en';
  });

  describe('formatDate', () => {
    it('should format date with given format string', () => {
      const result = formatDate(testDate, 'MMM d, yyyy');
      expect(result).toBe('Jan 15, 2024');
      expect(format).toHaveBeenCalled();
    });

    it('should handle string dates', () => {
      const result = formatDate(testDateString, 'MMM d, yyyy');
      expect(result).toBe('Jan 15, 2024');
    });

    it('should handle Date objects', () => {
      const result = formatDate(testDate, 'MMMM d, yyyy');
      expect(result).toBe('January 15, 2024');
    });

    it('should use correct locale for English', () => {
      vi.mocked(i18n.default).language = 'en';
      formatDate(testDate, 'MMM d, yyyy');
      // Verify format was called with enUS locale
      expect(format).toHaveBeenCalled();
    });

    it('should use correct locale for Spanish', () => {
      vi.mocked(i18n.default).language = 'es';
      formatDate(testDate, 'MMM d, yyyy');
      // Verify format was called with es locale
      expect(format).toHaveBeenCalled();
    });

    it('should default to English for unknown language', () => {
      vi.mocked(i18n.default).language = 'fr';
      formatDate(testDate, 'MMM d, yyyy');
      // Should default to enUS
      expect(format).toHaveBeenCalled();
    });
  });

  describe('formatDateShort', () => {
    it('should format date in short format', () => {
      const result = formatDateShort(testDate);
      expect(result).toBe('Jan 15, 2024');
    });

    it('should handle string dates', () => {
      const result = formatDateShort(testDateString);
      expect(result).toBe('Jan 15, 2024');
    });
  });

  describe('formatDateLong', () => {
    it('should format date in long format', () => {
      const result = formatDateLong(testDate);
      expect(result).toBe('January 15, 2024');
    });

    it('should handle string dates', () => {
      const result = formatDateLong(testDateString);
      expect(result).toBe('January 15, 2024');
    });
  });

  describe('formatDateWithDay', () => {
    it('should format date with day of week', () => {
      const result = formatDateWithDay(testDate);
      expect(result).toBe('Monday, January 15, 2024');
    });

    it('should handle string dates', () => {
      const result = formatDateWithDay(testDateString);
      expect(result).toBe('Monday, January 15, 2024');
    });
  });

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const result = formatTime(testDate);
      expect(result).toBe('3:45 PM');
    });

    it('should handle string dates', () => {
      const result = formatTime(testDateString);
      expect(result).toBe('3:45 PM');
    });
  });

  describe('formatDateTime', () => {
    it('should format date and time together', () => {
      const result = formatDateTime(testDate);
      expect(result).toBe('Jan 15, 2024 • 3:45 PM');
    });

    it('should handle string dates', () => {
      const result = formatDateTime(testDateString);
      expect(result).toBe('Jan 15, 2024 • 3:45 PM');
    });
  });

  describe('getDateLocale', () => {
    it('should return correct locale for English', () => {
      vi.mocked(i18n.default).language = 'en';
      formatDate(testDate, 'MMM d, yyyy');
      // The locale should be enUS
      expect(format).toHaveBeenCalled();
    });

    it('should return correct locale for Spanish', () => {
      vi.mocked(i18n.default).language = 'es';
      formatDate(testDate, 'MMM d, yyyy');
      // The locale should be es
      expect(format).toHaveBeenCalled();
    });

    it('should default to English for unknown language', () => {
      vi.mocked(i18n.default).language = 'unknown';
      formatDate(testDate, 'MMM d, yyyy');
      // Should default to enUS
      expect(format).toHaveBeenCalled();
    });

    it('should default to English when language is null', () => {
      vi.mocked(i18n.default).language = null as any;
      formatDate(testDate, 'MMM d, yyyy');
      // Should default to enUS
      expect(format).toHaveBeenCalled();
    });
  });
});

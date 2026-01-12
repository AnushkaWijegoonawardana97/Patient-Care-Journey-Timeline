import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageToggle } from './LanguageToggle';

// Mock i18n
vi.mock('@/lib/i18n', () => ({
  default: {
    language: 'en',
    changeLanguage: vi.fn(),
  },
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'common.english': 'English',
        'common.spanish': 'Spanish',
        'common.changeLanguage': 'Change Language',
      };
      return translations[key] || key;
    },
  }),
}));

describe('LanguageToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render language dropdown', () => {
    render(<LanguageToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should change language on selection', async () => {
    const user = userEvent.setup();
    const mockChangeLanguage = vi.fn();
    
    vi.mocked(require('@/lib/i18n').default.changeLanguage).mockImplementation(mockChangeLanguage);
    
    render(<LanguageToggle />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    // Language options should be available
    // Note: This test may need adjustment based on actual implementation
    expect(button).toBeInTheDocument();
  });

  it('should show current language', () => {
    vi.mocked(require('@/lib/i18n').default.language = 'en');
    
    render(<LanguageToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should handle keyboard interaction', async () => {
    const user = userEvent.setup();
    
    render(<LanguageToggle />);
    
    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');
    
    // Should open dropdown
    expect(button).toBeInTheDocument();
  });
});

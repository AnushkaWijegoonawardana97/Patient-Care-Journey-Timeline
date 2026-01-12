import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TopNavigation } from './TopNavigation';

// Mock hooks and context
vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}));

vi.mock('@/contexts/AuthContext', () => ({
  useAuthContext: () => ({
    user: { id: 'u_001', name: 'Test User', email: 'test@example.com' },
    token: 'token',
    isAuthenticated: true,
    isLoading: false,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
  }),
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navigation.dashboard': 'Dashboard',
        'navigation.careJourney': 'Care Journey',
        'navigation.addOnServices': 'Add-On Services',
        'navigation.settings': 'Settings',
        'common.english': 'English',
        'common.spanish': 'Spanish',
        'common.changeLanguage': 'Change Language',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock i18n
vi.mock('@/lib/i18n', () => ({
  default: {
    language: 'en',
    changeLanguage: vi.fn(),
  },
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

describe('TopNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render patient name', () => {
    render(<TopNavigation patientName="Maria Santos" />, { wrapper: createWrapper() });
    
    expect(screen.getByText(/Maria Santos/)).toBeInTheDocument();
  });

  it('should show navigation items', () => {
    render(<TopNavigation />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Care Journey')).toBeInTheDocument();
  });

  it('should render language toggle', () => {
    render(<TopNavigation />, { wrapper: createWrapper() });
    
    const languageButton = screen.getByLabelText('Change Language');
    expect(languageButton).toBeInTheDocument();
  });

  it('should render theme toggle', () => {
    render(<TopNavigation />, { wrapper: createWrapper() });
    
    // Theme toggle should be present
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
  });

  it('should handle activeNavItem prop', () => {
    render(<TopNavigation activeNavItem="careJourney" />, { wrapper: createWrapper() });
    
    const careJourneyLink = screen.getByText('Care Journey').closest('a');
    expect(careJourneyLink).toHaveAttribute('aria-current', 'page');
  });

  it('should render logo', () => {
    render(<TopNavigation />, { wrapper: createWrapper() });
    
    const logo = screen.getByAltText('Raya Health');
    expect(logo).toBeInTheDocument();
  });
});

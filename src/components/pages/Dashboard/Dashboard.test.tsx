import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Dashboard } from './Dashboard';

// Mock useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: { id: 'u_001', name: 'Test User', email: 'test@example.com' },
    token: 'token',
    isAuthenticated: true,
    isLoading: false,
    login: vi.fn(),
    loginAsync: vi.fn(),
    isLoginLoading: false,
    loginError: null,
    register: vi.fn(),
    registerAsync: vi.fn(),
    isRegisterLoading: false,
    registerError: null,
    logout: vi.fn(),
    logoutAsync: vi.fn(),
    isLogoutLoading: false,
  }),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(component, { wrapper: createWrapper() });
};

// Mock usePatientJourney
vi.mock('@/hooks/usePatientJourney', () => ({
  usePatientJourney: () => ({
    journey: null,
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
  }),
}));

// Mock react-i18next
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next');
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        changeLanguage: vi.fn(),
        language: 'en',
      },
    }),
  };
});

describe('Dashboard', () => {
  it('should render dashboard content', () => {
    renderWithRouter(<Dashboard />);
    // Dashboard renders WelcomeBanner and other components
    // Check for skip link (part of DashboardLayout)
    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    // DashboardLayout should be rendered
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('should render dashboard layout', () => {
    renderWithRouter(<Dashboard />);
    // Dashboard should render within DashboardLayout
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
    // Should have skip link
    expect(screen.getByRole('link', { name: /skip to main content/i })).toBeInTheDocument();
  });
});

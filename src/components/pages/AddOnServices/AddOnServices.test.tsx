import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { AddOnServices } from './AddOnServices';
import * as useAddOnServices from '@/hooks/useAddOnServices';
import * as useAuth from '@/hooks/useAuth';

// Mock hooks
vi.mock('@/hooks/useAddOnServices');
vi.mock('@/hooks/useAuth');

// Mock react-i18next
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next');
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => {
        const translations: Record<string, string> = {
          'addOnServices.title': 'Add-On Services',
          'addOnServices.subtitle': 'Enhance your care journey',
          'addOnServices.unableToLoad': 'Unable to load services',
          'addOnServices.unableToLoadMessage': 'Please try again later',
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

describe('AddOnServices', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render page with services', () => {
    const mockServices = [
      {
        id: 's_001',
        name: 'Service 1',
        description: 'Description 1',
        status: 'available' as const,
        icon: () => <svg />,
      },
    ];

    vi.mocked(useAddOnServices.useAddOnServices).mockReturnValue({
      services: mockServices,
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    vi.mocked(useAuth.useAuth).mockReturnValue({
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
    });

    render(<AddOnServices />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Add-On Services')).toBeInTheDocument();
  });

  it('should handle loading state', () => {
    vi.mocked(useAddOnServices.useAddOnServices).mockReturnValue({
      services: undefined,
      isLoading: true,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    vi.mocked(useAuth.useAuth).mockReturnValue({
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
    });

    render(<AddOnServices />, { wrapper: createWrapper() });
    
    // Should show loading skeleton
    expect(screen.queryByText('Add-On Services')).not.toBeInTheDocument();
  });

  it('should handle error state', () => {
    vi.mocked(useAddOnServices.useAddOnServices).mockReturnValue({
      services: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to load'),
      refetch: vi.fn(),
    });

    vi.mocked(useAuth.useAuth).mockReturnValue({
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
    });

    render(<AddOnServices />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Unable to load services')).toBeInTheDocument();
  });

  it('should use DashboardLayout', () => {
    vi.mocked(useAddOnServices.useAddOnServices).mockReturnValue({
      services: [],
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
    });

    vi.mocked(useAuth.useAuth).mockReturnValue({
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
    });

    render(<AddOnServices />, { wrapper: createWrapper() });
    
    // DashboardLayout should be rendered (it includes SkipLink)
    expect(screen.getByText('Skip to main content')).toBeInTheDocument();
  });
});

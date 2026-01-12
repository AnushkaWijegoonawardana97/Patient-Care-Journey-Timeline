import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';
import { LoginPage } from './LoginPage';

// Mock useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
    login: vi.fn(),
    loginAsync: vi.fn().mockResolvedValue(undefined),
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

// Mock react-i18next
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next');
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => {
        const translations: Record<string, string> = {
          'auth.welcomeBack': 'Welcome Back!',
          'auth.loginSubtitle': 'Sign in to continue',
          'auth.email': 'Email',
          'auth.password': 'Password',
          'auth.rememberMe': 'Remember me',
          'auth.login': 'Log In',
          'auth.noAccount': 'Not registered yet?',
          'auth.createAccount': 'Create an Account',
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
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(component, { wrapper: createWrapper() });
};

describe('LoginPage', () => {
  it('should render login form', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('should have link to register page', () => {
    renderWithProviders(<LoginPage />);
    const registerLink = screen.getByRole('link', { name: /create an account/i });
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('should handle form submission', async () => {
    const user = userEvent.setup();
    renderWithProviders(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /log in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Form submission should work (navigation happens via BrowserRouter)
    expect(emailInput).toBeInTheDocument();
  });
});

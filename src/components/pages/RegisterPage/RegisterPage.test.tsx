import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RegisterPage } from './RegisterPage';

// Mock useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
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

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'auth.register.title': 'Create Your Account',
        'auth.register.subtitle': 'Sign up to get started',
        'auth.register.fullName': 'Full Name',
        'auth.register.email': 'Email',
        'auth.register.password': 'Password',
        'auth.register.confirmPassword': 'Confirm Password',
        'auth.register.namePlaceholder': 'Enter your full name',
        'auth.register.emailPlaceholder': 'Enter your email',
        'auth.register.passwordPlaceholder': 'Enter your password',
        'auth.register.acceptTerms': 'I accept the terms and conditions',
        'auth.register.signUp': 'Create Account',
        'auth.register.signUpWithGoogle': 'Sign up with Google',
        'auth.register.haveAccount': 'Already have an account?',
        'auth.register.signIn': 'Log in',
        'common.loading': 'Loading...',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'auth.register.title': 'Create Your Account',
        'auth.register.subtitle': 'Sign up to get started',
        'auth.register.fullName': 'Full Name',
        'auth.register.email': 'Email',
        'auth.register.password': 'Password',
        'auth.register.confirmPassword': 'Confirm Password',
        'auth.register.namePlaceholder': 'Enter your full name',
        'auth.register.emailPlaceholder': 'Enter your email',
        'auth.register.passwordPlaceholder': 'Enter your password',
        'auth.register.acceptTerms': 'I accept the terms and conditions',
        'auth.register.signUp': 'Create Account',
        'auth.register.signUpWithGoogle': 'Sign up with Google',
        'auth.register.haveAccount': 'Already have an account?',
        'auth.register.signIn': 'Log in',
        'common.loading': 'Loading...',
      };
      return translations[key] || key;
    },
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
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
};

const renderWithRouter = (component: React.ReactElement) => {
  return render(component, { wrapper: createWrapper() });
};

describe('RegisterPage', () => {
  it('should render registration form', () => {
    renderWithRouter(<RegisterPage />);
    expect(screen.getByText('Create Your Account')).toBeInTheDocument();
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
  });

  it('should have link to login page', () => {
    renderWithRouter(<RegisterPage />);
    const loginLink = screen.getByRole('link', { name: /log in/i });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/');
  });
});

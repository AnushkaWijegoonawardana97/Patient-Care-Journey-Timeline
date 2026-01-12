import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorState } from './ErrorState';

// Mock react-i18next
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next');
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => {
        const translations: Record<string, string> = {
          'errors.generic': 'Something went wrong',
          'errors.genericMessage': 'An error occurred. Please try again.',
          'common.buttons.tryAgain': 'Try Again',
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

describe('ErrorState', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render error message', () => {
    render(<ErrorState message="Custom error message" />);
    
    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('should render default error message when not provided', () => {
    render(<ErrorState />);
    
    expect(screen.getByText('An error occurred. Please try again.')).toBeInTheDocument();
  });

  it('should render retry button when onRetry is provided', () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);
    
    const retryButton = screen.getByRole('button', { name: /try again/i });
    expect(retryButton).toBeInTheDocument();
  });

  it('should handle retry callback', async () => {
    const user = userEvent.setup();
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} />);
    
    const retryButton = screen.getByRole('button', { name: /try again/i });
    await user.click(retryButton);
    
    expect(onRetry).toHaveBeenCalledTimes(1);
  });

  it('should display error icon', () => {
    render(<ErrorState />);
    
    // Error icon should be rendered
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should render custom title', () => {
    render(<ErrorState title="Custom Error Title" />);
    
    expect(screen.getByText('Custom Error Title')).toBeInTheDocument();
  });

  it('should render default title when not provided', () => {
    render(<ErrorState />);
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('should render custom retry label', () => {
    const onRetry = vi.fn();
    render(<ErrorState onRetry={onRetry} retryLabel="Retry" />);
    
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('should handle custom className', () => {
    const { container } = render(
      <ErrorState className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

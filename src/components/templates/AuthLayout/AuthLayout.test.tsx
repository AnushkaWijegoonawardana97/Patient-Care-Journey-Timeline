import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthLayout } from './AuthLayout';

// Mock SkipLink
vi.mock('@/components/atoms/SkipLink/SkipLink', () => ({
  SkipLink: ({ href, children }: any) => (
    <a href={href} data-testid={`skip-link-${href}`}>
      {children}
    </a>
  ),
}));

describe('AuthLayout', () => {
  const mockProps = {
    backgroundImageUrl: '/auth-bg.jpg',
    title: 'Welcome Back!',
    description: 'Sign in to your account',
    formContent: <div data-testid="form-content">Form Content</div>,
    footerLink: <div data-testid="footer-link">Footer Link</div>,
  };

  it('should render form content', () => {
    render(<AuthLayout {...mockProps} />);
    
    expect(screen.getByTestId('form-content')).toBeInTheDocument();
  });

  it('should render title and description', () => {
    render(<AuthLayout {...mockProps} />);
    
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
  });

  it('should render footer link', () => {
    render(<AuthLayout {...mockProps} />);
    
    expect(screen.getByTestId('footer-link')).toBeInTheDocument();
  });

  it('should show background image on mobile', () => {
    const { container } = render(<AuthLayout {...mockProps} />);
    
    const bgDiv = container.querySelector('.lg\\:hidden');
    expect(bgDiv).toBeInTheDocument();
    expect(bgDiv).toHaveStyle({
      backgroundImage: 'url(/auth-bg.jpg)',
    });
  });

  it('should include SkipLink', () => {
    render(<AuthLayout {...mockProps} />);
    
    expect(screen.getByTestId('skip-link-#main-content')).toBeInTheDocument();
  });

  it('should have main content with correct id and role', () => {
    render(<AuthLayout {...mockProps} />);
    
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('should render logo', () => {
    render(<AuthLayout {...mockProps} />);
    
    const logo = screen.getByAltText('Raya Health');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/logo-dark.png');
  });
});

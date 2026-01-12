import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavigationItem } from './NavigationItem';
import { LayoutDashboard } from 'lucide-react';

const renderWithRouter = (component: React.ReactElement, initialEntries = ['/dashboard']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
};

describe('NavigationItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with icon and label', () => {
    renderWithRouter(
      <NavigationItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
    );

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    // Icon should be present (hidden from screen readers)
    const icon = screen.getByRole('link').querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should highlight when active', () => {
    renderWithRouter(
      <NavigationItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" active={true} />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('should link to correct route', () => {
    renderWithRouter(
      <NavigationItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/dashboard');
  });

  it('should handle aria-current when active', () => {
    renderWithRouter(
      <NavigationItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" active={true} />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-current', 'page');
  });

  it('should not have aria-current when inactive and location does not match', () => {
    renderWithRouter(
      <NavigationItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" active={false} />,
      ['/other-route'] // Use different route so location doesn't match
    );

    const link = screen.getByRole('link');
    // When active={false} and location doesn't match, should not have aria-current
    expect(link).not.toHaveAttribute('aria-current');
  });

  it('should apply correct styling for active state', () => {
    renderWithRouter(
      <NavigationItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" active={true} />
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('bg-primary-light');
  });

  it('should apply correct styling for inactive state', () => {
    renderWithRouter(
      <NavigationItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" active={false} />,
      ['/other-route'] // Use different route so location doesn't match
    );

    const link = screen.getByRole('link');
    expect(link).toHaveClass('text-text-secondary');
  });

  it('should determine active state from location when active prop is not provided', () => {
    renderWithRouter(
      <NavigationItem icon={LayoutDashboard} label="Dashboard" to="/dashboard" />,
      ['/dashboard']
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-current', 'page');
  });
});

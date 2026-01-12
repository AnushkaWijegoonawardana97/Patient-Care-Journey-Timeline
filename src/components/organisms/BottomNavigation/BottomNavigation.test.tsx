import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navigation.dashboard': 'Dashboard',
        'navigation.careJourney': 'Care Journey',
        'navigation.addOn': 'Add-On Services',
        'navigation.settings': 'Settings',
      };
      return translations[key] || key;
    },
  }),
}));

const renderWithRouter = (component: React.ReactElement, initialEntries = ['/dashboard']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      {component}
    </MemoryRouter>
  );
};

describe('BottomNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render all navigation items', () => {
    renderWithRouter(<BottomNavigation />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Care Journey')).toBeInTheDocument();
    expect(screen.getByText('Add-On Services')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should highlight active navigation item', () => {
    renderWithRouter(<BottomNavigation activeNavItem="dashboard" />, ['/dashboard']);

    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveAttribute('aria-current', 'page');
  });

  it('should highlight active item based on location pathname', () => {
    renderWithRouter(<BottomNavigation />, ['/care-journey']);

    const careJourneyLink = screen.getByText('Care Journey').closest('a');
    expect(careJourneyLink).toHaveAttribute('aria-current', 'page');
  });

  it('should link to correct routes', () => {
    renderWithRouter(<BottomNavigation />);

    expect(screen.getByText('Dashboard').closest('a')).toHaveAttribute('href', '/dashboard');
    expect(screen.getByText('Care Journey').closest('a')).toHaveAttribute('href', '/care-journey');
    expect(screen.getByText('Add-On Services').closest('a')).toHaveAttribute('href', '/add-on-services');
    expect(screen.getByText('Settings').closest('a')).toHaveAttribute('href', '/settings');
  });

  it('should use correct icons for each item', () => {
    renderWithRouter(<BottomNavigation />);

    // Icons are rendered as SVG elements
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(4);
    // Each link should contain an icon (SVG)
    links.forEach(link => {
      expect(link.querySelector('svg')).toBeInTheDocument();
    });
  });

  it('should handle activeNavItem prop correctly', () => {
    renderWithRouter(<BottomNavigation activeNavItem="settings" />, ['/dashboard']);

    const settingsLink = screen.getByText('Settings').closest('a');
    expect(settingsLink).toHaveAttribute('aria-current', 'page');
  });

  it('should work with useLocation hook', () => {
    renderWithRouter(<BottomNavigation />, ['/settings']);

    const settingsLink = screen.getByText('Settings').closest('a');
    expect(settingsLink).toHaveAttribute('aria-current', 'page');
  });

  it('should have nav element with proper accessibility', () => {
    renderWithRouter(<BottomNavigation />);

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
  });
});

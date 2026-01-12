import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { SidebarNavigation } from './SidebarNavigation';

// Mock useFocusTrap
vi.mock('@/hooks/useFocusTrap', () => ({
  useFocusTrap: vi.fn(),
}));

// Mock react-i18next
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next');
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => {
        const translations: Record<string, string> = {
          'navigation.dashboard': 'Dashboard',
          'navigation.careJourney': 'Care Journey',
          'navigation.addOnServices': 'Add-On Services',
          'navigation.settings': 'Settings',
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

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('SidebarNavigation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render navigation items', () => {
    renderWithRouter(<SidebarNavigation />);
    
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Care Journey')).toBeInTheDocument();
  });

  it('should have mobile menu toggle button', () => {
    renderWithRouter(<SidebarNavigation />);
    
    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toBeInTheDocument();
  });

  it('should toggle mobile menu on button click', async () => {
    const user = userEvent.setup();
    renderWithRouter(<SidebarNavigation />);
    
    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    
    await user.click(toggleButton);
    
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
  });

  it('should highlight active item', () => {
    renderWithRouter(<SidebarNavigation activeNavItem="dashboard" />);
    
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    expect(dashboardLink).toHaveAttribute('aria-current', 'page');
  });

  it('should close mobile menu on item click', async () => {
    const user = userEvent.setup();
    renderWithRouter(<SidebarNavigation />);
    
    const toggleButton = screen.getByLabelText('Toggle menu');
    await user.click(toggleButton);
    
    expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
    
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    if (dashboardLink) {
      await user.click(dashboardLink);
      // Menu should close after navigation
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('should handle aria-expanded correctly', () => {
    renderWithRouter(<SidebarNavigation />);
    
    const toggleButton = screen.getByLabelText('Toggle menu');
    expect(toggleButton).toHaveAttribute('aria-expanded');
  });
});

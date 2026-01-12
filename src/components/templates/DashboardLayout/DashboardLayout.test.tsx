import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { DashboardLayout } from './DashboardLayout';

// Mock child components
vi.mock('@/components/organisms/TopNavigation/TopNavigation', () => ({
  TopNavigation: ({ activeNavItem, patientName }: any) => (
    <div data-testid="top-navigation">
      TopNavigation - {activeNavItem} - {patientName}
    </div>
  ),
}));

vi.mock('@/components/organisms/BottomNavigation/BottomNavigation', () => ({
  BottomNavigation: ({ activeNavItem }: any) => (
    <div data-testid="bottom-navigation">
      BottomNavigation - {activeNavItem}
    </div>
  ),
}));

vi.mock('@/components/atoms/SkipLink/SkipLink', () => ({
  SkipLink: ({ href, children }: any) => (
    <a href={href} data-testid={`skip-link-${href}`}>
      {children}
    </a>
  ),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('DashboardLayout', () => {
  it('should render TopNavigation', () => {
    renderWithRouter(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );
    
    expect(screen.getByTestId('top-navigation')).toBeInTheDocument();
  });

  it('should render BottomNavigation on mobile', () => {
    renderWithRouter(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );
    
    expect(screen.getByTestId('bottom-navigation')).toBeInTheDocument();
  });

  it('should render children in main content area', () => {
    renderWithRouter(
      <DashboardLayout>
        <div data-testid="test-content">Test Content</div>
      </DashboardLayout>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('should include SkipLink', () => {
    renderWithRouter(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );
    
    expect(screen.getByTestId('skip-link-#main-content')).toBeInTheDocument();
    expect(screen.getByTestId('skip-link-#navigation')).toBeInTheDocument();
  });

  it('should have main content with correct id and role', () => {
    renderWithRouter(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    );
    
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('should handle activeNavItem prop', () => {
    renderWithRouter(
      <DashboardLayout activeNavItem="careJourney">
        <div>Test Content</div>
      </DashboardLayout>
    );
    
    const topNav = screen.getByTestId('top-navigation');
    expect(topNav).toHaveTextContent('careJourney');
  });

  it('should handle patientName prop', () => {
    renderWithRouter(
      <DashboardLayout patientName="Maria Santos">
        <div>Test Content</div>
      </DashboardLayout>
    );
    
    expect(screen.getByText(/Maria Santos/)).toBeInTheDocument();
  });
});

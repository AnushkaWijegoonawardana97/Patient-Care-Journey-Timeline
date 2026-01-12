import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { WelcomeBanner } from './WelcomeBanner';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'navigation.careJourney': 'Care Journey',
      };
      return translations[key] || key;
    },
  }),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('WelcomeBanner', () => {
  it('should render welcome message with patient name', () => {
    renderWithRouter(
      <WelcomeBanner
        patientName="Maria Santos"
        promptMessage="Welcome to your care journey"
      />
    );
    
    expect(screen.getByText(/Welcome, Maria Santos!/)).toBeInTheDocument();
    expect(screen.getByText('Welcome to your care journey')).toBeInTheDocument();
  });

  it('should render primary action button', () => {
    renderWithRouter(
      <WelcomeBanner
        patientName="Maria"
        primaryActionLabel="View Journey"
        primaryActionTo="/care-journey"
      />
    );
    
    expect(screen.getByText('View Journey')).toBeInTheDocument();
  });

  it('should render secondary action button when provided', () => {
    renderWithRouter(
      <WelcomeBanner
        patientName="Maria"
        secondaryActionLabel="Learn More"
        secondaryActionTo="/about"
      />
    );
    
    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  it('should handle missing patient name', () => {
    renderWithRouter(
      <WelcomeBanner
        patientName=""
        promptMessage="Welcome"
      />
    );
    
    expect(screen.getByText(/Welcome, !/)).toBeInTheDocument();
  });

  it('should render image when provided', () => {
    renderWithRouter(
      <WelcomeBanner
        patientName="Maria"
        imageUrl="/welcome-image.jpg"
      />
    );
    
    const img = screen.getByAltText('Care journey');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/welcome-image.jpg');
  });
});

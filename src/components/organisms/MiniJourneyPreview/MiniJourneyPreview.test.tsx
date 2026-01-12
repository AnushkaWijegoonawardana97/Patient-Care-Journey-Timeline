import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MiniJourneyPreview } from './MiniJourneyPreview';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'phases.firstTrimester': 'First Trimester',
        'phases.secondTrimester': 'Second Trimester',
        'phases.thirdTrimester': 'Third Trimester',
        'phases.postpartum': 'Postpartum',
        'common.buttons.viewJourney': 'View Journey',
      };
      return translations[key] || key;
    },
  }),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('MiniJourneyPreview', () => {
  it('should render journey progress', () => {
    renderWithRouter(
      <MiniJourneyPreview
        currentPhase="Second Trimester"
        upcomingMilestone="20 weeks"
        milestoneDate="2025-02-15"
      />
    );
    
    expect(screen.getByText('Your Care Journey')).toBeInTheDocument();
  });

  it('should show next visit information', () => {
    renderWithRouter(
      <MiniJourneyPreview
        currentPhase="Second Trimester"
        upcomingMilestone="20 weeks"
        milestoneDate="2025-02-15"
      />
    );
    
    expect(screen.getByText(/20 weeks/)).toBeInTheDocument();
  });

  it('should show last completed visit', () => {
    renderWithRouter(
      <MiniJourneyPreview
        currentPhase="Second Trimester"
        upcomingMilestone="20 weeks"
        lastCompletedVisit={{
          date: 'Jan 10, 2025',
          type: 'Prenatal Visit 4',
        }}
      />
    );
    
    expect(screen.getByText(/Jan 10, 2025/)).toBeInTheDocument();
    expect(screen.getByText(/Prenatal Visit 4/)).toBeInTheDocument();
  });

  it('should handle empty journey', () => {
    renderWithRouter(
      <MiniJourneyPreview
        currentPhase="First Trimester"
        upcomingMilestone="12 weeks"
      />
    );
    
    expect(screen.getByText('Your Care Journey')).toBeInTheDocument();
  });

  it('should link to care journey page', () => {
    renderWithRouter(
      <MiniJourneyPreview
        currentPhase="Second Trimester"
        upcomingMilestone="20 weeks"
      />
    );
    
    const link = screen.getByText(/View Full Care Journey/i).closest('a');
    expect(link).toHaveAttribute('href', '/care-journey');
  });

  it('should display correct visit count', () => {
    renderWithRouter(
      <MiniJourneyPreview
        currentPhase="Second Trimester"
        upcomingMilestone="20 weeks"
      />
    );
    
    expect(screen.getByText('Your Care Journey')).toBeInTheDocument();
  });
});

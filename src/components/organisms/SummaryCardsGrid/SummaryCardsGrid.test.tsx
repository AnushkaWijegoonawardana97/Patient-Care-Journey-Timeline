import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SummaryCardsGrid } from './SummaryCardsGrid';

describe('SummaryCardsGrid', () => {
  const mockProps = {
    visitProgress: {
      completed: 5,
      total: 8,
    },
    nextVisit: {
      date: 'Jan 20, 2024',
      time: '10:00 AM',
      type: 'Prenatal Visit 6',
    },
    journeyStatus: {
      status: 'On Track',
      message: 'You are doing great!',
    },
  };

  it('should render all summary cards', () => {
    render(<SummaryCardsGrid {...mockProps} />);
    
    expect(screen.getByText('Visit Progress')).toBeInTheDocument();
    expect(screen.getByText('Next Visit')).toBeInTheDocument();
    expect(screen.getByText('Journey Status')).toBeInTheDocument();
  });

  it('should calculate progress correctly', () => {
    render(<SummaryCardsGrid {...mockProps} />);
    
    expect(screen.getByText('5 of 8')).toBeInTheDocument();
    expect(screen.getByText('63% completed')).toBeInTheDocument();
  });

  it('should display visit statistics correctly', () => {
    render(<SummaryCardsGrid {...mockProps} />);
    
    expect(screen.getByText('Jan 20, 2024')).toBeInTheDocument();
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
    expect(screen.getByText('Prenatal Visit 6')).toBeInTheDocument();
  });

  it('should display journey status', () => {
    render(<SummaryCardsGrid {...mockProps} />);
    
    expect(screen.getByText('On Track')).toBeInTheDocument();
    expect(screen.getByText('You are doing great!')).toBeInTheDocument();
  });

  it('should handle empty journey status message', () => {
    const propsWithoutMessage = {
      ...mockProps,
      journeyStatus: {
        status: 'On Track',
      },
    };
    
    render(<SummaryCardsGrid {...propsWithoutMessage} />);
    
    expect(screen.getByText('On Track')).toBeInTheDocument();
  });

  it('should calculate 100% progress correctly', () => {
    const props = {
      ...mockProps,
      visitProgress: {
        completed: 8,
        total: 8,
      },
    };
    
    render(<SummaryCardsGrid {...props} />);
    
    expect(screen.getByText('100% completed')).toBeInTheDocument();
  });

  it('should calculate 0% progress correctly', () => {
    const props = {
      ...mockProps,
      visitProgress: {
        completed: 0,
        total: 8,
      },
    };
    
    render(<SummaryCardsGrid {...props} />);
    
    expect(screen.getByText('0% completed')).toBeInTheDocument();
  });
});

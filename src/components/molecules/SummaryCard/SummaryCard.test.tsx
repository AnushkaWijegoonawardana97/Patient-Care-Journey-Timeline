import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SummaryCard } from './SummaryCard';
import { Calendar } from 'lucide-react';

describe('SummaryCard', () => {
  it('should render title and value', () => {
    render(<SummaryCard title="Total Visits" value="8" />);
    
    expect(screen.getByText('Total Visits')).toBeInTheDocument();
    expect(screen.getByText('8')).toBeInTheDocument();
  });

  it('should render description when provided', () => {
    render(
      <SummaryCard
        title="Total Visits"
        value="8"
        description="Out of 12 scheduled"
      />
    );
    
    expect(screen.getByText('Out of 12 scheduled')).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    const { container } = render(
      <SummaryCard
        title="Total Visits"
        value="8"
        icon={Calendar}
      />
    );
    
    // Icon should be rendered as SVG (aria-hidden, not img role)
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('aria-hidden', 'true');
  });

  it('should handle string values', () => {
    render(<SummaryCard title="Total Visits" value="8" />);
    
    const valueElement = screen.getByText('8');
    expect(valueElement.tagName).toBe('P');
  });

  it('should handle ReactNode values', () => {
    render(
      <SummaryCard
        title="Progress"
        value={<div data-testid="custom-value">Custom Value</div>}
      />
    );
    
    expect(screen.getByTestId('custom-value')).toBeInTheDocument();
    expect(screen.getByText('Custom Value')).toBeInTheDocument();
  });

  it('should apply correct icon colors', () => {
    const { container, rerender } = render(
      <SummaryCard
        title="Test"
        value="1"
        icon={Calendar}
        iconColor="text-primary"
      />
    );
    
    expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();

    rerender(
      <SummaryCard
        title="Test"
        value="1"
        icon={Calendar}
        iconColor="text-secondary-success"
      />
    );
    
    expect(container.querySelector('.bg-gradient-to-br')).toBeInTheDocument();
  });

  it('should handle custom className', () => {
    const { container } = render(
      <SummaryCard
        title="Test"
        value="1"
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

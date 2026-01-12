import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VisitInfoItem } from './VisitInfoItem';
import { Calendar } from 'lucide-react';

describe('VisitInfoItem', () => {
  it('should render label and value', () => {
    render(
      <VisitInfoItem
        icon={Calendar}
        label="Scheduled Date"
        value="Jan 15, 2024"
      />
    );
    
    expect(screen.getByText('Scheduled Date')).toBeInTheDocument();
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    render(
      <VisitInfoItem
        icon={Calendar}
        label="Date"
        value="Jan 15"
      />
    );
    
    // Icon should be rendered as SVG
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should handle different value types', () => {
    render(
      <VisitInfoItem
        icon={Calendar}
        label="Date"
        value={<span data-testid="custom-value">Custom Value</span>}
      />
    );
    
    expect(screen.getByTestId('custom-value')).toBeInTheDocument();
  });

  it('should render secondary value when provided', () => {
    render(
      <VisitInfoItem
        icon={Calendar}
        label="Date"
        value="Jan 15, 2024"
        secondaryValue="10:00 AM"
      />
    );
    
    expect(screen.getByText('10:00 AM')).toBeInTheDocument();
  });

  it('should handle custom icon background', () => {
    const { container } = render(
      <VisitInfoItem
        icon={Calendar}
        label="Date"
        value="Jan 15"
        iconBg="bg-blue-100"
      />
    );
    
    expect(container.querySelector('.bg-blue-100')).toBeInTheDocument();
  });

  it('should handle custom icon color', () => {
    const { container } = render(
      <VisitInfoItem
        icon={Calendar}
        label="Date"
        value="Jan 15"
        iconColor="text-blue-500"
      />
    );
    
    expect(container.querySelector('.text-blue-500')).toBeInTheDocument();
  });

  it('should apply correct styling', () => {
    const { container } = render(
      <VisitInfoItem
        icon={Calendar}
        label="Date"
        value="Jan 15"
      />
    );
    
    expect(container.firstChild).toHaveClass('flex', 'items-start');
  });

  it('should handle custom className', () => {
    const { container } = render(
      <VisitInfoItem
        icon={Calendar}
        label="Date"
        value="Jan 15"
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

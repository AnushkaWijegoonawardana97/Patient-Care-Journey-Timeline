import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { InfoCard } from './InfoCard';
import { Calendar } from 'lucide-react';

describe('InfoCard', () => {
  it('should render title and content', () => {
    render(
      <InfoCard
        icon={Calendar}
        label="Date"
        value="Jan 15, 2024"
      />
    );
    
    expect(screen.getByText('Date')).toBeInTheDocument();
    expect(screen.getByText('Jan 15, 2024')).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    render(
      <InfoCard
        icon={Calendar}
        label="Date"
        value="Jan 15, 2024"
      />
    );
    
    // Icon should be rendered as SVG
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should handle different icon background colors', () => {
    const { container, rerender } = render(
      <InfoCard
        icon={Calendar}
        label="Date"
        value="Jan 15"
        iconBgColor="bg-blue-100"
      />
    );
    
    expect(container.querySelector('.bg-blue-100')).toBeInTheDocument();

    rerender(
      <InfoCard
        icon={Calendar}
        label="Date"
        value="Jan 15"
        iconBgColor="bg-red-100"
      />
    );
    
    expect(container.querySelector('.bg-red-100')).toBeInTheDocument();
  });

  it('should handle different icon colors', () => {
    const { container, rerender } = render(
      <InfoCard
        icon={Calendar}
        label="Date"
        value="Jan 15"
        iconColor="text-blue-500"
      />
    );
    
    expect(container.querySelector('.text-blue-500')).toBeInTheDocument();

    rerender(
      <InfoCard
        icon={Calendar}
        label="Date"
        value="Jan 15"
        iconColor="text-red-500"
      />
    );
    
    expect(container.querySelector('.text-red-500')).toBeInTheDocument();
  });

  it('should apply correct styling', () => {
    const { container } = render(
      <InfoCard
        icon={Calendar}
        label="Date"
        value="Jan 15"
      />
    );
    
    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'items-center');
  });

  it('should handle custom className', () => {
    const { container } = render(
      <InfoCard
        icon={Calendar}
        label="Date"
        value="Jan 15"
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

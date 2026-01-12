import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CircularProgress } from './CircularProgress';

describe('CircularProgress', () => {
  it('should render progress circle', () => {
    const { container } = render(<CircularProgress percentage={50} />);
    
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('should display correct percentage', () => {
    render(<CircularProgress percentage={75} />);
    
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('should round percentage correctly', () => {
    render(<CircularProgress percentage={75.7} />);
    
    expect(screen.getByText('76%')).toBeInTheDocument();
  });

  it('should handle different sizes', () => {
    const { container, rerender } = render(<CircularProgress percentage={50} size={64} />);
    let svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');

    rerender(<CircularProgress percentage={50} size={100} />);
    svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '100');
    expect(svg).toHaveAttribute('height', '100');
  });

  it('should show percentage text', () => {
    render(<CircularProgress percentage={50} />);
    
    const percentageText = screen.getByText('50%');
    expect(percentageText).toBeInTheDocument();
    expect(percentageText).toHaveClass('absolute');
  });

  it('should handle custom className', () => {
    const { container } = render(
      <CircularProgress percentage={50} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should have proper aria-label', () => {
    const { container } = render(<CircularProgress percentage={50} />);
    
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('aria-label', '50% complete');
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LoadingSkeleton } from './LoadingSkeleton';

describe('LoadingSkeleton', () => {
  it('should render skeleton with correct variant', () => {
    const { container } = render(<LoadingSkeleton variant="dashboard" />);
    
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('should handle different variants', () => {
    const variants = ['dashboard', 'journey', 'services', 'cards', 'list'] as const;
    
    variants.forEach(variant => {
      const { container, unmount } = render(<LoadingSkeleton variant={variant} />);
      expect(container.firstChild).toBeInTheDocument();
      unmount();
    });
  });

  it('should apply animation class', () => {
    const { container } = render(<LoadingSkeleton variant="dashboard" />);
    
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('should handle custom className', () => {
    const { container } = render(
      <LoadingSkeleton variant="dashboard" className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should use count prop for services variant', () => {
    const { container } = render(<LoadingSkeleton variant="services" count={4} />);
    
    // Should render 4 service cards
    const cards = container.querySelectorAll('.bg-white.rounded-xl');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should use count prop for cards variant', () => {
    const { container } = render(<LoadingSkeleton variant="cards" count={3} />);
    
    // Should render 3 cards
    const cards = container.querySelectorAll('.bg-white.rounded-lg');
    expect(cards.length).toBeGreaterThan(0);
  });

  it('should use count prop for list variant', () => {
    const { container } = render(<LoadingSkeleton variant="list" count={5} />);
    
    // Should render 5 list items
    const items = container.querySelectorAll('.bg-white.rounded-lg');
    expect(items.length).toBeGreaterThan(0);
  });

  it('should default to count of 6', () => {
    const { container } = render(<LoadingSkeleton variant="services" />);
    
    // Should render default count
    expect(container.firstChild).toBeInTheDocument();
  });
});

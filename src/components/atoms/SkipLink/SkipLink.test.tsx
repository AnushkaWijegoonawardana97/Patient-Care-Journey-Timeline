import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('should render correctly', () => {
    render(<SkipLink href="#main">Skip to main content</SkipLink>);
    const link = screen.getByRole('link', { name: /skip to main content/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '#main');
  });

  it('should be hidden by default', () => {
    render(<SkipLink href="#main">Skip to main content</SkipLink>);
    const link = screen.getByRole('link', { name: /skip to main content/i });
    // Check that it has sr-only class (screen reader only)
    expect(link).toHaveClass('sr-only');
  });

  it('should be visible when focused', async () => {
    const user = userEvent.setup();
    render(<SkipLink href="#main">Skip to main content</SkipLink>);
    const link = screen.getByRole('link', { name: /skip to main content/i });
    
    await user.tab();
    expect(link).toHaveFocus();
    // When focused, the element should be positioned and visible
    // The focus:not-sr-only class removes sr-only styles on focus
    expect(link).toHaveClass('focus:not-sr-only');
  });

  it('should accept custom className', () => {
    render(
      <SkipLink href="#main" className="custom-class">
        Skip to main content
      </SkipLink>
    );
    const link = screen.getByRole('link', { name: /skip to main content/i });
    expect(link).toHaveClass('custom-class');
  });
});

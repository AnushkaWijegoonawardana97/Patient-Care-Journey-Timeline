import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('should render badge text', () => {
    render(<Badge>Test Badge</Badge>);
    
    expect(screen.getByText('Test Badge')).toBeInTheDocument();
  });

  it('should handle different variants', () => {
    const { container, rerender } = render(<Badge variant="default">Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-primary');

    rerender(<Badge variant="secondary">Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-secondary-success');

    rerender(<Badge variant="outline">Badge</Badge>);
    expect(container.firstChild).toHaveClass('border');

    rerender(<Badge variant="success">Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-secondary-light');

    rerender(<Badge variant="warning">Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-tertiary-warning');

    rerender(<Badge variant="error">Badge</Badge>);
    expect(container.firstChild).toHaveClass('bg-tertiary-error');
  });

  it('should apply correct styling', () => {
    const { container } = render(<Badge>Badge</Badge>);
    
    expect(container.firstChild).toHaveClass('inline-flex', 'items-center', 'rounded-full');
  });

  it('should handle custom className', () => {
    const { container } = render(<Badge className="custom-class">Badge</Badge>);
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

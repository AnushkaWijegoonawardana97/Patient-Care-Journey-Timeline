import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';
import { Inbox } from 'lucide-react';
import { Button } from '@/components/atoms/Button/Button';

describe('EmptyState', () => {
  it('should render title and message', () => {
    render(
      <EmptyState
        title="No items found"
        message="There are no items to display"
      />
    );
    
    expect(screen.getByText('No items found')).toBeInTheDocument();
    expect(screen.getByText('There are no items to display')).toBeInTheDocument();
  });

  it('should render icon when provided', () => {
    render(
      <EmptyState
        title="No items"
        icon={Inbox}
      />
    );
    
    // Icon should be rendered
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should use default icon when not provided', () => {
    render(<EmptyState title="No items" />);
    
    // Default AlertCircle icon should be rendered
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should render action button when provided', () => {
    render(
      <EmptyState
        title="No items"
        action={<Button>Add Item</Button>}
      />
    );
    
    expect(screen.getByText('Add Item')).toBeInTheDocument();
  });

  it('should not render message when not provided', () => {
    render(<EmptyState title="No items" />);
    
    expect(screen.queryByText(/There are no items/i)).not.toBeInTheDocument();
  });

  it('should handle custom className', () => {
    const { container } = render(
      <EmptyState
        title="No items"
        className="custom-class"
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

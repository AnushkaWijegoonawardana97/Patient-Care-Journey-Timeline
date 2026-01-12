import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from './StatusBadge';
import type { VisitStatus } from '@/types/journey';

// Mock visit utils
vi.mock('@/utils/visit.utils', () => ({
  getStatusIcon: vi.fn((status: string) => {
    // Return a mock icon component
    return () => <svg data-testid={`icon-${status}`} />;
  }),
  formatStatusLabel: vi.fn((status: string) => {
    const labels: Record<string, string> = {
      completed: 'Completed',
      scheduled: 'Scheduled',
      available: 'Available',
      missed: 'Missed',
      cancelled: 'Cancelled',
    };
    return labels[status] || status;
  }),
  getStatusBadgeStyles: vi.fn((status: string) => {
    const styles: Record<string, string> = {
      completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
      available: 'bg-gray-100 text-gray-700 border-gray-300',
      missed: 'bg-red-50 text-red-700 border-red-200',
      cancelled: 'bg-gray-100 text-gray-700 border-gray-300',
    };
    return styles[status] || 'bg-gray-100 text-gray-700 border-gray-300';
  }),
}));

describe('StatusBadge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct icon for each status', () => {
    const statuses: VisitStatus[] = ['completed', 'scheduled', 'available', 'missed', 'cancelled'];
    
    statuses.forEach(status => {
      const { unmount } = render(<StatusBadge status={status} />);
      expect(screen.getByTestId(`icon-${status}`)).toBeInTheDocument();
      unmount();
    });
  });

  it('should render correct label for each status', () => {
    const { rerender } = render(<StatusBadge status="completed" />);
    expect(screen.getByText('Completed')).toBeInTheDocument();

    rerender(<StatusBadge status="scheduled" />);
    expect(screen.getByText('Scheduled')).toBeInTheDocument();

    rerender(<StatusBadge status="available" />);
    expect(screen.getByText('Available')).toBeInTheDocument();
  });

  it('should apply correct styles for each status', () => {
    const { container, rerender } = render(<StatusBadge status="completed" />);
    expect(container.firstChild).toHaveClass('bg-emerald-50');

    rerender(<StatusBadge status="scheduled" />);
    expect(container.firstChild).toHaveClass('bg-blue-50');

    rerender(<StatusBadge status="missed" />);
    expect(container.firstChild).toHaveClass('bg-red-50');
  });

  it('should handle size variants', () => {
    const { container, rerender } = render(<StatusBadge status="completed" size="sm" />);
    expect(container.firstChild).toHaveClass('px-2', 'py-0.5', 'text-xs');

    rerender(<StatusBadge status="completed" size="md" />);
    expect(container.firstChild).toHaveClass('px-3', 'py-1.5', 'text-xs');

    rerender(<StatusBadge status="completed" size="lg" />);
    expect(container.firstChild).toHaveClass('px-4', 'py-2', 'text-sm');
  });

  it('should handle custom className', () => {
    const { container } = render(<StatusBadge status="completed" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

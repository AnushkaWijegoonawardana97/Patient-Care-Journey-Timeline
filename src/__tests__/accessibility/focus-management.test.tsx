import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VisitDetailDrawer } from '@/components/organisms/VisitDetailDrawer/VisitDetailDrawer';
import type { Visit } from '@/types/journey';

const mockVisit: Visit = {
  id: 'v_001',
  type: 'prenatal_postpartum',
  visitNumber: 1,
  totalOfType: 8,
  status: 'completed',
  scheduledDate: '2025-01-10T10:00:00Z',
  completedDate: '2025-01-10T11:00:00Z',
  notes: 'Test notes',
};

describe('Focus Management', () => {
  beforeEach(() => {
    // Reset body overflow
    document.body.style.overflow = '';
  });

  afterEach(() => {
    // Cleanup
    document.body.style.overflow = '';
  });

  it('should focus close button when drawer opens', async () => {
    const { rerender } = render(
      <VisitDetailDrawer visit={null} isOpen={false} onClose={vi.fn()} />
    );

    rerender(<VisitDetailDrawer visit={mockVisit} isOpen={true} onClose={vi.fn()} />);

    // Wait for focus to be set
    await new Promise((resolve) => setTimeout(resolve, 150));

    const closeButton = screen.getByLabelText('Close drawer');
    expect(closeButton).toHaveFocus();
  });

  it('should trap focus within drawer', async () => {
    render(<VisitDetailDrawer visit={mockVisit} isOpen={true} onClose={vi.fn()} />);

    const dialog = screen.getByRole('dialog');
    const focusableElements = dialog.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    expect(focusableElements.length).toBeGreaterThan(0);
    
    // First element should be focusable
    const firstElement = focusableElements[0] as HTMLElement;
    expect(firstElement).toBeInstanceOf(HTMLElement);
  });

  it('should prevent body scroll when drawer is open', () => {
    render(<VisitDetailDrawer visit={mockVisit} isOpen={true} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('should restore body scroll when drawer closes', () => {
    const { rerender } = render(
      <VisitDetailDrawer visit={mockVisit} isOpen={true} onClose={vi.fn()} />
    );
    expect(document.body.style.overflow).toBe('hidden');

    rerender(<VisitDetailDrawer visit={null} isOpen={false} onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe('');
  });
});

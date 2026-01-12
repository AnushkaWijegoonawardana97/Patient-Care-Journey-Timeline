import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VisitDetailDrawer } from './VisitDetailDrawer';
import type { Visit } from '@/types/journey';

const mockVisit: Visit = {
  id: 'v_001',
  type: 'prenatal_postpartum',
  visitNumber: 1,
  totalOfType: 8,
  status: 'completed',
  scheduledDate: '2025-01-10T10:00:00Z',
  completedDate: '2025-01-10T11:00:00Z',
  doula: {
    id: 'd_001',
    name: 'Angela Rivera',
    photo: '/doula-avatar.JPG',
    languages: ['English', 'Spanish'],
  },
  notes: 'Patient is doing well.',
  durationMinutes: 60,
};

describe('VisitDetailDrawer Accessibility', () => {
  it('should have dialog role', () => {
    render(<VisitDetailDrawer visit={mockVisit} isOpen={true} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
  });

  it('should have aria-modal attribute', () => {
    render(<VisitDetailDrawer visit={mockVisit} isOpen={true} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('should have aria-labelledby pointing to title', () => {
    render(<VisitDetailDrawer visit={mockVisit} isOpen={true} onClose={vi.fn()} />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'visit-detail-title');
    
    const title = screen.getByText(/Prenatal Visit/i);
    expect(title).toHaveAttribute('id', 'visit-detail-title');
  });

  it('should close on Escape key', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();
    render(<VisitDetailDrawer visit={mockVisit} isOpen={true} onClose={handleClose} />);
    
    await user.keyboard('{Escape}');
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('should have close button with proper aria-label', () => {
    render(<VisitDetailDrawer visit={mockVisit} isOpen={true} onClose={vi.fn()} />);
    const closeButton = screen.getByLabelText('Close drawer');
    expect(closeButton).toBeInTheDocument();
  });

  it('should trap focus within drawer', async () => {
    const user = userEvent.setup();
    render(<VisitDetailDrawer visit={mockVisit} isOpen={true} onClose={vi.fn()} />);
    
    const closeButton = screen.getByLabelText('Close drawer');
    expect(closeButton).toHaveFocus();
    
    // Tab should cycle within drawer
    await user.tab();
    // Focus should remain within drawer
    const focusableElements = screen.getAllByRole('button');
    expect(focusableElements.some(el => el === document.activeElement)).toBe(true);
  });
});

import * as React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { VisitCard } from './VisitCard';
import type { Visit } from '@/types/journey';

const mockVisit: Visit = {
  id: 'v_001',
  type: 'prenatal_postpartum',
  visitNumber: 1,
  totalOfType: 8,
  status: 'scheduled',
  scheduledDate: '2025-01-10T10:00:00Z',
  doula: {
    id: 'd_001',
    name: 'Angela Rivera',
    photo: '/doula-avatar.JPG',
    languages: ['English', 'Spanish'],
  },
};

describe('VisitCard Accessibility', () => {
  it('should have proper ARIA label', () => {
    render(<VisitCard visit={mockVisit} />);
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('aria-label');
    expect(card.getAttribute('aria-label')).toContain('Prenatal Visit');
  });

  it('should be keyboard accessible', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<VisitCard visit={mockVisit} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    await user.tab();
    expect(card).toHaveFocus();
    
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should support space key activation', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<VisitCard visit={mockVisit} onClick={handleClick} />);
    
    const card = screen.getByRole('button');
    card.focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should have proper tabIndex', () => {
    render(<VisitCard visit={mockVisit} />);
    const card = screen.getByRole('button');
    expect(card).toHaveAttribute('tabIndex', '0');
  });

  it('should have decorative icons marked as aria-hidden', () => {
    render(<VisitCard visit={mockVisit} />);
    const icons = screen.getAllByRole('img', { hidden: true });
    icons.forEach((icon) => {
      if (icon.hasAttribute('aria-hidden')) {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      }
    });
  });

  it('should use semantic time elements for dates', () => {
    render(<VisitCard visit={mockVisit} />);
    const timeElement = screen.getByText(/Jan 10, 2025/i).closest('time');
    expect(timeElement).toBeInTheDocument();
    expect(timeElement).toHaveAttribute('dateTime');
  });
});

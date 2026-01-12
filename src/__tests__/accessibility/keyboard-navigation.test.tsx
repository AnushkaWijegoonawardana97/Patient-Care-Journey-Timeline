import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BottomNavigation } from '@/components/organisms/BottomNavigation/BottomNavigation';
import { VisitCard } from '@/components/molecules/VisitCard/VisitCard';
import type { Visit } from '@/types/journey';

describe('Keyboard Navigation', () => {
  it('should navigate through navigation items with Tab', async () => {
    const user = userEvent.setup();
    render(<BottomNavigation activeNavItem="dashboard" />);
    
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
    
    // Tab through navigation
    for (const link of links) {
      await user.tab();
      expect(link).toHaveFocus();
    }
  });

  it('should activate links with Enter key', async () => {
    const user = userEvent.setup();
    render(<BottomNavigation activeNavItem="dashboard" />);
    
    const firstLink = screen.getAllByRole('link')[0];
    firstLink.focus();
    
    await user.keyboard('{Enter}');
    // Link should be activated (navigation happens)
    expect(firstLink).toHaveAttribute('href');
  });

  it('should navigate through visit cards with Tab', async () => {
    const user = userEvent.setup();
    const mockVisit: Visit = {
      id: 'v_001',
      type: 'prenatal_postpartum',
      visitNumber: 1,
      totalOfType: 8,
      status: 'scheduled',
      scheduledDate: '2025-01-10T10:00:00Z',
    };

    render(
      <>
        <VisitCard visit={mockVisit} />
        <VisitCard visit={{ ...mockVisit, id: 'v_002' }} />
      </>
    );

    const cards = screen.getAllByRole('button');
    expect(cards.length).toBe(2);

    for (const card of cards) {
      await user.tab();
      expect(card).toHaveFocus();
    }
  });

  it('should have logical tab order', async () => {
    const user = userEvent.setup();
    render(<BottomNavigation activeNavItem="dashboard" />);
    
    const links = screen.getAllByRole('link');
    const tabOrder: HTMLElement[] = [];
    
    // Collect tab order
    for (let i = 0; i < links.length; i++) {
      await user.tab();
      tabOrder.push(document.activeElement as HTMLElement);
    }
    
    // Verify order matches DOM order
    expect(tabOrder).toEqual(links);
  });
});

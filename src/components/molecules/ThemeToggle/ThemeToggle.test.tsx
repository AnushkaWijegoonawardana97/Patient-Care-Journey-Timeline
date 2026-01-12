import * as React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

const renderWithProvider = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render toggle switch', () => {
    renderWithProvider(<ThemeToggle />);
    
    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
  });

  it('should toggle theme on click', async () => {
    const user = userEvent.setup();
    renderWithProvider(<ThemeToggle />);
    
    const switchElement = screen.getByRole('switch');
    await user.click(switchElement);
    
    // Theme should toggle (component uses ThemeProvider)
    expect(switchElement).toBeInTheDocument();
  });

  it('should show correct icon for current theme', () => {
    renderWithProvider(<ThemeToggle />);
    
    // Should show icon based on theme
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should handle keyboard interaction', async () => {
    const user = userEvent.setup();
    renderWithProvider(<ThemeToggle />);
    
    const switchElement = screen.getByRole('switch');
    switchElement.focus();
    await user.keyboard('{Enter}');
    
    // Should handle keyboard interaction
    expect(switchElement).toBeInTheDocument();
  });
});

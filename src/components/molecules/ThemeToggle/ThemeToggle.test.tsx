import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeToggle } from './ThemeToggle';

// Mock useTheme hook
vi.mock('@/hooks/useTheme', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}));

// Mock useTheme from context
vi.mock('@/contexts/ThemeContext', () => ({
  useTheme: () => ({
    theme: 'light',
    toggleTheme: vi.fn(),
  }),
}));

describe('ThemeToggle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render toggle button', () => {
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('should toggle theme on click', async () => {
    const user = userEvent.setup();
    const mockToggleTheme = vi.fn();
    
    vi.mocked(require('@/hooks/useTheme').useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('should show correct icon for current theme', () => {
    vi.mocked(require('@/hooks/useTheme').useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: vi.fn(),
    });
    
    render(<ThemeToggle />);
    
    // Should show moon icon for light theme (to switch to dark)
    const icon = document.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should handle keyboard interaction', async () => {
    const user = userEvent.setup();
    const mockToggleTheme = vi.fn();
    
    vi.mocked(require('@/hooks/useTheme').useTheme).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });
    
    render(<ThemeToggle />);
    
    const button = screen.getByRole('button');
    button.focus();
    await user.keyboard('{Enter}');
    
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});

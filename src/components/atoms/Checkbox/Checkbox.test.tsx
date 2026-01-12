import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('should render correctly', () => {
    render(<Checkbox aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should toggle checked state on click', async () => {
    const user = userEvent.setup();
    render(<Checkbox aria-label="Test checkbox" />);
    
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('should be checked when checked prop is true', () => {
    render(<Checkbox checked aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Checkbox disabled aria-label="Test checkbox" />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});

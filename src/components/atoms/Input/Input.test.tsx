import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('should render correctly', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should handle value changes', async () => {
    const user = userEvent.setup();
    render(<Input placeholder="Enter text" />);
    
    const input = screen.getByPlaceholderText('Enter text');
    await user.type(input, 'test');
    expect(input).toHaveValue('test');
  });

  it('should support different input types', () => {
    render(<Input type="email" placeholder="Email" />);
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email');
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled placeholder="Disabled" />);
    expect(screen.getByPlaceholderText('Disabled')).toBeDisabled();
  });
});

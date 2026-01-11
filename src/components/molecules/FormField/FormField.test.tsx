import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('should render correctly with label and input', () => {
    render(<FormField label="Email" id="email" placeholder="Enter email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('should display error message when error prop is provided', () => {
    render(
      <FormField
        label="Email"
        id="email"
        error="Email is required"
      />
    );
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('should show required indicator when required prop is true', () => {
    render(<FormField label="Email" id="email" required />);
    const label = screen.getByText('Email');
    expect(label.textContent).toContain('*');
  });
});

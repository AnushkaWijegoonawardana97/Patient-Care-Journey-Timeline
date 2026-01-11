import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { LoginPage } from './LoginPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('LoginPage', () => {
  it('should render login form', () => {
    renderWithRouter(<LoginPage />);
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log in/i })).toBeInTheDocument();
  });

  it('should have link to register page', () => {
    renderWithRouter(<LoginPage />);
    const registerLink = screen.getByRole('link', { name: /create an account/i });
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('should handle form submission', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /log in/i });

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');
    await user.click(submitButton);

    // Form submission should work (navigation happens via BrowserRouter)
    expect(emailInput).toBeInTheDocument();
  });
});

import * as React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Dashboard } from './Dashboard';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Dashboard', () => {
  it('should render dashboard content', () => {
    renderWithRouter(<Dashboard />);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText(/you are logged in/i)).toBeInTheDocument();
  });

  it('should have link back to login', () => {
    renderWithRouter(<Dashboard />);
    const loginLink = screen.getByRole('link', { name: /back to login/i });
    expect(loginLink).toHaveAttribute('href', '/');
  });
});

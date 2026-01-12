import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('should render image when src provided', () => {
    render(<Avatar src="/avatar.jpg" alt="User Avatar" />);
    
    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/avatar.jpg');
  });

  it('should render initials when no image', () => {
    render(<Avatar fallback="John Doe" alt="John Doe" />);
    
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should render fallback when image fails to load', () => {
    const { rerender } = render(<Avatar src="/invalid.jpg" alt="User" fallback="JD" />);
    
    const img = screen.getByAltText('User');
    // Simulate image error
    img.dispatchEvent(new Event('error'));
    rerender(<Avatar src="/invalid.jpg" alt="User" fallback="JD" />);
    
    // Should show fallback
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('should handle different sizes', () => {
    const { container, rerender } = render(<Avatar size="sm" alt="User" />);
    expect(container.firstChild).toHaveClass('h-8', 'w-8');

    rerender(<Avatar size="md" alt="User" />);
    expect(container.firstChild).toHaveClass('h-10', 'w-10');

    rerender(<Avatar size="lg" alt="User" />);
    expect(container.firstChild).toHaveClass('h-12', 'w-12');
  });

  it('should handle custom className', () => {
    const { container } = render(<Avatar alt="User" className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should handle alt text', () => {
    render(<Avatar alt="Custom Alt Text" />);
    
    // Should use alt text for initials
    expect(screen.getByText('CA')).toBeInTheDocument();
  });

  it('should default to "?" when no fallback or alt', () => {
    render(<Avatar />);
    
    expect(screen.getByText('?')).toBeInTheDocument();
  });
});

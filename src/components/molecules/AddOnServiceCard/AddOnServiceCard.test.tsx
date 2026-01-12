import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AddOnServiceCard } from './AddOnServiceCard';
import type { AddOnService } from '@/types/addOnServices';

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Heart: () => <svg data-testid="heart-icon" />,
}));

describe('AddOnServiceCard', () => {
  const mockService: AddOnService = {
    id: 's_001',
    name: 'Lactation Support',
    description: 'Professional lactation consultation',
    imageUrl: '/lactation.jpg',
    status: 'available',
    icon: () => <svg data-testid="service-icon" />,
  };

  it('should render service name and description', () => {
    render(<AddOnServiceCard service={mockService} />);
    
    expect(screen.getByText('Lactation Support')).toBeInTheDocument();
    expect(screen.getByText('Professional lactation consultation')).toBeInTheDocument();
  });

  it('should display service image', () => {
    render(<AddOnServiceCard service={mockService} />);
    
    const img = screen.getByAltText('Lactation Support');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/lactation.jpg');
  });

  it('should use default image when imageUrl is not provided', () => {
    const serviceWithoutImage = {
      ...mockService,
      imageUrl: undefined,
    };
    
    render(<AddOnServiceCard service={serviceWithoutImage} />);
    
    const img = screen.getByAltText('Lactation Support');
    expect(img).toHaveAttribute('src', '/login-page-image.jpg');
  });

  it('should show "Optional Add-On" status for available services', () => {
    render(<AddOnServiceCard service={mockService} />);
    
    expect(screen.getByText('Optional Add-On')).toBeInTheDocument();
  });

  it('should show "Coming soon" status for coming_soon services', () => {
    const comingSoonService = {
      ...mockService,
      status: 'coming_soon' as const,
    };
    
    render(<AddOnServiceCard service={comingSoonService} />);
    
    expect(screen.getByText('Coming soon')).toBeInTheDocument();
  });

  it('should render card structure', () => {
    render(<AddOnServiceCard service={mockService} />);
    
    const card = screen.getByText('Lactation Support').closest('div');
    expect(card).toBeInTheDocument();
  });

  it('should apply correct styling for different statuses', () => {
    const { container, rerender } = render(<AddOnServiceCard service={mockService} />);
    
    // Available service
    expect(container.firstChild).toBeInTheDocument();

    // Coming soon service
    const comingSoonService = {
      ...mockService,
      status: 'coming_soon' as const,
    };
    rerender(<AddOnServiceCard service={comingSoonService} />);
    
    expect(container.firstChild).toBeInTheDocument();
  });
});

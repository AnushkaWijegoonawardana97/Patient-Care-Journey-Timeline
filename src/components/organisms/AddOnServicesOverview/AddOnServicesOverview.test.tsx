import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Heart } from 'lucide-react';
import { AddOnServicesOverview } from './AddOnServicesOverview';
import type { AddOnService } from '@/types/addOnServices';

// Mock AddOnServiceCard
vi.mock('@/components/molecules/AddOnServiceCard/AddOnServiceCard', () => ({
  AddOnServiceCard: ({ service }: { service: AddOnService }) => (
    <div data-testid={`service-card-${service.id}`}>{service.name}</div>
  ),
}));

describe('AddOnServicesOverview', () => {
  const mockServices: AddOnService[] = [
    {
      id: 's_001',
      name: 'Lactation Support',
      description: 'Professional lactation consultation',
      imageUrl: '/lactation.jpg',
      status: 'optional_addon',
      icon: Heart,
    },
    {
      id: 's_002',
      name: 'Mental Health Support',
      description: 'Counseling services',
      imageUrl: '/mental-health.jpg',
      status: 'coming_soon',
      icon: Heart,
    },
  ];

  it('should render all add-on services', () => {
    render(<AddOnServicesOverview services={mockServices} />);
    
    expect(screen.getByText('Lactation Support')).toBeInTheDocument();
    expect(screen.getByText('Mental Health Support')).toBeInTheDocument();
  });

  it('should render section title and description', () => {
    render(<AddOnServicesOverview services={mockServices} />);
    
    expect(screen.getByText('Additional Services')).toBeInTheDocument();
    expect(screen.getByText(/Explore optional services/)).toBeInTheDocument();
  });

  it('should render note about optional services', () => {
    render(<AddOnServicesOverview services={mockServices} />);
    
    expect(screen.getByText(/Note:/)).toBeInTheDocument();
    expect(screen.getByText(/These services may be available/)).toBeInTheDocument();
  });

  it('should handle empty services array', () => {
    render(<AddOnServicesOverview services={[]} />);
    
    expect(screen.getByText('Additional Services')).toBeInTheDocument();
    expect(screen.queryByTestId(/service-card/)).not.toBeInTheDocument();
  });
});

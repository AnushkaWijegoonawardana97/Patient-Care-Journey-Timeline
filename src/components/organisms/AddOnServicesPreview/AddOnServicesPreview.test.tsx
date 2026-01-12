import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AddOnServicesPreview } from './AddOnServicesPreview';
import type { AddOnService } from '@/types/addOnServices';

// Mock AddOnServiceCard
vi.mock('@/components/molecules/AddOnServiceCard/AddOnServiceCard', () => ({
  AddOnServiceCard: ({ service }: { service: AddOnService }) => (
    <div data-testid={`service-card-${service.id}`}>{service.name}</div>
  ),
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AddOnServicesPreview', () => {
  const mockServices: AddOnService[] = [
    {
      id: 's_001',
      name: 'Service 1',
      description: 'Description 1',
      status: 'available',
      icon: () => <svg />,
    },
    {
      id: 's_002',
      name: 'Service 2',
      description: 'Description 2',
      status: 'available',
      icon: () => <svg />,
    },
    {
      id: 's_003',
      name: 'Service 3',
      description: 'Description 3',
      status: 'available',
      icon: () => <svg />,
    },
    {
      id: 's_004',
      name: 'Service 4',
      description: 'Description 4',
      status: 'available',
      icon: () => <svg />,
    },
  ];

  it('should render preview of services', () => {
    renderWithRouter(<AddOnServicesPreview services={mockServices} />);
    
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
    expect(screen.getByText('Service 3')).toBeInTheDocument();
  });

  it('should limit number of services shown to 3', () => {
    renderWithRouter(<AddOnServicesPreview services={mockServices} />);
    
    expect(screen.getByText('Service 1')).toBeInTheDocument();
    expect(screen.getByText('Service 2')).toBeInTheDocument();
    expect(screen.getByText('Service 3')).toBeInTheDocument();
    expect(screen.queryByText('Service 4')).not.toBeInTheDocument();
  });

  it('should link to full add-on services page', () => {
    renderWithRouter(<AddOnServicesPreview services={mockServices} />);
    
    const link = screen.getByText('View All Add-On Services').closest('a');
    expect(link).toHaveAttribute('href', '/add-on-services');
  });

  it('should handle empty services', () => {
    renderWithRouter(<AddOnServicesPreview services={[]} />);
    
    expect(screen.getByText('Additional Services')).toBeInTheDocument();
    expect(screen.queryByTestId(/service-card/)).not.toBeInTheDocument();
  });
});

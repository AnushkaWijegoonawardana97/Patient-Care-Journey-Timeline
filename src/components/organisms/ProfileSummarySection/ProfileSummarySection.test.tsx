import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProfileSummarySection } from './ProfileSummarySection';

describe('ProfileSummarySection', () => {
  const mockProps = {
    patientName: 'Maria Santos',
    gender: 'Female',
    age: '28',
    height: '5\'6"',
    bloodType: 'O+',
    email: 'maria@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Health St, San Francisco, CA 94102',
  };

  it('should render profile information', () => {
    render(<ProfileSummarySection {...mockProps} />);
    
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
    expect(screen.getByText('Profile Summary')).toBeInTheDocument();
  });

  it('should display patient details', () => {
    render(<ProfileSummarySection {...mockProps} />);
    
    expect(screen.getByText('Female')).toBeInTheDocument();
    expect(screen.getByText('28')).toBeInTheDocument();
    expect(screen.getByText('5\'6"')).toBeInTheDocument();
    expect(screen.getByText('O+')).toBeInTheDocument();
  });

  it('should display contact information when provided', () => {
    render(<ProfileSummarySection {...mockProps} />);
    
    expect(screen.getByText('maria@example.com')).toBeInTheDocument();
    expect(screen.getByText('+1 (555) 123-4567')).toBeInTheDocument();
    expect(screen.getByText('123 Health St, San Francisco, CA 94102')).toBeInTheDocument();
  });

  it('should handle missing data gracefully', () => {
    render(
      <ProfileSummarySection
        patientName="Test Patient"
        gender="Female"
        age="25"
      />
    );
    
    expect(screen.getByText('Test Patient')).toBeInTheDocument();
    expect(screen.queryByText(/Height/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Blood Type/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Contact Information/i)).not.toBeInTheDocument();
  });

  it('should display avatar', () => {
    render(<ProfileSummarySection {...mockProps} avatarUrl="/avatar.jpg" />);
    
    const avatar = screen.getByAltText('Maria Santos');
    expect(avatar).toBeInTheDocument();
  });
});

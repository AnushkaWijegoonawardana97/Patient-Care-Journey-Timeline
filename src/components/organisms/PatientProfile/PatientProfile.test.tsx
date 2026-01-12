import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PatientProfile } from './PatientProfile';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('PatientProfile', () => {
  const mockProps = {
    patientName: 'Maria Santos',
    gender: 'Female',
    age: '28',
    height: '5\'6"',
    bloodType: 'O+',
  };

  it('should render patient name', () => {
    renderWithRouter(<PatientProfile {...mockProps} />);
    
    expect(screen.getByText('Maria Santos')).toBeInTheDocument();
  });

  it('should render gender', () => {
    renderWithRouter(<PatientProfile {...mockProps} />);
    
    expect(screen.getByText('Female')).toBeInTheDocument();
  });

  it('should render age', () => {
    renderWithRouter(<PatientProfile {...mockProps} />);
    
    expect(screen.getByText('28')).toBeInTheDocument();
  });

  it('should render height when provided', () => {
    renderWithRouter(<PatientProfile {...mockProps} />);
    
    expect(screen.getByText('5\'6"')).toBeInTheDocument();
  });

  it('should render blood type when provided', () => {
    renderWithRouter(<PatientProfile {...mockProps} />);
    
    expect(screen.getByText('O+')).toBeInTheDocument();
  });

  it('should display avatar', () => {
    renderWithRouter(<PatientProfile {...mockProps} avatarUrl="/avatar.jpg" />);
    
    const avatar = screen.getByAltText('Maria Santos');
    expect(avatar).toBeInTheDocument();
  });

  it('should handle missing data gracefully', () => {
    renderWithRouter(
      <PatientProfile
        patientName="Test Patient"
        gender="Female"
        age="25"
      />
    );
    
    expect(screen.getByText('Test Patient')).toBeInTheDocument();
    expect(screen.queryByText(/Height/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Blood Type/i)).not.toBeInTheDocument();
  });

  it('should render view all button', () => {
    renderWithRouter(<PatientProfile {...mockProps} />);
    
    expect(screen.getByText('See all information')).toBeInTheDocument();
  });
});

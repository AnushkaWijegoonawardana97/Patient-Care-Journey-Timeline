import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/atoms/Button/Button';

export const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold text-text-primary">Dashboard</h1>
        <p className="text-text-secondary">
          You are logged in (dummy authentication)
        </p>
        <p className="text-sm text-text-secondary">
          This is a placeholder dashboard page. The actual dashboard will be built in a later phase.
        </p>
        <Link to="/">
          <Button variant="secondary">Back to Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

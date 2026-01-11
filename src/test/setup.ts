import { afterEach } from 'vitest';
import '@testing-library/jest-dom';

// Mock ResizeObserver for Radix UI components
global.ResizeObserver = class ResizeObserver {
  observe() {
    // Mock implementation
  }
  unobserve() {
    // Mock implementation
  }
  disconnect() {
    // Mock implementation
  }
};

// Test setup file
// Add global test utilities here

// Cleanup after each test (if needed)
afterEach(() => {
  // Add cleanup logic here when needed
});

import { afterEach, vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock react-i18next globally to prevent import errors
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof import('react-i18next')>('react-i18next');
  return {
    ...actual,
    useTranslation: () => ({
      t: (key: string) => key,
      i18n: {
        changeLanguage: vi.fn(),
        language: 'en',
      },
    }),
    initReactI18next: {
      type: 'languageDetector',
      init: vi.fn(),
    },
  };
});

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

// Mock window.matchMedia for ThemeContext
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock HTMLElement.scrollIntoView
HTMLElement.prototype.scrollIntoView = vi.fn();

// Mock i18next to prevent initialization errors
vi.mock('i18next', () => ({
  default: {
    use: vi.fn().mockReturnThis(),
    init: vi.fn(),
    on: vi.fn(),
    t: vi.fn((key: string) => key),
    language: 'en',
    changeLanguage: vi.fn(),
  },
}));

// Test setup file
// Add global test utilities here

// Cleanup after each test (if needed)
afterEach(() => {
  // Add cleanup logic here when needed
});

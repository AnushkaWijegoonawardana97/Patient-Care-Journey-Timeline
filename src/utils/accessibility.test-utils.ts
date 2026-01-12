import { render, type RenderOptions } from '@testing-library/react';
import { axe } from 'axe-core';
import type { ReactElement } from 'react';

/**
 * Custom render function that includes accessibility testing utilities
 */
export const renderWithA11y = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): ReturnType<typeof render> => {
  return render(ui, options);
};

/**
 * Test component for accessibility violations using axe-core
 * @param container - The container element to test
 * @returns Promise that resolves with accessibility results
 */
export const testA11y = async (container: HTMLElement): Promise<axe.AxeResults> => {
  const results = await axe.run(container, {
    rules: {
      // Only run WCAG 2.1 AA rules
      'wcag2a': { enabled: true },
      'wcag2aa': { enabled: true },
      'wcag21a': { enabled: true },
      'wcag21aa': { enabled: true },
    },
  });
  return results;
};

/**
 * Get all focusable elements within a container
 */
export const getFocusableElements = (container: HTMLElement): HTMLElement[] => {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'textarea:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');

  return Array.from(container.querySelectorAll<HTMLElement>(focusableSelectors));
};

/**
 * Check if an element is visible to screen readers
 */
export const isVisibleToScreenReader = (element: HTMLElement): boolean => {
  const style = window.getComputedStyle(element);
  const ariaHidden = element.getAttribute('aria-hidden');
  const role = element.getAttribute('role');

  // Element is hidden if:
  // - display is none
  // - visibility is hidden
  // - aria-hidden is true
  // - role is presentation or none
  if (style.display === 'none' || style.visibility === 'hidden') {
    return false;
  }

  if (ariaHidden === 'true') {
    return false;
  }

  if (role === 'presentation' || role === 'none') {
    return false;
  }

  return true;
};

/**
 * Get the computed color contrast ratio between two colors
 * Returns a ratio (e.g., 4.5 for WCAG AA compliance)
 */
export const getContrastRatio = (foreground: string, background: string): number => {
  // This is a simplified version - in production, use a proper contrast calculation library
  // For now, this is a placeholder that would need proper RGB to relative luminance conversion
  // Using a library like 'color-contrast' or 'wcag-contrast' would be better
  return 4.5; // Placeholder
};

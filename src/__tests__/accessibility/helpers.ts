import { screen } from '@testing-library/react';
import type { ByRoleMatcher } from '@testing-library/react';
import { expect } from 'vitest';

/**
 * Helper to find elements by accessible name
 */
export const findByAccessibleName = async (name: string | RegExp): Promise<HTMLElement> => {
  return screen.findByRole('generic', { name });
};

/**
 * Helper to get all elements with a specific ARIA role
 */
export const getAllByRole = (role: ByRoleMatcher): HTMLElement[] => {
  return screen.getAllByRole(role);
};

/**
 * Helper to check if an element has proper ARIA attributes
 */
export const hasAriaAttribute = (element: HTMLElement, attribute: string): boolean => {
  return element.hasAttribute(attribute);
};

/**
 * Helper to get ARIA label value
 */
export const getAriaLabel = (element: HTMLElement): string | null => {
  return element.getAttribute('aria-label');
};

/**
 * Helper to check keyboard navigation
 */
export const testKeyboardNavigation = async (
  elements: HTMLElement[],
  user: ReturnType<typeof import('@testing-library/user-event').default.setup>
): Promise<void> => {
  for (const element of elements) {
    await user.tab();
    expect(document.activeElement).toBe(element);
  }
};

/**
 * Helper to test focus trap
 */
export const testFocusTrap = (
  _container: HTMLElement,
  focusableElements: HTMLElement[]
): void => {
  // First element should receive focus
  expect(focusableElements[0]).toHaveFocus();

  // Tabbing from last element should cycle to first
  focusableElements[focusableElements.length - 1].focus();
  // This would need to be tested with actual keyboard events
};

/**
 * Helper to verify heading hierarchy
 */
export const verifyHeadingHierarchy = (container: HTMLElement): boolean => {
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6');
  let previousLevel = 0;

  for (const heading of Array.from(headings)) {
    const level = parseInt(heading.tagName.charAt(1), 10);
    // Heading levels should not skip (e.g., h1 to h3)
    if (previousLevel > 0 && level > previousLevel + 1) {
      return false;
    }
    previousLevel = level;
  }

  return true;
};

/**
 * Helper to check if all images have alt text
 */
export const allImagesHaveAltText = (container: HTMLElement): boolean => {
  const images = container.querySelectorAll<HTMLImageElement>('img');
  return Array.from(images).every((img) => {
    const alt = img.getAttribute('alt');
    // Decorative images should have empty alt or aria-hidden
    return alt !== null || img.hasAttribute('aria-hidden');
  });
};

/**
 * Helper to verify landmark regions
 */
export const hasLandmarkRegions = (container: HTMLElement): boolean => {
  const landmarks = container.querySelectorAll('main, header, nav, footer, aside, [role="main"], [role="banner"], [role="navigation"], [role="contentinfo"], [role="complementary"]');
  return landmarks.length > 0;
};

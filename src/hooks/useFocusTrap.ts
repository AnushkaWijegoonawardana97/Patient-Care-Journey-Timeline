import { useEffect, useRef } from 'react';

/**
 * Hook to trap focus within a container element
 * Useful for modals, drawers, and other overlay components
 */
export const useFocusTrap = (isActive: boolean, containerRef: React.RefObject<HTMLElement>): void => {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) {
      return;
    }

    // Store the previously focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    const container = containerRef.current;

    // Get all focusable elements within the container
    const getFocusableElements = (): HTMLElement[] => {
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

    const focusableElements = getFocusableElements();

    if (focusableElements.length === 0) {
      return;
    }

    // Focus the first focusable element
    const firstElement = focusableElements[0];
    firstElement.focus();

    // Handle Tab key to cycle through focusable elements
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key !== 'Tab') {
        return;
      }

      const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);

      if (currentIndex === -1) {
        // If current focus is not in the list, focus the first element
        event.preventDefault();
        firstElement.focus();
        return;
      }

      if (event.shiftKey) {
        // Shift + Tab: move to previous element
        if (currentIndex === 0) {
          event.preventDefault();
          focusableElements[focusableElements.length - 1].focus();
        }
      } else {
        // Tab: move to next element
        if (currentIndex === focusableElements.length - 1) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      // Restore focus to the previously focused element
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    };
  }, [isActive, containerRef]);
};

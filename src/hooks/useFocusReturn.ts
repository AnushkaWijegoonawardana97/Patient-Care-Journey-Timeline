import { useEffect, useRef } from 'react';

/**
 * Hook to return focus to a previously focused element
 * Useful when closing modals, drawers, or other overlay components
 */
export const useFocusReturn = (isActive: boolean, returnElementRef?: React.RefObject<HTMLElement>): void => {
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isActive) {
      // Store the currently focused element when the component becomes active
      previousActiveElement.current = document.activeElement as HTMLElement;
    } else {
      // When the component becomes inactive, return focus
      if (returnElementRef?.current) {
        returnElementRef.current.focus();
      } else if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
    }
  }, [isActive, returnElementRef]);
};

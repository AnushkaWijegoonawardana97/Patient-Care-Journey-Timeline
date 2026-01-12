import { useEffect, useRef } from 'react';

/**
 * Hook to handle skip link functionality
 * Manages focus when skip link is activated
 */
export const useSkipLink = (targetId: string): {
  skipLinkRef: React.RefObject<HTMLAnchorElement>;
  handleSkip: () => void;
} => {
  const skipLinkRef = useRef<HTMLAnchorElement>(null);

  const handleSkip = (): void => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      // Remove tabindex if it was added temporarily
      const hadTabIndex = targetElement.hasAttribute('tabindex');
      if (!hadTabIndex) {
        targetElement.setAttribute('tabindex', '-1');
      }

      targetElement.focus();

      // Remove tabindex after focus to restore natural tab order
      setTimeout(() => {
        if (!hadTabIndex) {
          targetElement.removeAttribute('tabindex');
        }
      }, 100);

      // Scroll into view if needed
      if (typeof targetElement.scrollIntoView === 'function') {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  useEffect(() => {
    const skipLink = skipLinkRef.current;
    if (!skipLink) {
      return;
    }

    skipLink.addEventListener('click', handleSkip);

    return () => {
      skipLink.removeEventListener('click', handleSkip);
    };
  }, [targetId]);

  return { skipLinkRef, handleSkip };
};

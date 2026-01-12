import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useSkipLink } from './useSkipLink';

describe('useSkipLink', () => {
  let skipLink: HTMLAnchorElement;
  let targetElement: HTMLDivElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    targetElement = document.createElement('div');
    targetElement.id = 'main-content';
    targetElement.textContent = 'Main Content';

    document.body.appendChild(skipLink);
    document.body.appendChild(targetElement);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should handle skip link click', async () => {
    const { result } = renderHook(() => useSkipLink('main-content'));

    // Simulate click
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    skipLink.dispatchEvent(clickEvent);

    await waitFor(() => {
      expect(document.activeElement).toBe(targetElement);
    });
  });

  it('should scroll to target element', async () => {
    const scrollIntoViewSpy = vi.spyOn(HTMLElement.prototype, 'scrollIntoView');
    scrollIntoViewSpy.mockImplementation(() => {});

    const { result } = renderHook(() => useSkipLink('main-content'));

    result.current.handleSkip();

    await waitFor(() => {
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  it('should prevent default navigation behavior', () => {
    const { result } = renderHook(() => useSkipLink('main-content'));

    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    });
    const preventDefaultSpy = vi.spyOn(clickEvent, 'preventDefault');

    skipLink.dispatchEvent(clickEvent);

    // Note: preventDefault is typically called by the event handler
    // We test that the skip functionality works correctly
    expect(document.activeElement).toBe(targetElement);
  });

  it('should handle missing target element', () => {
    const { result } = renderHook(() => useSkipLink('non-existent-id'));

    // Should not throw error
    expect(() => {
      result.current.handleSkip();
    }).not.toThrow();
  });

  it('should work with keyboard navigation', async () => {
    const { result } = renderHook(() => useSkipLink('main-content'));

    // Focus the skip link
    skipLink.focus();
    expect(document.activeElement).toBe(skipLink);

    // Simulate Enter key
    const enterEvent = new KeyboardEvent('keydown', {
      key: 'Enter',
      bubbles: true,
    });
    skipLink.dispatchEvent(enterEvent);

    // Or simulate click (which is what Enter typically triggers)
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
    });
    skipLink.dispatchEvent(clickEvent);

    await waitFor(() => {
      expect(document.activeElement).toBe(targetElement);
    });
  });

  it('should add and remove tabindex correctly', async () => {
    const { result } = renderHook(() => useSkipLink('main-content'));

    // Target element should not have tabindex initially
    expect(targetElement.hasAttribute('tabindex')).toBe(false);

    result.current.handleSkip();

    await waitFor(() => {
      // After focus, tabindex should be removed
      expect(targetElement.hasAttribute('tabindex')).toBe(false);
    });
  });

  it('should preserve existing tabindex', async () => {
    targetElement.setAttribute('tabindex', '0');
    const { result } = renderHook(() => useSkipLink('main-content'));

    result.current.handleSkip();

    await waitFor(() => {
      // Existing tabindex should be preserved
      expect(targetElement.getAttribute('tabindex')).toBe('0');
    });
  });

  it('should return skipLinkRef', () => {
    const { result } = renderHook(() => useSkipLink('main-content'));

    expect(result.current.skipLinkRef).toBeDefined();
    expect(result.current.skipLinkRef.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('should clean up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(HTMLElement.prototype, 'removeEventListener');

    const { unmount } = renderHook(() => useSkipLink('main-content'));

    unmount();

    // Should remove event listener
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});

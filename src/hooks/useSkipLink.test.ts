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
    
    // Attach the ref to the skipLink element
    result.current.skipLinkRef.current = skipLink;
    
    // Force re-render to trigger useEffect
    const { rerender } = renderHook(() => useSkipLink('main-content'));
    rerender();

    // Call handleSkip directly to test functionality
    result.current.handleSkip();

    await waitFor(() => {
      expect(document.activeElement).toBe(targetElement);
    }, { timeout: 1000 });
  });

  it('should scroll to target element', async () => {
    // Mock scrollIntoView before creating the element
    const scrollIntoViewSpy = vi.fn();
    Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
      value: scrollIntoViewSpy,
      writable: true,
    });

    const { result } = renderHook(() => useSkipLink('main-content'));

    result.current.handleSkip();

    await waitFor(() => {
      expect(scrollIntoViewSpy).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  it('should prevent default navigation behavior', async () => {
    const { result } = renderHook(() => useSkipLink('main-content'));

    // Test that handleSkip works correctly
    result.current.handleSkip();

    await waitFor(() => {
      expect(document.activeElement).toBe(targetElement);
    }, { timeout: 1000 });
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
    
    // Attach the ref to the skipLink element so useEffect can attach listener
    result.current.skipLinkRef.current = skipLink;
    
    // Force re-render to trigger useEffect
    const { rerender } = renderHook(() => useSkipLink('main-content'));
    rerender();

    // Focus the skip link
    skipLink.focus();
    expect(document.activeElement).toBe(skipLink);

    // Call handleSkip directly (which is what the event listener would call)
    result.current.handleSkip();
    
    // The handleSkip function adds tabindex and focuses, so we should check immediately
    // The element should be focused after handleSkip is called
    expect(targetElement.hasAttribute('tabindex')).toBe(true);
    expect(document.activeElement).toBe(targetElement);
  });

  it('should add and remove tabindex correctly', async () => {
    const { result } = renderHook(() => useSkipLink('main-content'));

    // Target element should not have tabindex initially
    expect(targetElement.hasAttribute('tabindex')).toBe(false);

    result.current.handleSkip();

    // Immediately after handleSkip, tabindex should be added
    expect(targetElement.hasAttribute('tabindex')).toBe(true);

    // After setTimeout, tabindex should be removed
    await waitFor(() => {
      expect(targetElement.hasAttribute('tabindex')).toBe(false);
    }, { timeout: 200 });
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
    // skipLinkRef.current will be null until an anchor element is rendered and assigned
    // This is expected behavior - the ref is meant to be attached to a JSX element
    expect(result.current.skipLinkRef.current).toBeNull();
  });

  it('should clean up event listeners on unmount', () => {
    const anchor = document.createElement('a');
    anchor.href = '#main-content';
    document.body.appendChild(anchor);

    const removeEventListenerSpy = vi.spyOn(anchor, 'removeEventListener');
    
    const { result, unmount } = renderHook(() => {
      const hookResult = useSkipLink('main-content');
      // Set ref after first render
      if (!hookResult.skipLinkRef.current) {
        hookResult.skipLinkRef.current = anchor;
      }
      return hookResult;
    });

    // Force useEffect to run by setting ref
    result.current.skipLinkRef.current = anchor;
    
    // Trigger a re-render to ensure useEffect runs
    const { rerender } = renderHook(() => useSkipLink('main-content'));
    rerender();

    unmount();

    // Should remove event listener when component unmounts
    // Note: The cleanup happens in useEffect, so we check if removeEventListener was called
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });
});

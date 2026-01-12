import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useFocusReturn } from './useFocusReturn';

describe('useFocusReturn', () => {
  let triggerButton: HTMLButtonElement;
  let returnButton: HTMLButtonElement;
  let otherButton: HTMLButtonElement;

  beforeEach(() => {
    document.body.innerHTML = '';
    triggerButton = document.createElement('button');
    triggerButton.textContent = 'Trigger';
    returnButton = document.createElement('button');
    returnButton.textContent = 'Return';
    otherButton = document.createElement('button');
    otherButton.textContent = 'Other';

    document.body.appendChild(triggerButton);
    document.body.appendChild(returnButton);
    document.body.appendChild(otherButton);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should store reference to trigger element', () => {
    triggerButton.focus();
    const returnElementRef = useRef<HTMLButtonElement>(returnButton);
    
    renderHook(() => useFocusReturn(true, returnElementRef));

    // Trigger element should be stored
    expect(document.activeElement).toBe(triggerButton);
  });

  it('should return focus to trigger element when overlay closes', () => {
    triggerButton.focus();
    const previousElement = document.activeElement;
    const returnElementRef = useRef<HTMLButtonElement>(null);

    const { rerender } = renderHook(
      ({ isActive }) => useFocusReturn(isActive, returnElementRef),
      {
        initialProps: { isActive: true },
      }
    );

    // Move focus away
    otherButton.focus();
    expect(document.activeElement).toBe(otherButton);

    // Close overlay
    rerender({ isActive: false });

    // Focus should return to previous element
    expect(document.activeElement).toBe(previousElement);
  });

  it('should return focus to returnElementRef when provided', () => {
    const returnElementRef = useRef<HTMLButtonElement>(returnButton);
    triggerButton.focus();

    const { rerender } = renderHook(
      ({ isActive }) => useFocusReturn(isActive, returnElementRef),
      {
        initialProps: { isActive: true },
      }
    );

    // Move focus away
    otherButton.focus();
    expect(document.activeElement).toBe(otherButton);

    // Close overlay
    rerender({ isActive: false });

    // Focus should return to returnElementRef
    expect(document.activeElement).toBe(returnButton);
  });

  it('should handle missing trigger element gracefully', () => {
    const returnElementRef = useRef<HTMLButtonElement>(null);
    
    // No element is focused initially
    expect(document.activeElement).toBe(document.body);

    const { rerender } = renderHook(
      ({ isActive }) => useFocusReturn(isActive, returnElementRef),
      {
        initialProps: { isActive: true },
      }
    );

    // Move focus
    otherButton.focus();

    // Close overlay
    rerender({ isActive: false });

    // Should not throw error
    expect(document.activeElement).toBe(otherButton);
  });

  it('should clean up on unmount', () => {
    triggerButton.focus();
    const returnElementRef = useRef<HTMLButtonElement>(null);

    const { unmount } = renderHook(() => useFocusReturn(true, returnElementRef));

    // Should not throw on unmount
    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it('should work with multiple overlays', () => {
    const returnElementRef1 = useRef<HTMLButtonElement>(returnButton);
    const returnElementRef2 = useRef<HTMLButtonElement>(otherButton);

    triggerButton.focus();

    const { rerender: rerender1 } = renderHook(
      ({ isActive }) => useFocusReturn(isActive, returnElementRef1),
      {
        initialProps: { isActive: true },
      }
    );

    otherButton.focus();
    rerender1({ isActive: false });

    // First overlay should return focus to returnButton
    expect(document.activeElement).toBe(returnButton);

    // Second overlay
    returnButton.focus();
    const { rerender: rerender2 } = renderHook(
      ({ isActive }) => useFocusReturn(isActive, returnElementRef2),
      {
        initialProps: { isActive: true },
      }
    );

    triggerButton.focus();
    rerender2({ isActive: false });

    // Second overlay should return focus to otherButton
    expect(document.activeElement).toBe(otherButton);
  });

  it('should not return focus when overlay is still active', () => {
    triggerButton.focus();
    const returnElementRef = useRef<HTMLButtonElement>(returnButton);

    const { rerender } = renderHook(
      ({ isActive }) => useFocusReturn(isActive, returnElementRef),
      {
        initialProps: { isActive: true },
      }
    );

    // Move focus
    otherButton.focus();
    expect(document.activeElement).toBe(otherButton);

    // Keep overlay active
    rerender({ isActive: true });

    // Focus should not return
    expect(document.activeElement).toBe(otherButton);
  });
});

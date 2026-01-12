import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useFocusTrap } from './useFocusTrap';

describe('useFocusTrap', () => {
  let container: HTMLDivElement;
  let button1: HTMLButtonElement;
  let button2: HTMLButtonElement;
  let button3: HTMLButtonElement;
  let outsideButton: HTMLButtonElement;

  beforeEach(() => {
    // Create DOM structure
    document.body.innerHTML = '';
    container = document.createElement('div');
    button1 = document.createElement('button');
    button1.textContent = 'Button 1';
    button2 = document.createElement('button');
    button2.textContent = 'Button 2';
    button3 = document.createElement('button');
    button3.textContent = 'Button 3';
    outsideButton = document.createElement('button');
    outsideButton.textContent = 'Outside Button';

    container.appendChild(button1);
    container.appendChild(button2);
    container.appendChild(button3);
    document.body.appendChild(container);
    document.body.appendChild(outsideButton);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should trap focus within container when active', () => {
    const containerRef = { current: container };
    const { rerender } = renderHook(
      ({ isActive }) => useFocusTrap(isActive, containerRef),
      {
        initialProps: { isActive: true },
      }
    );

    // First element should be focused
    expect(document.activeElement).toBe(button1);
  });

  it('should allow focus to escape when inactive', () => {
    const containerRef = { current: container };
    const { rerender } = renderHook(
      ({ isActive }) => useFocusTrap(isActive, containerRef),
      {
        initialProps: { isActive: false },
      }
    );

    // Focus should not be trapped
    outsideButton.focus();
    expect(document.activeElement).toBe(outsideButton);
  });

  it('should handle Tab key navigation within trap', () => {
    const containerRef = { current: container };
    renderHook(() => useFocusTrap(true, containerRef));

    // Start at first element
    expect(document.activeElement).toBe(button1);

    // Simulate Tab key
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
    });
    document.dispatchEvent(tabEvent);

    // Should move to next element (button2)
    expect(document.activeElement).toBe(button2);
  });

  it('should handle Shift+Tab key navigation within trap', () => {
    const containerRef = { current: container };
    renderHook(() => useFocusTrap(true, containerRef));

    // Start at first element
    expect(document.activeElement).toBe(button1);

    // Focus last element first
    button3.focus();
    expect(document.activeElement).toBe(button3);

    // Simulate Shift+Tab key
    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
    });
    document.dispatchEvent(shiftTabEvent);

    // Should move to previous element (button2)
    expect(document.activeElement).toBe(button2);
  });

  it('should cycle to first element when Tab is pressed on last element', () => {
    const containerRef = { current: container };
    renderHook(() => useFocusTrap(true, containerRef));

    // Focus last element
    button3.focus();
    expect(document.activeElement).toBe(button3);

    // Simulate Tab key
    const tabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      bubbles: true,
    });
    tabEvent.preventDefault = vi.fn();
    document.dispatchEvent(tabEvent);

    // Should cycle to first element
    expect(document.activeElement).toBe(button1);
    expect(tabEvent.preventDefault).toHaveBeenCalled();
  });

  it('should cycle to last element when Shift+Tab is pressed on first element', () => {
    const containerRef = { current: container };
    renderHook(() => useFocusTrap(true, containerRef));

    // Start at first element
    expect(document.activeElement).toBe(button1);

    // Simulate Shift+Tab key
    const shiftTabEvent = new KeyboardEvent('keydown', {
      key: 'Tab',
      shiftKey: true,
      bubbles: true,
    });
    shiftTabEvent.preventDefault = vi.fn();
    document.dispatchEvent(shiftTabEvent);

    // Should cycle to last element
    expect(document.activeElement).toBe(button3);
    expect(shiftTabEvent.preventDefault).toHaveBeenCalled();
  });

  it('should focus first element when trap activates', () => {
    const containerRef = { current: container };
    outsideButton.focus();
    expect(document.activeElement).toBe(outsideButton);

    renderHook(() => useFocusTrap(true, containerRef));

    // Should focus first element in container
    expect(document.activeElement).toBe(button1);
  });

  it('should handle empty container gracefully', () => {
    const emptyContainer = document.createElement('div');
    const containerRef = { current: emptyContainer };
    document.body.appendChild(emptyContainer);

    // Should not throw error
    expect(() => {
      renderHook(() => useFocusTrap(true, containerRef));
    }).not.toThrow();
  });

  it('should clean up event listeners on unmount', () => {
    const containerRef = { current: container };
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const { unmount } = renderHook(() => useFocusTrap(true, containerRef));

    unmount();

    // Should remove event listener
    expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
  });

  it('should restore focus to previous element on cleanup', () => {
    const containerRef = { current: container };
    outsideButton.focus();
    const previousElement = document.activeElement;

    const { unmount } = renderHook(() => useFocusTrap(true, containerRef));

    // Focus should move to first element in container
    expect(document.activeElement).toBe(button1);

    unmount();

    // Focus should be restored to previous element
    expect(document.activeElement).toBe(previousElement);
  });

  it('should not trap focus when container ref is null', () => {
    const containerRef = { current: null };
    
    expect(() => {
      renderHook(() => useFocusTrap(true, containerRef));
    }).not.toThrow();
  });
});

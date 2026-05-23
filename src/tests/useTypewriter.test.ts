import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useTypewriter } from '../hooks/useTypewriter';

describe('useTypewriter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should start with an empty string', () => {
    const { result } = renderHook(() => useTypewriter('hello', 50));
    expect(result.current).toBe('');
  });

  it('should type out the text progressively over time', () => {
    const { result } = renderHook(() => useTypewriter('hello', 50));

    expect(result.current).toBe('');

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current).toBe('h');

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current).toBe('he');

    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe('hello');
  });

  it('should handle speed prop variations', () => {
    const { result } = renderHook(() => useTypewriter('abc', 100));

    act(() => {
      vi.advanceTimersByTime(50);
    });
    // Shouldn't type yet because interval is 100ms
    expect(result.current).toBe('');

    act(() => {
      vi.advanceTimersByTime(50);
    });
    expect(result.current).toBe('a');
  });

  it('should stop changing once text is fully typed', () => {
    const { result } = renderHook(() => useTypewriter('ok', 10));

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('ok');
    
    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(result.current).toBe('ok');
  });
});

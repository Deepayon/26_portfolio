import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { gsap } from 'gsap';
import TextType from '../components/TextType';
import React from 'react';

describe('TextType', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(gsap, 'delayedCall').mockImplementation((delay, callback) => {
      const id = setTimeout(callback, delay * 1000);
      return { kill: () => clearTimeout(id) } as any;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it('types correctly with App props', () => {
    const resumeData = { name: "Deepayan Das" };
    render(
      <TextType
        as="h1"
        className="hero-name heading"
        text={resumeData.name}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="|"
        loop={false}
        cursorClassName="accent-text"
        initialDelay={2000}
      />
    );
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    // First char timer scheduled
    act(() => {
      vi.advanceTimersByTime(75);
    });
    
    let content = screen.getByText('D', { selector: '.text-type__content' });
    expect(content.textContent).toBe('D');
    
    for (let i = 0; i < 11; i++) {
      act(() => {
        vi.advanceTimersByTime(75);
      });
    }
    
    expect(content.textContent).toBe('Deepayan Das');
  });
});

import React, { useEffect, useRef } from 'react';

export const ScrollProgressBar = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let lastScrollY = window.scrollY;
    let isScrollingUp = false;

    const handleResize = () => {
      height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const loop = () => {
      const winScroll = window.scrollY || document.documentElement.scrollTop;
      const scrolledPercentage = height > 0 ? (winScroll / height) : 0;
      
      const scrollDiff = winScroll - lastScrollY;
      if (scrollDiff < -3) {
        isScrollingUp = true;
      } else if (scrollDiff > 3 || winScroll <= 0) {
        isScrollingUp = false;
      }
      lastScrollY = winScroll;
      
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${scrolledPercentage})`;
        barRef.current.style.boxShadow = isScrollingUp 
          ? '0 0 24px 4px rgba(var(--accent-rgb), 0.9)' 
          : '0 0 8px 1px rgba(var(--accent-rgb), 0.3)';
        barRef.current.style.height = isScrollingUp ? '4px' : '2px';
      }
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div 
      ref={barRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        background: 'var(--accent)',
        zIndex: 10000,
        transformOrigin: '0% 50%',
        transform: 'scaleX(0)',
        transition: 'box-shadow 0.3s ease-out, height 0.3s ease-out',
        willChange: 'transform, box-shadow, height'
      }}
    />
  );
};

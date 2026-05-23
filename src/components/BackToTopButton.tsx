import React, { useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import gsap from 'gsap';

let sharedAudioCtx: AudioContext | null = null;
let sharedNoiseBuffer: AudioBuffer | null = null;

const initAudio = () => {
  if (typeof window === 'undefined') return null;
  if (!sharedAudioCtx) {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return null;
    sharedAudioCtx = new AudioContext();
    
    const bufferSize = sharedAudioCtx.sampleRate * 0.5;
    sharedNoiseBuffer = sharedAudioCtx.createBuffer(1, bufferSize, sharedAudioCtx.sampleRate);
    const data = sharedNoiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
  }
  if (sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume();
  }
  return sharedAudioCtx;
};

export const BackToTopButton = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frameId: number;
    let threshold = window.innerHeight * 0.8;

    const handleResize = () => {
      threshold = window.innerHeight * 0.8;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    let isVisible = false;

    const loop = () => {
      if (buttonRef.current) {
        const winScroll = window.scrollY || document.documentElement.scrollTop;
        const shouldShow = winScroll > threshold;
        
        if (shouldShow !== isVisible) {
          isVisible = shouldShow;
          buttonRef.current.style.pointerEvents = shouldShow ? 'all' : 'none';
          
          gsap.killTweensOf(buttonRef.current);
          gsap.to(buttonRef.current, {
            opacity: shouldShow ? 1 : 0,
            y: shouldShow ? 0 : 20,
            scale: shouldShow ? 1 : 0.8,
            duration: 0.8,
            ease: shouldShow ? "elastic.out(1, 0.5)" : "power2.in"
          });
        }
      }
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const playWhooshSound = () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(50);
      }
      
      const ctx = initAudio();
      if (!ctx || !sharedNoiseBuffer) return;
      
      const noise = ctx.createBufferSource();
      noise.buffer = sharedNoiseBuffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(400, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(1000, ctx.currentTime + 0.1);
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4);
      filter.Q.value = 1;
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      noise.start(ctx.currentTime);
      noise.stop(ctx.currentTime + 0.5);
    } catch (e) {
      console.warn("Audio play failed:", e);
    }
  };

  return (
    <button
      ref={buttonRef}
      onPointerDown={(e) => {
        playWhooshSound();

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.backgroundColor = 'var(--accent)';
        ripple.style.borderRadius = '50%';
        ripple.style.pointerEvents = 'none';
        
        const size = Math.max(rect.width, rect.height) * 2;
        ripple.style.width = `${size}px`;
        ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        ripple.style.opacity = '0.5';
        ripple.style.zIndex = '0';
        e.currentTarget.appendChild(ripple);

        gsap.set(ripple, {
          xPercent: -50,
          yPercent: -50,
          scale: 0
        });

        const tl = gsap.timeline();
        tl.to(ripple, {
          scale: 1,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            ripple.remove();
          }
        });

        if ((window as any).lenis) {
          (window as any).lenis.scrollTo(0, { duration: 1.5 });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }}
      className="glass glass-glow"
      style={{
        overflow: 'hidden',
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        width: '48px',
        height: '48px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 99,
        padding: 0,
        border: '1px solid rgba(var(--accent-rgb), 0.3)',
        background: 'rgba(var(--accent-rgb), 0.1)',
        backdropFilter: 'blur(10px)',
        color: 'var(--accent)',
        opacity: 0,
        pointerEvents: 'none',
        transform: 'translateY(20px)',
        willChange: 'opacity, transform'
      }}
      onPointerEnter={(e) => {
        initAudio(); // pre-initialize
        e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.2)';
      }}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotationX = ((y - centerY) / centerY) * -30;
        const rotationY = ((x - centerX) / centerX) * 30;

        gsap.to(e.currentTarget, {
          rotationX,
          rotationY,
          duration: 0.4,
          ease: 'power2.out',
          transformPerspective: 500
        });
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.background = 'rgba(var(--accent-rgb), 0.1)';
        gsap.to(e.currentTarget, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)'
        });
      }}
      aria-label="Back to top"
    >
      <ArrowUp size={24} style={{ zIndex: 1, position: 'relative' }} />
    </button>
  );
};


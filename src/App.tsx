import React, { useState, useEffect, useRef, memo } from 'react';
import { ArrowRight, Github, Linkedin, Mail, Terminal, Send, CheckCircle2, Award, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import SoftAurora from './components/SoftAurora';
import CardNav from './components/CardNav';
import ProfileCard from './components/ProfileCard';
import FuzzyText from './components/FuzzyText';
import MagneticCard from './components/MagneticCard';
import TextType from './components/TextType';
import { resumeData, navItems } from './data';
import { useCountUp } from './hooks/useCountUp';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { BackToTopButton } from './components/BackToTopButton';

const StatCard = ({ label, value, prefix }: { label: string, value: number, prefix?: string }) => {
  const { count, ref } = useCountUp(value, 2000);
  return (
    <div className="glass stat-card" ref={ref}>
      <div className="stat-num">{prefix}{count}<span className="accent-text">+</span></div>
      <div className="stat-label mono">{label}</div>
    </div>
  );
};

const SectionReveal = memo(({ children, id, className = "" }: any) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.section>
  );
});

// Memoize SoftAurora to prevent re-renders
const BackgroundAurora = memo(() => (
  <SoftAurora
    speed={0.6}
    scale={1.5}
    brightness={1}
    color1="#f7f7f7"
    color2="#e100ff"
    noiseFrequency={2.5}
    noiseAmplitude={1}
    bandHeight={0.5}
    bandSpread={1}
    octaveDecay={0.1}
    layerOffset={0}
    colorSpeed={1}
    enableMouseInteraction={true}
    mouseInfluence={0.25}
  />
));

let globalAppAudioCtx: AudioContext | null = null;
const getAppAudioCtx = () => {
  if (typeof window === 'undefined') return null;
  if (!globalAppAudioCtx) {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContext) globalAppAudioCtx = new AudioContext();
  }
  if (globalAppAudioCtx && globalAppAudioCtx.state === 'suspended') {
    globalAppAudioCtx.resume();
  }
  return globalAppAudioCtx;
};

export default function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [fadeOutLoading, setFadeOutLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Initialize context on first click
  const handleAppInteract = () => {
    if (!hasInteracted) {
      getAppAudioCtx();
      setHasInteracted(true);
    }
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Make Lenis available globally for our smooth scroll anchors
    (window as any).lenis = lenis;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.origin === window.location.origin) {
        e.preventDefault();
        lenis.scrollTo(anchor.hash, { offset: -50 });
      }
    };

    document.documentElement.addEventListener('click', handleAnchorClick);

    return () => {
      document.documentElement.removeEventListener('click', handleAnchorClick);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  const playSoundEffect = () => {
    try {
      const ctx = getAppAudioCtx();
      if (!ctx) return;
      
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = 'sine';
      osc2.type = 'triangle';
      
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      osc.frequency.setValueAtTime(800, ctx.currentTime + 0.05);
      osc.frequency.setValueAtTime(200, ctx.currentTime + 0.1);
      osc.frequency.linearRampToValueAtTime(600, ctx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 1.0);
      
      osc2.frequency.setValueAtTime(100, ctx.currentTime);
      osc2.frequency.setValueAtTime(1000, ctx.currentTime + 0.03);
      osc2.frequency.setValueAtTime(300, ctx.currentTime + 0.1);
      osc2.frequency.linearRampToValueAtTime(1200, ctx.currentTime + 0.4);
      osc2.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 1.0);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(4000, ctx.currentTime + 0.1);
      filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 1.0);
      
      // Softer volume profile
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.02, ctx.currentTime + 0.1);
      gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
      
      osc.start(ctx.currentTime);
      osc2.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 1.0);
      osc2.stop(ctx.currentTime + 1.0);
    } catch (e) {
      console.warn("Audio played before interaction:", e);
    }
  };

  useEffect(() => {
    if (!hasInteracted) return;
    
    // Play sound immediately upon interaction
    playSoundEffect();
    
    const timer = setTimeout(() => {
      setFadeOutLoading(true);
      setTimeout(() => {
        setIsAppLoading(false);
      }, 800);
    }, 1500);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  return (
    <>
      <ScrollProgressBar />
      {isAppLoading && (
        <div 
          onClick={handleAppInteract}
          style={{ 
            position: 'fixed', 
            inset: 0, 
            display: 'flex', 
            flexDirection: 'column',
            alignItems: 'center', 
            justifyContent: 'center', 
            background: '#050508', 
            zIndex: 9999,
            transform: fadeOutLoading ? 'scale(1.1) translateY(-20px)' : 'scale(1) translateY(0)',
            opacity: fadeOutLoading ? 0 : 1,
            filter: fadeOutLoading ? 'blur(10px)' : 'blur(0px)',
            transition: 'all 0.8s cubic-bezier(0.76, 0, 0.24, 1)',
            willChange: 'transform, opacity, filter',
            pointerEvents: fadeOutLoading ? 'none' : 'all',
            cursor: hasInteracted ? 'default' : 'pointer'
          }}
        >
          {hasInteracted ? (
             <FuzzyText
               baseIntensity={0.2}
               hoverIntensity={0.5}
               enableHover={true}
               fontSize="clamp(2.5rem, 8vw, 6rem)"
               className="mono"
               color="#ffffff"
             >
               404 Not Found
             </FuzzyText>
          ) : (
             <div style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'JetBrains Mono, monospace', fontSize: '1rem', letterSpacing: '0.1em', animation: 'blink 1.5s infinite' }}>
                [ Click to Initialize ]
             </div>
          )}
        </div>
      )}

      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <BackgroundAurora />
      </div>
            <div style={{ position: 'absolute', top: '24px', left: 0, width: '100%', zIndex: 100, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'auto' }}>
          <CardNav
            logo={<>DD<span style={{color: 'var(--accent)'}}>.</span></>}
            logoAlt="DD Logo"
            items={navItems}
            baseColor="rgba(10, 10, 15, 0.4)"
            menuColor="#fff"
            buttonBgColor="var(--accent)"
            buttonTextColor="#000"
            className="glass-nav"
            onNavClick={() => {}}
          />
        </div>
      </div>

      <main>
        <SectionReveal id="hero">
          <div className="hero-blobs">
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
          </div>
          <div className="hero-bg"></div>
          <div className="container hero-content">
            <div className="badge reveal fade-up" style={{ animationDelay: '2.5s', animationFillMode: 'both', animationName: 'fadeUpAnim', animationDuration: '0.8s', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <div className="dot"></div>
              Available for Opportunities
            </div>
            
            <TextType
              key={!isAppLoading ? 'ready-name' : 'loading'}
              as="h1"
              className="hero-name heading"
              text={resumeData.name}
              typingSpeed={75}
              pauseDuration={1500}
              showCursor={true}
              cursorCharacter="|"
              loop={false}
              cursorClassName="accent-text"
              initialDelay={500} // Start slightly after loading screen disappears
            />
            
            <h2 className="hero-role mono reveal fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'both', animationName: 'fadeUpAnim', animationDuration: '0.8s', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <span className="accent-text">&gt; </span>
              <TextType
                key={!isAppLoading ? 'ready-role' : 'loading'}
                as="span"
                text={resumeData.role}
                typingSpeed={60}
                showCursor={true}
                cursorCharacter="_"
                loop={false}
                cursorClassName="accent-text"
                initialDelay={1500} // Starts after name is typed
              />
            </h2>
            
            <div className="hero-cta reveal fade-up" style={{ animationDelay: '3.1s', animationFillMode: 'both', animationName: 'fadeUpAnim', animationDuration: '0.8s', animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <a href="#projects" className="btn btn-primary">
                See What I Cooked <ArrowRight size={18} />
              </a>
              <a href={`mailto:${resumeData.email}`} className="btn btn-glass">
                Slide in DMs <Terminal size={18} />
              </a>
            </div>
          </div>
        </SectionReveal>
        <div className="section-divider" />

        <SectionReveal id="about">
          <div className="container about-grid">
            <div className="reveal fade-right" style={{ padding: 0, width: '100%', maxWidth: '320px', margin: '0 auto' }}>
              <ProfileCard
                name="Deepayan Das"
                title="Software Engineer"
                handle="deepayan42"
                status="Online"
                contactText="Contact Me"
                avatarUrl="/profile.jpg"
                miniAvatarUrl="/profile2.jpg"
                showUserInfo={true}
                enableTilt={true}
                enableMobileTilt={false}
                onContactClick={() => { window.location.href = `mailto:${resumeData.email}` }}
                behindGlowEnabled={true}
                behindGlowColor="rgba(0, 216, 255, 0.4)"
                innerGradient="linear-gradient(145deg, rgba(8,51,68,0.5) 0%, rgba(0,216,255,0.1) 100%)"
              />
            </div>
            <div className="about-content reveal fade-left">
              <div className="section-header" style={{ marginBottom: '40px' }}>
                <h2 className="section-title heading">Main Character <span className="accent-text">Lore</span></h2>
              </div>
              <p className="bio">{resumeData.summary}</p>
              <div className="stats-grid">
                <StatCard label="Years Exp" value={1} prefix="0" />
                <StatCard label="Key Projects" value={4} prefix="0" />
                <StatCard label="Certifications" value={2} prefix="0" />
              </div>
            </div>
          </div>
        </SectionReveal>
        <div className="section-divider" />

        <SectionReveal id="skills">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title heading">The <span className="accent-text">Tech Stack</span></h2>
            </div>
            <div className="skills-grid">
              {resumeData.skills.map((skill, i) => (
                <MagneticCard className={`glass glass-panel glass-glow skill-card reveal ${i % 2 === 0 ? 'fade-left' : 'fade-right'}`} key={i}>
                  <div className="skill-header">
                    <div className="skill-icon">{skill.icon}</div>
                    <h3 className="skill-title heading">{skill.category}</h3>
                  </div>
                  <div className="prog-bar-bg">
                    <motion.div 
                      className="prog-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    />
                  </div>
                  <div className="pill-container mono">
                    {skill.items.map((item, idx) => (
                      <span className="skill-pill" key={idx}>{item}</span>
                    ))}
                  </div>
                </MagneticCard>
              ))}
            </div>
          </div>
        </SectionReveal>
        <div className="section-divider" />

        <SectionReveal id="experience">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title heading">Main <span className="accent-text">Quests</span></h2>
            </div>
            <div className="timeline">
              {resumeData.experience.map((exp, i) => (
                <div className={`time-item reveal ${i % 2 === 0 ? 'fade-left' : 'fade-right'}`} key={i}>
                  <div className="time-dot"></div>
                  <MagneticCard className="glass glass-panel glass-glow" style={{ flex: 1, width: '100%' }}>
                    <div className="time-header">
                      <div>
                        <h3 className="time-role heading">{exp.role}</h3>
                        <div className="time-comp mono"><Terminal size={16} /> {exp.company}</div>
                      </div>
                      <div className="time-date mono">{exp.date}</div>
                    </div>
                    <ul className="time-bullets">
                      {exp.bullets.map((b, idx) => <li key={idx}>{b}</li>)}
                    </ul>
                  </MagneticCard>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
        <div className="section-divider" />

        <SectionReveal id="projects">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title heading">Cooked <span className="accent-text">Up</span></h2>
            </div>
            <div className="bento">
              {resumeData.projects.map((proj, i) => (
                <div className="glass glass-panel glass-glow bento-item reveal fade-up" key={i} style={{ transitionDelay: `${i * 0.1}s` }}>
                  <div className="proj-bg"></div>
                  <div className="proj-top">
                    <div className="proj-head">
                      <h3 className="proj-title heading">{proj.name}</h3>
                    </div>
                    <p className="proj-desc">{proj.desc}</p>
                  </div>
                  <div className="proj-tech mono">
                    {proj.tech.map((t, idx) => <span className="tech-tag" key={idx}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </SectionReveal>
        <div className="section-divider" />

        <SectionReveal id="education">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title heading">Skill <span className="accent-text">Tree</span></h2>
            </div>
            <div className="ed-grid">
              <div className="glass glass-panel glass-glow ed-card reveal fade-left">
                <div className="ed-icon-wrap"><GraduationCap size={28} /></div>
                <h3 className="heading" style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{resumeData.education.degree}</h3>
                <div className="mono accent-text" style={{ marginBottom: '24px' }}>{resumeData.education.school}</div>
                <div className="mono" style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)' }}>
                  <span className="glass" style={{ padding: '6px 12px', borderRadius: '8px' }}>{resumeData.education.date}</span>
                  <span className="glass" style={{ padding: '6px 12px', borderRadius: '8px', color: 'var(--accent)' }}>GPA: {resumeData.education.gpa}</span>
                </div>
              </div>
              <div className="glass glass-panel glass-glow ed-card reveal fade-right" style={{ transitionDelay: '0.2s' }}>
                <div className="ed-icon-wrap" style={{ marginBottom: '24px' }}><Award size={28} /></div>
                <h3 className="heading" style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Certifications</h3>
                <div className="cert-list">
                  {resumeData.certifications.map((cert, i) => (
                    <div className="cert-item mono" key={i}>
                      <CheckCircle2 size={20} />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </SectionReveal>
        <div className="section-divider" />

        <SectionReveal id="contact">
          <div className="container contact-wrap reveal fade-up">
            <div className="section-header">
              <h2 className="section-title heading">Hit My <span className="accent-text">Line</span></h2>
            </div>
            <p className="contact-desc">
              Currently exploring new opportunities in Software Engineering and Full-Stack Development. 
              Whether you have a role that aligns with my skills or just want to connect, my inbox is always open.
            </p>
            <div className="contact-row">
              <a href={`mailto:${resumeData.email}`} className="c-link"><Mail size={20} /> Email</a>
              <a href="https://linkedin.com/in/Deepayon" target="_blank" rel="noopener noreferrer" className="c-link"><Linkedin size={20} /> LinkedIn</a>
              <a href="https://github.com/Deepayon" target="_blank" rel="noopener noreferrer" className="c-link"><Github size={20} /> GitHub</a>
            </div>
            <a href={`mailto:${resumeData.email}`} className="btn btn-primary" style={{ marginTop: '24px', animation: 'button-pulse 3s infinite' }}>
              Drop a DM() <Send size={18} style={{ marginLeft: '8px' }} />
            </a>
          </div>
        </SectionReveal>
      </main>

      <footer>
        <div className="container">
          <p className="footer-text">
            © {new Date().getFullYear()} Deepayon | Built with React
          </p>
        </div>
      </footer>
      <BackToTopButton />
    </>
  );
}

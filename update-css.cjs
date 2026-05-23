const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

const newCss = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400..700&family=JetBrains+Mono:wght@400..700&family=Space+Grotesk:wght@400..900&display=swap');

:root {
  --bg: #050508;
  --bg-alpha: rgba(5, 5, 8, 0.6);
  --accent: #00d8ff;
  --accent-rgb: 0, 216, 255;
  --text-main: #ffffff;
  --text-muted: rgba(255, 255, 255, 0.6);
  --glass-bg: rgba(255, 255, 255, 0.05);
  --glass-border: rgba(255, 255, 255, 0.1);
  --h1: clamp(3rem, 8vw, 7rem);
  --h2: clamp(2rem, 4.5vw, 3.5rem);
  --h3: clamp(1.25rem, 3vw, 1.75rem);
  --body: clamp(0.95rem, 1.2vw, 1.05rem);
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background-color: var(--bg);
  color: var(--text-main);
  font-family: 'DM Sans', sans-serif;
  line-height: 1.6;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
html { scroll-behavior: smooth; }
a { text-decoration: none; color: inherit; }
li { list-style: none; }

h1, h2, h3, h4, h5, h6, .heading {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 900;
  letter-spacing: -0.05em;
  line-height: 1.1;
}
.mono { font-family: 'JetBrains Mono', monospace; letter-spacing: 0.1em; text-transform: uppercase; }
.accent-text { color: var(--accent); }

.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: none;
}
.glass-panel { padding: 32px; }
.glass-glow { transition: all 0.3s; }
.glass-glow:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(255, 255, 255, 0.2);
}

.reveal { opacity: 0; transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
.fade-up { transform: translateY(40px); }
.fade-left { transform: translateX(-40px); }
.fade-right { transform: translateX(40px); }
.reveal.visible { opacity: 1; transform: translate(0, 0); }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 8px;
  padding: 12px 32px; border-radius: 4px; font-family: 'Space Grotesk', sans-serif;
  font-weight: 700; cursor: pointer; position: relative; overflow: hidden;
  transition: all 0.3s ease; font-size: 0.875rem; text-transform: uppercase; letter-spacing: -0.025em;
}
.btn-primary { background: #ffffff; color: #000000; border: none; }
.btn-primary:hover { background: var(--accent); }
.btn-glass { background: transparent; color: #ffffff; border: 1px solid rgba(255, 255, 255, 0.2); backdrop-filter: blur(10px); }
.btn-glass:hover { border-color: #ffffff; background: rgba(255, 255, 255, 0.05); }

header { position: fixed; top: 0; left: 0; right: 0; z-index: 100; transition: all 0.4s ease; background: transparent; padding: 24px 0; }
header.scrolled { padding: 16px 0; background: rgba(255,255,255,0.02); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
.nav-container { max-width: 1400px; margin: 0 auto; padding: 0 32px; display: flex; justify-content: space-between; align-items: center; }
.logo { font-size: 1.5rem; display: flex; align-items: center; gap: 8px; font-weight: 700; font-family: 'Space Grotesk', sans-serif;}
.logo-dot { width: 32px; height: 32px; background: var(--accent); border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem; color: black; font-weight: bold; }
.nav-links { display: flex; gap: 32px; align-items: center; }
.nav-link { font-size: 0.685rem; color: var(--text-muted); position: relative; transition: color 0.3s; font-family: 'JetBrains Mono', monospace;}
.nav-link:hover, .nav-link.active { color: var(--text-main); }
.mobile-toggle { display: none; background: none; border: none; color: #fff; cursor: pointer; }

section { padding: 80px 0; position: relative; }
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; z-index: 10; position: relative;}
.section-header { margin-bottom: 40px; }
.section-title { font-size: var(--h2); position: relative; display: inline-block; }

#hero { height: 100vh; min-height: 800px; display: flex; align-items: center; justify-content: flex-start; padding-top: 80px; position: relative; }
.hero-bg { display: none; }
.hero-blobs { position: absolute; inset: 0; overflow: hidden; z-index: 0; }
.blob { position: absolute; border-radius: 50%; filter: blur(120px); pointer-events: none; opacity: 0.4; }
.blob-1 { width: 600px; height: 600px; background: #083344; top: -20%; left: -10%; }
.blob-2 { width: 500px; height: 500px; background: #1e3a8a; bottom: -10%; right: -5%; }

.hero-content { position: relative; z-index: 1; text-align: left; max-width: 900px; width: 100%; display: flex; flex-direction: column; align-items: flex-start; }
.badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: 30px; font-size: 0.625rem; margin-bottom: 24px; color: var(--accent); border: 1px solid rgba(0, 216, 255, 0.2); background: rgba(0, 216, 255, 0.1); font-family: 'JetBrains Mono', monospace; text-transform: uppercase; }
.badge .dot { width: 6px; height: 6px; background: var(--accent); border-radius: 50%; }

.hero-name { font-size: var(--h1); letter-spacing: -0.05em; margin-bottom: 16px; display: flex; flex-wrap: wrap; justify-content: flex-start; gap: 16px; line-height: 0.9; }
.name-char { display: inline-block; opacity: 0; transform: translateY(30px); animation: charReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes charReveal { to { opacity: 1; transform: translateY(0); } }

.hero-role { font-size: 1.25rem; color: rgba(255,255,255,0.7); margin-bottom: 32px; font-family: 'JetBrains Mono', monospace; text-transform: none; letter-spacing: 0; }
.cursor { display: inline-block; width: 12px; height: 1em; background: var(--accent); margin-left: 8px; animation: blink 1s step-end infinite; vertical-align: text-bottom; }
@keyframes blink { 50% { opacity: 0; } }

.hero-cta { display: flex; gap: 16px; justify-content: flex-start; }

.about-grid { display: grid; grid-template-columns: 1fr; gap: 80px; align-items: center; }
.avatar { display: none; }
.bio { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 24px; line-height: 1.8; max-width: 600px; }
.stats-grid { display: grid; grid-template-columns: repeat(3, minmax(100px, max-content)); gap: 32px; }
.stat-card { text-align: left; padding: 0 0 0 16px; border-left: 2px solid var(--accent); border-radius: 0; box-shadow: none; border-top: none; border-right: none; border-bottom: none; background: transparent; backdrop-filter: none; }
.stat-num { font-size: 2rem; font-family: 'Space Grotesk', sans-serif; font-weight: 700; color: #ffffff; margin-bottom: 4px; line-height: 1; }
.stat-label { font-size: 0.625rem; letter-spacing: 0.1em; text-transform: uppercase; font-family: 'JetBrains Mono', monospace; color: rgba(255,255,255,0.4); }

.skills-grid { display: flex; flex-direction: column; gap: 16px; }
.skill-card { display: flex; flex-direction: column; flex: 1; padding: 24px; }
.skill-header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
.skill-icon { display: none; }
.skill-title { font-size: 0.625rem; color: rgba(255,255,255,0.4); text-transform: uppercase; font-family: 'JetBrains Mono', monospace; margin: 0; letter-spacing: 0.1em; font-weight: normal; }
.prog-bar-bg { height: 4px; width: 100%; background: rgba(255,255,255,0.05); margin-bottom: 24px; position: relative; overflow: hidden; border-radius: 2px; }
.prog-bar-fill { height: 100%; width: 0; background: var(--accent); transition: width 1.5s cubic-bezier(0.16,1,0.3,1) 0.2s; position: absolute; left: 0; top: 0;}
.reveal.visible .prog-bar-fill { width: 100%; }
.pill-container { display: flex; flex-wrap: wrap; gap: 8px; }
.skill-pill { padding: 4px 12px; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.05); border-radius: 4px; font-size: 0.625rem; font-family: 'JetBrains Mono', monospace; text-transform: uppercase; cursor: default; }

.timeline { padding: 0; margin-left: 0 !important; border: none;}
.time-item { position: relative; padding-left: 0 !important; margin-bottom: 24px; }
.time-dot { display: none; }
.time-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; flex-wrap: wrap; gap: 16px; }
.time-role { font-size: 1.25rem; margin-bottom: 4px; color: #ffffff; }
.time-comp { font-size: 0.75rem; color: rgba(255,255,255,0.5); display: flex; align-items: center; gap: 8px; }
.time-date { padding: 0; background: transparent; font-size: 0.625rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.1em; }
.time-bullets { list-style: none; }
.time-bullets li { position: relative; padding-left: 0; margin-bottom: 8px; font-size: 0.875rem; color: var(--text-muted); }
.time-bullets li::before { display: none; } /* removed arrow bullet */

.bento { display: grid; grid-template-columns: repeat(12, 1fr); gap: 16px; }
.bento-item { display: flex; flex-direction: column; justify-content: space-between; position: relative; overflow: hidden; padding: 24px; border-radius: 16px; }
.bento-item:nth-child(1) { grid-column: span 7; background: linear-gradient(to bottom right, rgba(0, 216, 255, 0.15), transparent); border-color: rgba(0, 216, 255, 0.3); }
.bento-item:nth-child(2) { grid-column: span 5; }
.proj-bg { display: none; }
.proj-top { position: relative; z-index: 1; margin-bottom: 16px; }
.proj-head { display: flex; flex-direction: column; align-items: flex-start; margin-bottom: 8px; }
.proj-title { font-size: 1.25rem; margin-top: 8px; }
.proj-links { position: absolute; top: 24px; right: 24px; color: var(--accent); display: flex; gap: 12px; }
.proj-links a { color: var(--accent); transition: transform 0.3s; }
.proj-links a:hover { transform: scale(1.1); }
.proj-desc { color: rgba(255,255,255,0.5); font-size: 0.75rem; }
.proj-tech { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; position: relative; z-index: 1;}
.tech-tag { font-size: 0.625rem; padding: 4px 8px; background: rgba(255,255,255,0.1); color: var(--text-main); border: 1px solid rgba(255,255,255,0.05); text-transform: uppercase; letter-spacing: 0.1em; border-radius: 4px; }

.ed-grid { display: flex; flex-direction: column; gap: 16px; }
.ed-card { padding: 24px; }
.ed-icon-wrap { display: none; }
.cert-list { margin-top: 16px; }
.cert-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; color: var(--text-muted); font-size: 0.875rem; }
.cert-item svg { color: var(--accent); margin-top: 2px; flex-shrink: 0; width: 16px; height: 16px; }

.contact-wrap { text-align: left; max-width: 700px; margin: 0; }
.contact-desc { font-size: 0.875rem; color: var(--text-muted); margin-bottom: 32px; }
.contact-row { display: flex; justify-content: flex-start; gap: 24px; margin-bottom: 32px; flex-wrap: wrap; }
.c-link { display: flex; align-items: center; gap: 8px; font-size: 0.75rem; color: var(--accent); transition: color 0.3s; }
.c-link::after { display: none; }

footer { padding: 24px 0; border-top: 1px solid rgba(255,255,255,0.05); font-size: 0.625rem; text-align: left; color: rgba(255,255,255,0.3); text-transform: uppercase; letter-spacing: 0.1em; background: rgba(0,0,0,0.4); display: flex; align-items: center;}
.footer-text { display: flex; justify-content: space-between; align-items: center; width: 100%; margin: 0; }

@media(max-width: 900px) {
  .bento-item:nth-child(1), .bento-item:nth-child(2) { grid-column: span 12; }
}

@media(max-width: 768px) {
  .mobile-toggle { display: block; z-index: 101;}
  .nav-links { position: fixed; top: 0; right: -100%; width: 100%; height: 100vh; background: rgba(5, 5, 8, 0.98); backdrop-filter: blur(30px); flex-direction: column; justify-content: center; transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
  .nav-links.open { right: 0; }
  .hero-cta { flex-direction: column; width: 100%; max-width: 300px; }
  .timeline { margin-left: 0; }
  .time-item { padding-left: 0; }
}

@keyframes button-pulse {
  0% { transform: scale(1); border-color: rgba(255,255,255,0.2); }
  50% { transform: scale(1.02); border-color: rgba(255,255,255,0.4); }
  100% { transform: scale(1); border-color: rgba(255,255,255,0.2); }
}
`;

content = content.replace(/const cssString = `[\s\S]*?`;/, 'const cssString = `' + newCss + '`;');
fs.writeFileSync('src/App.tsx', content);

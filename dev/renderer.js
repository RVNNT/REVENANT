// =============================================================
// RENDERER — CSS + логіка рендерингу
// Не редагуй якщо не знаєш що робиш
// =============================================================

const VERSION = "0.1";


// ── CSS ──────────────────────────────────────────────────────
(function() {
  const style = document.createElement('style');
  style.textContent = `
  /* ===== DARK THEME (default) ===== */
  :root {
    --bg:     #0f1117;
    --bg2:    #1a1d27;
    --bg3:    #21253a;
    --bg4:    #0c0e1a;
    --bd1:    #2e3250;
    --bd2:    #3a3f6a;
    --text1:  #e2e8f0;
    --text2:  #f8fafc;
    --text3:  #cbd5e1;
    --dim1:   #94a3b8;
    --dim2:   #7a8ba8;
    --dim3:   #5a6b88;
    --dim4:   #3a4b68;
    --accent: #4f9cf9;
    --accent2:#f97316;
    --accent3:#22c55e;
    --note-c: #facc15;
    --radius: 10px;
  }
  /* ===== LIGHT THEME ===== */
  body.light {
    --bg:     #f0f4f8;
    --bg2:    #e2e8f4;
    --bg3:    #d8e0ef;
    --bg4:    #f5f8fc;
    --bd1:    #b8c4d8;
    --bd2:    #9aacc4;
    --text1:  #1e2a3a;
    --text2:  #0f1a2a;
    --text3:  #2a3848;
    --dim1:   #4a5a70;
    --dim2:   #5a6a80;
    --dim3:   #7a8a9a;
    --dim4:   #9aaab8;
    --accent: #1d6fcc;
    --accent2:#c45000;
    --accent3:#16a34a;
    --note-c: #b45309;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    min-height: 100vh; background: var(--bg);
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    color: var(--text1); transition: background 0.2s, color 0.2s; line-height: 1.6;
    display: flex; flex-direction: column;
  }
  button { cursor: pointer; font-family: inherit; }
  a { color: inherit; }

  /* ===== HEADER ===== */
  .header {
    background: linear-gradient(135deg, var(--bg) 0%, var(--bg2) 60%, var(--bg) 100%);
    border-bottom: none; padding: 7px 24px 3px;
    position: relative;
  }
  .header::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 70% 70% at 20% 0%, rgba(79,156,249,0.08) 0%, transparent 70%);
  }
  .header-inner { max-width: 900px; margin: 0 auto; position: relative; display: flex; align-items: center; gap: 12px; }
  .header-logo-link { flex-shrink: 0; display: flex; align-items: center; text-decoration: none; padding: 0; }
  .header-logo { height: 80px; width: auto; display: block; opacity: 0.9; transition: opacity 0.15s; }
  .header-logo:hover { opacity: 1; }
  .header-text { flex: 1; min-width: 0; }
  .project-label { font-size: 10px; letter-spacing: 6px; color: var(--dim3); margin-bottom: 6px; text-transform: uppercase; }
  .project-name  { font-size: clamp(28px, 5vw, 48px); font-weight: 900; color: var(--text2); letter-spacing: -1px; line-height: 1; margin-bottom: 4px; }
  .project-sub   { font-size: 11px; letter-spacing: 4px; color: var(--accent); text-transform: uppercase; font-weight: 600; }
  .header-desc   { color: var(--dim1); font-size: 13px; max-width: 600px; line-height: 1.6; }
  .toggle-group  { display: flex; gap: 6px; position: absolute; top: 0; right: 0; }
  .toggle-btn {
    background: var(--bg3); border: 1px solid var(--bd1); color: var(--dim2);
    font-size: 11px; letter-spacing: 1px; padding: 5px 14px; border-radius: 100px;
    display: flex; align-items: center; gap: 6px; transition: all 0.15s;
  }
  .toggle-btn:hover { border-color: var(--accent); color: var(--accent); }

  /* ===== MAIN ===== */
  .main { max-width: 900px; width: 100%; margin: 0 auto; padding: 20px 16px 20px; display: flex; flex-direction: column; justify-content: space-between; }
  .main.home-page { flex: 1; }

  /* ===== SECTION CARDS (main page) ===== */
  .cs-group {
    border: 1px solid var(--bd1); border-radius: var(--radius);
    overflow: hidden; background: var(--bg2);
  }
  .cs-group-title {
    height: 8px; background: var(--bg3); border-bottom: 1px solid var(--bd1);
    overflow: hidden; font-size: 0;
  }
  .cs-card {
    display: flex; align-items: center; gap: 16px;
    background: none; border: none; border-bottom: 1px solid rgba(255,255,255,0.04);
    padding: 8px 12px; cursor: pointer; transition: background 0.15s;
    width: 100%; text-align: left; color: var(--text1);
  }
  .cs-card:hover { background: rgba(255,255,255,0.04); }
  .cs-emoji {
    width: 40px; height: 40px; border-radius: 10px;
    display: flex; align-items: center; justify-content: center;
    font-size: 10px; font-weight: 800; letter-spacing: 0.3px; flex-shrink: 0; text-align: center;
  }
  .cs-meta { flex: 1; min-width: 0; }
  .cs-title-row { display: flex; align-items: center; flex-wrap: wrap; gap: 8px; }
  .cs-title  { font-size: 14px; font-weight: 700; }
  .cs-count  { font-size: 10px; padding: 2px 9px; border-radius: 100px; font-weight: 600; white-space: nowrap; }
  .cs-sub    { font-size: 12px; color: var(--dim2); margin-top: 4px; line-height: 1.5; }
  .cs-arrow  { color: var(--dim3); font-size: 14px; margin-left: auto; flex-shrink: 0; transition: all 0.15s; }
  .cs-card:hover .cs-arrow { transform: translateX(3px); color: var(--accent); }

  /* ===== BACK BUTTON ===== */
  .back-btn {
    display: inline-flex; align-items: center; gap: 7px;
    background: var(--bg3); border: 1px solid var(--bd1); color: var(--dim2);
    font-size: 11px; letter-spacing: 1px; padding: 6px 14px; border-radius: 100px;
    margin-bottom: 16px; transition: all 0.15s;
  }
  .back-btn:hover { border-color: var(--accent); color: var(--accent); }

  /* ===== SECTION HERO ===== */
  .sp-hero {
    border-radius: var(--radius) var(--radius) 0 0; padding: 22px 20px 18px;
    border: 1px solid var(--bd1); border-bottom: none; position: relative; overflow: hidden;
  }
  .sp-hero::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 60% 80% at 10% 50%, rgba(79,156,249,0.07) 0%, transparent 70%);
  }
  .sp-hero-inner { position: relative; display: flex; align-items: flex-start; gap: 14px; }
  .sp-icon   { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; flex-shrink: 0; }
  .sp-title  { font-size: 19px; font-weight: 800; line-height: 1.2; margin-bottom: 5px; }
  .sp-subtitle { font-size: 12px; color: var(--dim1); line-height: 1.5; }
  .sp-analogy {
    padding: 10px 16px; background: rgba(79,156,249,0.06);
    border: 1px solid var(--bd1); border-top: 1px solid rgba(79,156,249,0.12);
    display: flex; gap: 10px;
  }
  .sp-analogy-icon { font-size: 0.95rem; flex-shrink: 0; color: var(--accent); margin-top: 1px; }
  .sp-analogy-text { font-size: 11px; color: var(--dim1); line-height: 1.6; font-style: italic; }
  .sp-body {
    border: 1px solid var(--bd1); border-top: none;
    border-radius: 0 0 var(--radius) var(--radius); background: var(--bg4); padding: 10px;
  }

  /* ===== ENTRY ACCORDION ===== */
  .cs-item { border: 1px solid var(--bd1); border-radius: 8px; margin-bottom: 6px; overflow: hidden; }
  .cs-item-hdr {
    width: 100%; background: var(--bg3); border: none;
    padding: 9px 12px; display: flex; align-items: center; gap: 8px;
    text-align: left; cursor: pointer; transition: background 0.12s;
  }
  .cs-item-hdr:hover, .cs-item-hdr.open { background: var(--bg2); }
  .cs-pri { font-size: 9px; font-weight: 700; letter-spacing: 0.3px; padding: 2px 8px; border-radius: 100px; flex-shrink: 0; white-space: nowrap; }
  .cs-pri.crit  { background: rgba(239,68,68,0.15);  color: #f87171; }
  .cs-pri.imp   { background: rgba(249,115,22,0.15); color: #fb923c; }
  .cs-pri.wish  { background: rgba(79,156,249,0.15); color: #93c5fd; }
  .cs-pri.extra { background: rgba(100,116,139,0.15);color: #94a3b8; }
  .cs-item-name { font-size: 12px; color: var(--text3); font-weight: 600; flex: 1; line-height: 1.4; }
  .cs-item-arr  { color: var(--dim4); font-size: 10px; flex-shrink: 0; }
  .cs-item-body { padding: 14px; display: none; background: var(--bg4); border-top: 1px solid var(--bd1); }
  .cs-item-body.open { display: block; }

  /* ===== WHY TEXT ===== */
  .cs-why { font-size: 12px; color: var(--dim1); line-height: 1.75; margin-bottom: 12px; }

  /* ===== STEPS ===== */
  .cs-steps-lbl { font-size: 9px; color: var(--dim3); letter-spacing: 2px; margin: 4px 0 10px; font-weight: 700; }
  .cs-steps { counter-reset: csstep; margin-bottom: 10px; }
  .cs-step  { display: flex; gap: 12px; margin-bottom: 14px; }
  .cs-step::before {
    counter-increment: csstep; content: counter(csstep);
    width: 26px; height: 26px; background: var(--accent); color: #fff;
    font-weight: 800; font-size: 0.72rem; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; margin-top: 1px;
  }
  .cs-step-title { font-size: 12px; font-weight: 700; color: var(--text2); margin-bottom: 4px; }
  .cs-step-desc  { font-size: 11px; color: var(--dim1); line-height: 1.65; margin-bottom: 4px; }
  .cs-step-code  {
    display: block; font-family: 'Courier New', monospace; font-size: 10px;
    background: rgba(0,0,0,0.35); border: 1px solid var(--bd1);
    padding: 8px 10px; border-radius: 6px; overflow-x: auto;
    color: var(--text3); white-space: pre; margin: 5px 0 0; line-height: 1.5;
  }

  /* ===== ARCHIVE BOX ===== */
  .cs-arc {
    margin: 10px 0; padding: 8px 12px; background: var(--bg2);
    border: 1px solid var(--bd1); border-left: 2px solid var(--accent2);
    border-radius: 0 6px 6px 0; display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
  }
  .cs-arc-lbl   { font-size: 9px; letter-spacing: 2px; color: var(--accent2); flex-shrink: 0; font-weight: 700; }
  .cs-arc-path  { font-size: 11px; color: var(--text3); background: var(--bg4); padding: 2px 8px; border-radius: 4px; border: 1px solid var(--bd1); font-family: 'Courier New', monospace; }
  .cs-arc-files { font-size: 10px; color: var(--dim2); }
  .cs-arc-note  { font-size: 10px; color: var(--note-c); width: 100%; margin-top: 2px; }

  /* ===== TAGS ===== */
  .cs-tags-lbl  { font-size: 9px; color: var(--dim3); letter-spacing: 2px; margin-bottom: 6px; font-weight: 700; }
  .cs-tags-list { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 10px; }
  .cs-tag       { font-size: 10px; background: rgba(79,156,249,0.1); color: var(--accent); padding: 3px 10px; border-radius: 100px; border: 1px solid rgba(79,156,249,0.2); }

  /* ===== LINKS ===== */
  .cs-links-lbl  { font-size: 9px; color: var(--dim3); letter-spacing: 2px; margin: 8px 0 6px; font-weight: 700; }
  .cs-links-list { display: flex; flex-wrap: wrap; gap: 6px; }
  .cs-link       { font-size: 11px; color: var(--accent); background: rgba(79,156,249,0.08); border: 1px solid rgba(79,156,249,0.2); padding: 4px 12px; border-radius: 100px; text-decoration: none; transition: all 0.15s; }
  .cs-link:hover { background: rgba(79,156,249,0.16); border-color: rgba(79,156,249,0.4); }
  .cs-link::before { content: "↓ "; font-size: 10px; }
  .cs-link-nav   { color: var(--accent2) !important; background: rgba(249,115,22,0.08) !important; border-color: rgba(249,115,22,0.22) !important; }
  .cs-link-nav::before { content: "→ "; }
  .cs-link-nav:hover { background: rgba(249,115,22,0.16) !important; }

  /* ===== NOTE CALLOUT ===== */
  .cs-note {
    margin-top: 10px; padding: 10px 14px; border-radius: 8px;
    display: flex; gap: 10px; align-items: flex-start;
    background: rgba(250,204,21,0.07); border: 1px solid rgba(250,204,21,0.2); color: #fde047;
  }
  .cs-note-icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }
  .cs-note-text { font-size: 11px; line-height: 1.6; }

  /* ===== FOOTER ===== */
  .site-footer {
    margin-top: 5px; padding: 12px 20px;
    border-top: 1px solid var(--bd1);
    font-size: 11px; color: var(--dim3); text-align: center;
    letter-spacing: 2px;
  }
  .site-footer a { color: var(--accent); text-decoration: none; opacity: 0.7; transition: opacity 0.15s; }
  .site-footer a:hover { opacity: 1; }

`;
  document.head.appendChild(style);

  // ── Рендер хедера ────────────────────────────────────────────
  document.querySelector('.header-inner').innerHTML = `
    <a class="header-logo-link" href="#" title="REVENANT Home"
       onclick="event.preventDefault();history.pushState(null,'',location.pathname);renderMain();window.scrollTo(0,0);">
      <svg viewBox="-3 -3 106 106" width="80" height="80" xmlns="http://www.w3.org/2000/svg" class="header-logo">
    <line x1="88.1" y1="28.0" x2="93.3" y2="25.0" stroke="#2a8aff" stroke-width="1.8" opacity="0.5"/>
    <circle cx="93.3" cy="25.0" r="2.4" fill="none" stroke="#2a8aff" stroke-width="0.9"/>
    <line x1="88.1" y1="72.0" x2="93.3" y2="75.0" stroke="#2a8aff" stroke-width="1.8" opacity="0.5"/>
    <circle cx="93.3" cy="75.0" r="2.4" fill="none" stroke="#2a8aff" stroke-width="0.9"/>
    <line x1="50.0" y1="94.0" x2="50.0" y2="100.0" stroke="#2a8aff" stroke-width="1.8" opacity="0.5"/>
    <circle cx="50.0" cy="100.0" r="2.4" fill="none" stroke="#2a8aff" stroke-width="0.9"/>
    <line x1="11.9" y1="72.0" x2="6.7" y2="75.0" stroke="#2a8aff" stroke-width="1.8" opacity="0.5"/>
    <circle cx="6.7" cy="75.0" r="2.4" fill="none" stroke="#2a8aff" stroke-width="0.9"/>
    <line x1="11.9" y1="28.0" x2="6.7" y2="25.0" stroke="#2a8aff" stroke-width="1.8" opacity="0.5"/>
    <circle cx="6.7" cy="25.0" r="2.4" fill="none" stroke="#2a8aff" stroke-width="0.9"/>
    <line x1="50.0" y1="6.0" x2="50.0" y2="0.0" stroke="#2a8aff" stroke-width="1.8" opacity="0.5"/>
    <circle cx="50.0" cy="0.0" r="2.4" fill="none" stroke="#2a8aff" stroke-width="0.9"/>
    <polygon points="88.11,28.00 88.11,72.00 50.00,94.00 11.89,72.00 11.89,28.00 50.00,6.00" fill="#0c1625" stroke="#2a8aff" stroke-width="1.6"/>
    <polygon points="75.98,35.00 75.98,65.00 50.00,80.00 24.02,65.00 24.02,35.00 50.00,20.00" fill="none" stroke="#2a8aff" stroke-width="0.7" stroke-dasharray="3,2" opacity="0.35"/>
    <text font-family="'Arial Black',Arial,sans-serif" text-anchor="middle" dominant-baseline="middle" x="25" y="50" font-size="17" font-weight="900" fill="none" stroke="#2a8aff" stroke-width="0.65" stroke-linejoin="round" opacity="0.5">CO</text>
    <text font-family="'Arial Black',Arial,sans-serif" text-anchor="middle" dominant-baseline="middle" x="50" y="13.0" font-size="11.5" font-weight="700" fill="#2a8aff">V</text>
    <text font-family="'Arial Black',Arial,sans-serif" text-anchor="middle" dominant-baseline="middle" x="50" y="28.6" font-size="11.5" font-weight="700" fill="#2a8aff">E</text>
    <text font-family="'Arial Black',Arial,sans-serif" text-anchor="middle" dominant-baseline="middle" x="50" y="42.2" font-size="11.5" font-weight="700" fill="#2a8aff">N</text>
    <text font-family="'Arial Black',Arial,sans-serif" text-anchor="middle" dominant-baseline="middle" x="50" y="57.8" font-size="11.5" font-weight="700" fill="#2a8aff">A</text>
    <text font-family="'Arial Black',Arial,sans-serif" text-anchor="middle" dominant-baseline="middle" x="50" y="73.4" font-size="11.5" font-weight="700" fill="#2a8aff">N</text>
    <text font-family="'Arial Black',Arial,sans-serif" text-anchor="middle" dominant-baseline="middle" x="50" y="91.0" font-size="11.5" font-weight="700" fill="#2a8aff">T</text>
    <text font-family="'Arial Black',Arial,sans-serif" text-anchor="middle" dominant-baseline="middle" x="75" y="50" font-size="17" font-weight="900" fill="#2a8aff">RE</text>
  </svg>
    </a>
    <div class="header-text">
      <div class="project-name">REVENANT</div>
      <div class="project-sub">Hardened Bootstrap Software Recovery Protocol</div>
    </div>
    <div class="toggle-group">
      <button class="toggle-btn" onclick="toggleTheme()">
        <span id="themeIcon">☀</span>
        <span id="themeLabel">ДЕНЬ</span>
      </button>
      <button class="toggle-btn" onclick="toggleLang()">
        <span id="langIcon">UA</span>
      </button>
    </div>
  `;
})();

// =============================================================
// ЛОГІКА — не редагуй якщо не знаєш що робиш
// =============================================================

const UI = {
  ua: {
    back: "Назад", items: "пунктів",
    targets: "ЩО ЗБЕРІГАТИ / ЗНАТИ:", links: "ПОСИЛАННЯ:",
    stepsLabel: "КРОКИ:", archiveLabel: "АРХІВ:",
    themeDay: "ДЕНЬ", themeNight: "НІЧ",
    pri: { "КРИТИЧНО":"КРИТИЧНО", "ВАЖЛИВО":"ВАЖЛИВО", "БАЖАНО":"БАЖАНО", "ДОДАТКОВО":"ДОДАТКОВО" }
  },
  en: {
    back: "Back", items: "items",
    targets: "WHAT TO SAVE / KNOW:", links: "LINKS:",
    stepsLabel: "STEPS:", archiveLabel: "ARCHIVE:",
    themeDay: "DAY", themeNight: "NIGHT",
    pri: { "КРИТИЧНО":"CRITICAL", "ВАЖЛИВО":"IMPORTANT", "БАЖАНО":"DESIRED", "ДОДАТКОВО":"OPTIONAL" }
  }
};

let currentLang = "en";
let isLight = false;

function L(obj, field) {
  const ef = field + "_en";
  return currentLang === "en" && obj[ef] ? obj[ef] : obj[field];
}
function T(key) { return UI[currentLang][key]; }
function Lpri(p) { return (UI[currentLang].pri||{})[p] || p || (currentLang==="en"?"OPTIONAL":"ДОДАТКОВО"); }

function toggleLang() {
  currentLang = currentLang === "ua" ? "en" : "ua";
  document.getElementById("langIcon").textContent = currentLang === "en" ? "UA" : "EN";
  document.getElementById("themeLabel").textContent = isLight ? T("themeNight") : T("themeDay");
  document.documentElement.lang = currentLang === "en" ? "en" : "uk";
  renderFooter();
  handleRoute();
}

function toggleTheme() {
  isLight = !isLight;
  document.body.classList.toggle("light", isLight);
  document.getElementById("themeIcon").textContent  = isLight ? "☽" : "☀";
  document.getElementById("themeLabel").textContent = isLight ? T("themeNight") : T("themeDay");
}

function priClass(p) {
  if(!p) return 'extra';
  if(p.includes('КРИТ') || p.includes('CRIT')) return 'crit';
  if(p.includes('ВАЖЛ') || p.includes('IMP'))  return 'imp';
  if(p.includes('БАЖА') || p.includes('WISH')) return 'wish';
  return 'extra';
}

function renderEntries(section, entries) {
  return entries.map((entry, ii) => {
    const ek = section.id + '-' + ii;
    const pc = priClass(entry.priority);
    return `
    <div class="cs-item">
      <button class="cs-item-hdr" onclick="toggleItem('${ek}')" id="ihdr-${ek}">
        <span class="cs-pri ${pc}">${Lpri(entry.priority)}</span>
        <span class="cs-item-name">${L(entry,'name')}</span>
        <span class="cs-item-arr" id="iarr-${ek}">▼</span>
      </button>
      <div class="cs-item-body" id="ibody-${ek}">
        <div class="cs-why">${L(entry,'why')}</div>
        ${entry.steps && entry.steps.length ? `
        <div class="cs-steps-lbl">${T('stepsLabel')}</div>
        <div class="cs-steps">
        ${entry.steps.map(s => `
        <div class="cs-step">
          <div>
            <div class="cs-step-title">${currentLang==='en'&&s.t_en?s.t_en:s.t}</div>
            ${(currentLang==='en'&&s.b_en?s.b_en:s.b)?`<div class="cs-step-desc">${currentLang==='en'&&s.b_en?s.b_en:s.b}</div>`:''}
            ${s.c?`<pre class="cs-step-code">${s.c.replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>`:''}
          </div>
        </div>`).join('')}
        </div>` : ''}
        ${entry.archive ? `
        <div class="cs-arc">
          <span class="cs-arc-lbl">${T('archiveLabel')}</span>
          <code class="cs-arc-path">REVENANT-DEPOT/${entry.archive.dir}</code>
          ${entry.archive.files&&entry.archive.files.length?`<span class="cs-arc-files">${entry.archive.files.join(', ')}</span>`:''}
          ${entry.archive.note?`<div class="cs-arc-note">${currentLang==='en'&&entry.archive.note_en?entry.archive.note_en:entry.archive.note}</div>`:''}
        </div>` : ''}
        ${entry.targets&&entry.targets.length?`<div class="cs-tags-lbl">${T('targets')}</div><div class="cs-tags-list">${(currentLang==='en'&&entry.targets_en&&entry.targets_en.length?entry.targets_en:entry.targets).map(t=>`<span class="cs-tag">${t}</span>`).join('')}</div>`:''}
        ${entry.links&&entry.links.length?`<div class="cs-links-lbl">${T('links')}</div><div class="cs-links-list">${entry.links.map(l=>{const lt=currentLang==='en'&&l.t_en?l.t_en:l.t;return l.u.startsWith('#')?`<a class="cs-link cs-link-nav" href="${l.u}" onclick="event.preventDefault();location.hash='${l.u.slice(1)}'">${lt}</a>`:`<a class="cs-link" href="${l.u}" target="_blank">${lt}</a>`;}).join('')}</div>`:''}
        ${entry.note?`<div class="cs-note"><span class="cs-note-icon">⚠️</span><span class="cs-note-text">${L(entry,'note')}</span></div>`:''}
      </div>
    </div>`;
  }).join('');
}

function renderMain() {
  const main = document.getElementById('main');
  main.classList.add('home-page');
  let html = '';
  SECTIONS.forEach(group => {
    if(group.hidden) return;
    const visibleItems = group.items.filter(s => !s.hidden);
    if(!visibleItems.length) return;
    html += `<div class="cs-group"><div class="cs-group-title">${L(group,'group')}</div>`;
    visibleItems.forEach(section => {
      html += `
      <button class="cs-card" onclick="location.hash='section/${section.id}'">
        <div class="cs-emoji" style="background:${section.color}22;color:${section.color};border:1px solid ${section.color}44">${section.emoji}</div>
        <div class="cs-meta">
          <div class="cs-title-row">
            <span class="cs-title" style="color:${section.color}">${L(section,'title')}</span>
            <span class="cs-count" style="background:${section.color}18;color:${section.color}">${section.entries.length} ${T('items')}</span>
          </div>
          <div class="cs-sub">${L(section,'subtitle')}</div>
        </div>
        <span class="cs-arrow">\u25b6</span>
      </button>`;
    });
    html += '</div>';
  });
  main.innerHTML = html;
}

function renderSectionPage(id) {
  const section = SECTIONS.flatMap(g=>g.items).find(s=>s.id===id);
  if(!section) { location.hash=''; return; }
  document.getElementById('main').classList.remove('home-page');
  document.getElementById('main').innerHTML = `
    <button class="back-btn" onclick="history.back()">← ${T('back')}</button>
    <div class="sp-hero" style="background:linear-gradient(135deg,${section.color}0d 0%,var(--bg2) 100%)">
      <div class="sp-hero-inner">
        <div class="sp-icon" style="background:${section.color}22;color:${section.color};border:1px solid ${section.color}44">${section.emoji}</div>
        <div>
          <div class="sp-title" style="color:${section.color}">${L(section,'title')}</div>
          <div class="sp-subtitle">${L(section,'subtitle')}</div>
        </div>
      </div>
    </div>
    ${section.analogy?`<div class="sp-analogy"><span class="sp-analogy-icon">💡</span><span class="sp-analogy-text">${L(section,'analogy')}</span></div>`:''}
    <div class="sp-body">${renderEntries(section, section.entries)}</div>`;
  window.scrollTo(0,0);
}

function handleRoute() {
  const hash = location.hash.slice(1);
  if(hash.startsWith('section/')) renderSectionPage(hash.slice(8));
  else renderMain();
}

window.addEventListener('hashchange', handleRoute);

function toggleItem(key) {
  const body = document.getElementById("ibody-"+key);
  const hdr  = document.getElementById("ihdr-"+key);
  const arr  = document.getElementById("iarr-"+key);
  const open = body.classList.toggle("open");
  hdr.classList.toggle("open", open);
  arr.textContent = open ? "▲" : "▼";
}

// ── Рендер футера ────────────────────────────────────────────
function renderFooter() {
  document.getElementById('footer').innerHTML =
    `REVENANT v${VERSION} &nbsp;·&nbsp; ` +
    `<a href="https://github.com/RVNNT" target="_blank">GitHub</a>` +
    ` &nbsp;·&nbsp; ` +
    `<a href="https://t.me/rvnnt2" target="_blank">Telegram</a>`;
}

renderFooter();
handleRoute();
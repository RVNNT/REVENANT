// =============================================================
// REVENANT — build script
// Читає: sections.js + renderer.js
// Пише:  revenant.html (dist, відкривай у браузері)
// =============================================================

const fs   = require('fs');
const path = require('path');

const DIR  = __dirname;

const sections = fs.readFileSync(path.join(DIR, 'sections.js'),  'utf8');
const renderer = fs.readFileSync(path.join(DIR, 'renderer.js'),  'utf8');

const html = `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>REVENANT v0.1.3 — Hardened Bootstrap Software Recovery Protocol</title>
</head>
<body>

<div class="header">
  <div class="header-inner">
    <div class="project-name">REVENANT</div>
    <div class="project-sub">Hardened Bootstrap Software Recovery Protocol</div>
    <div class="toggle-group">
      <button class="toggle-btn" onclick="toggleTheme()">
        <span id="themeIcon">☀</span>
        <span id="themeLabel">ДЕНЬ</span>
      </button>
      <button class="toggle-btn" onclick="toggleLang()">
        <span id="langIcon">EN</span>
      </button>
    </div>
  </div>
</div>

<div class="main" id="main"></div>

<script>
${sections}
</script>
<script>
${renderer}
</script>

</body>
</html>`;

const outPath = path.join(DIR, 'revenant.html');
fs.writeFileSync(outPath, html, 'utf8');

const kb = Math.round(html.length / 1024);
console.log(`✅ revenant.html (${kb} KB) — готово`);

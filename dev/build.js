// =============================================================
// REVENANT — build script
//
// ВИКОРИСТАННЯ:
//   node build.js              — збірка (з базовою мініфікацією)
//   node build.js --watch      — слідкує за змінами, перебудовує автоматично
//   node build.js --minify     — глибока мініфікація через esbuild
//                                (потрібно: npm install esbuild)
//   node build.js --watch --minify  — watch + deep minify
//
// ВХІД:  content.js + renderer.js
// ВИХІД: index.html (відкривай у браузері)
// =============================================================

const fs   = require('fs');
const path = require('path');
const vm   = require('vm');

const DIR         = __dirname;
const ARGS        = process.argv.slice(2);
const WATCH       = ARGS.includes('--watch');
const MINIFY_DEEP = ARGS.includes('--minify');

// ── Базова мініфікація (без залежностей) ─────────────────────
function basicMinify(code) {
  return code
    .replace(/\/\*[\s\S]*?\*\//g, '')   // блокові коментарі
    .replace(/^\s*\/\/.*$/gm, '')        // рядкові коментарі
    .replace(/\n{3,}/g, '\n')            // зайві порожні рядки
    .trim();
}

// ── Валідація структури SECTIONS ─────────────────────────────
function validate(sectionsCode) {
  const warnings = [];

  let sections;
  try {
    const sandbox = {};
    vm.runInNewContext(sectionsCode + '; __S = SECTIONS;', sandbox);
    sections = sandbox.__S;
  } catch (e) {
    warnings.push(`Не вдалося розпарсити content.js: ${e.message}`);
    return warnings;
  }

  if (!Array.isArray(sections)) {
    warnings.push('SECTIONS не є масивом');
    return warnings;
  }

  const ids = new Set();

  sections.forEach((group, gi) => {
    if (!group.group)    warnings.push(`Група [${gi}]: відсутнє поле group`);
    if (!group.group_en) warnings.push(`Група [${gi}] "${group.group}": відсутнє group_en`);
    if (!Array.isArray(group.items)) return;

    group.items.forEach((item, ii) => {
      const loc = `${group.group} → item[${ii}] id="${item.id}"`;

      if (!item.id)         warnings.push(`${loc}: відсутнє поле id`);
      if (item.path)        warnings.push(`${loc}: знайдено застаріле поле path (має бути id)`);
      if (ids.has(item.id)) warnings.push(`${loc}: дублікат id "${item.id}"`);
      else if (item.id)     ids.add(item.id);

      if (!item.title_en)    warnings.push(`${loc}: відсутнє title_en`);
      if (!item.subtitle_en) warnings.push(`${loc}: відсутнє subtitle_en`);

      if (!Array.isArray(item.entries)) return;

      item.entries.forEach((entry, ei) => {
        const eloc = `${loc} → entry[${ei}] "${entry.name}"`;
        if (!entry.name_en) warnings.push(`${eloc}: відсутнє name_en`);
        if (!entry.why_en)  warnings.push(`${eloc}: відсутнє why_en`);

        if (Array.isArray(entry.steps)) {
          entry.steps.forEach((step, si) => {
            if (!step.t_en) warnings.push(`${eloc} → step[${si}] "${step.t}": відсутнє t_en`);
          });
        }
      });
    });
  });

  return warnings;
}

// ── Основна збірка ────────────────────────────────────────────
async function build() {
  const contentPath  = path.join(DIR, 'content.js');
  const rendererPath = path.join(DIR, 'renderer.js');
  const outPath      = path.join(DIR, 'index.html');

  if (!fs.existsSync(contentPath))  { console.error('❌  content.js не знайдено');  process.exit(1); }
  if (!fs.existsSync(rendererPath)) { console.error('❌  renderer.js не знайдено'); process.exit(1); }

  let sections = fs.readFileSync(contentPath,  'utf8');
  let renderer = fs.readFileSync(rendererPath, 'utf8');

  // Валідація
  const warnings = validate(sections);
  if (warnings.length) {
    warnings.forEach(w => console.warn('  ⚠️   ' + w));
    console.warn(`  └── ${warnings.length} попередження (збірка продовжується)\n`);
  }

  // Мініфікація
  let minifyTag = '[basic minify]';
  if (MINIFY_DEEP) {
    try {
      const esbuild = require('esbuild');
      const [r1, r2] = await Promise.all([
        esbuild.transform(sections, { minify: true, loader: 'js' }),
        esbuild.transform(renderer, { minify: true, loader: 'js' }),
      ]);
      sections = r1.code;
      renderer = r2.code;
      minifyTag = '[esbuild minify]';
    } catch (e) {
      console.warn('  ⚠️   esbuild недоступний, використовую базову мініфікацію.');
      console.warn('        Встановити: npm install esbuild\n');
      sections = basicMinify(sections);
      renderer = basicMinify(renderer);
    }
  } else {
    sections = basicMinify(sections);
    renderer = basicMinify(renderer);
  }

  const html = `<!DOCTYPE html>
<html lang="uk">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="REVENANT — покроковий протокол відродження цивілізації з USB-носія. Від клану до мегаполісу.">
<meta property="og:title" content="REVENANT — Hardened Bootstrap Software Recovery Protocol">
<meta property="og:description" content="Покроковий протокол відродження цивілізації з USB-носія. Від клану до мегаполісу.">
<meta property="og:url" content="https://rvnnt.github.io/REVENANT">
<meta property="og:type" content="website">
<title>REVENANT — Hardened Bootstrap Software Recovery Protocol</title>
</head>
<body>

<div class="header"><div class="header-inner"></div></div>

<div class="main" id="main"></div>

<footer class="site-footer" id="footer"></footer>

<script>
${sections}
</script>
<script>
${renderer}
</script>

</body>
</html>`;

  fs.writeFileSync(outPath, html, 'utf8');

  const kb  = Math.round(html.length / 1024);
  const ts  = new Date().toLocaleTimeString('uk-UA');
  console.log(`✅  index.html (${kb} KB) ${minifyTag} — ${ts}`);
}

// ── Запуск ────────────────────────────────────────────────────
build().catch(err => {
  console.error('❌  Збірка провалилась:', err.message);
  process.exit(1);
});

if (WATCH) {
  console.log('👁   Watch-режим активний. Ctrl+C для виходу.\n');
  let debounce = null;
  ['content.js', 'renderer.js'].forEach(file => {
    fs.watch(path.join(DIR, file), () => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        console.log(`🔄  ${file} змінено, перебудовую...`);
        build().catch(err => console.error('❌  Збірка провалилась:', err.message));
      }, 150);
    });
  });
}

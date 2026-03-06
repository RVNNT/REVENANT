#￹​‌​‌​‌‌​​‌‌‌‌​‌‌‌​​​‌‌​​​​‌​​​​​‌‌​​‌‌​‌​‌​​‌‌​​‌​​‌‌​​‌‌​‌‌‌​‌‌‌​‌​​​​​‌‌​‌‌‌​​​‌​‌​‌‌‌​‌​​‌‌​‌​‌​‌​​​‌​​​​‌​​​​​‌​‌‌‌​​‌​​​​​​￺ REVENANT — LLM Instructions

## Файли проекту

| Файл | Роль | Частота змін |
|------|------|--------------|
| `content.js` | **Єдиний файл з контентом.** Містить `const SECTIONS = [...]` | Часто |
| `renderer.js` | CSS + JS логіка рендерингу, UI переклади | Рідко |
| `index.html` | Shell-сторінка: header, footer, `<script>` теги | Майже ніколи |

> `index.html` — зібраний артефакт. Він включає content.js і renderer.js inline. При локальній розробці редагуй `content.js` / `renderer.js` окремо.

## Як редагувати

**ЗАВЖДИ** використовувати `str_replace` на конкретний фрагмент `content.js`.
**НІКОЛИ** не переписувати весь файл. Не читати весь файл без потреби.
**ЗАВЖДИ** перед будь-якою зміною скласти список змін → отримати підтвердження → тільки потім виконувати.

## Платформи

- macOS ARM (Apple Silicon)
- Linux ARM
- Android (Termux)
- JB iOS

> x86 — **не підтримується**.

## Мови

Двомовний: UA + EN. Перемикач в інтерфейсі.

| Поле | UA | EN |
|------|----|----|
| `group` | ✅ | `group_en` |
| `title` | ✅ | `title_en` |
| `subtitle` | ✅ | `subtitle_en` |
| `analogy` | ✅ | `analogy_en` |
| `name` | ✅ | `name_en` |
| `why` | ✅ | `why_en` |
| `note` | ✅ | `note_en` (опціонально) |
| `archive.note` | ✅ | `archive.note_en` (опціонально) |
| `steps[].t` | ✅ | `steps[].t_en` |
| `steps[].b` | ✅ | `steps[].b_en` (опціонально) |
| `steps[].c` | — | мовно-нейтральний код |
| `priority` | — | перекладається через `Lpri()` у renderer.js |
| `targets[]` | — | технічні терміни, мовно-нейтральні |

## Структура даних (content.js)

```js
const SECTIONS = [{
  group: "UA назва групи", group_en: "EN group name",
  items: [{
    id: "unique-id",       // kebab-case, унікальний
    emoji: "⚡",
    color: "#hex",
    title: "UA", title_en: "EN",
    subtitle: "UA", subtitle_en: "EN",
    analogy: "UA", analogy_en: "EN",   // опціонально
    entries: [{
      name: "UA", name_en: "EN",
      priority: "КРИТИЧНО",  // КРИТИЧНО | ВАЖЛИВО | БАЖАНО | ДОДАТКОВО
      why: "UA", why_en: "EN",
      targets: ["технічні терміни"],   // мовно-нейтральні
      links: [{ t: "назва", u: "https://..." }],
      note: "UA", note_en: "EN",       // опціонально
      steps: [{
        t: "UA назва кроку", t_en: "EN",
        b: "UA опис",        b_en: "EN",  // опціонально
        c: "код"                           // опціонально, мовно-нейтральний
      }],
      archive: {
        dir: "00-example/subdir/",
        files: ["file.tar.gz"],
        note: "UA", note_en: "EN"      // опціонально
      }
    }]
  }]
}]
```

## Структура REVENANT-DEPOT (офлайн архів)

```
REVENANT-DEPOT/          ← архів на носії
  00-os-iso/             ← Linux ISO образи
  00-bootstrap/tcc/      ← TCC компілятор для bootstrap
  00-android/termux/     ← Termux APK
  01-compilers/arm/      ← arm-none-eabi-gcc
  01-compilers/riscv/
  01-compilers/avr/
  02-libc/               ← newlib, musl, avr-libc, glibc
  03-startup/            ← CMSIS, STM32 LL, linker scripts
  04-flash-debug/        ← OpenOCD, avrdude, GDB
  05-emulation/          ← QEMU, Renode
  06-docs-isa/           ← PDF ISA мануали
  07-docs-refman/        ← PDF MCU reference manuals
  08-books/              ← книги PDF
  09-os-bootloaders/     ← Buildroot, U-Boot, Alpine
  10-tools/              ← cmake, ninja, make
  11-eda/                ← KiCad, LTspice
  12-networking/         ← lwIP, Wireshark
  13-math/               ← CLRS, DSP guide
  14-power/              ← solar, battery guides
  15-rtos/               ← FreeRTOS, Zephyr
  16-protocols/          ← UART, SPI, I2C reference code
```

## Поточні секції

Щоб побачити актуальний список: `grep -n 'id:\|group:' content.js`

## Важливі рішення прийняті раніше

- Архів на носії називається **REVENANT-DEPOT** (не COLDSTART-DEPOT, не VAULT)
- `microhes` (id: `r0-microhes`) — прихована підсторінка одного entry в R0 (POWER), **не** окрема секція
- x86 — не підтримуємо, тільки ARM
- Мова за замовчуванням — UA, є перемикач EN
- `priority` поле рендериться через `Lpri()` у renderer.js — content.js не чіпати

## Задачі (пріоритет)

### ЗАДАЧА 1 — BUILD секція
Наповнити `build-coming` реальним контентом: toolchains GCC ARM/RISC-V/AVR, cross-compilation, steps + archive.

### ЗАДАЧА 2 — DEPOT секція
Наповнити `depot-coming`: структура директорій, маніфести, чеклісти збирання носія, SHA256.

### ЗАДАЧА 3 — steps для STAGES entries
По черзі додавати `steps[]` і `archive` до entries без них у r0 та решти stages.

## Правила економії токенів

- Не читати `content.js` повністю — файл 580+ рядків. При відомій зміні — `str_replace` напряму
- Якщо треба знайти місце в файлі — `grep -n` по ключовому рядку
- Перед великими задачами (нова секція, масовий steps) — попереджати і пропонувати новий чат
- Якщо незрозуміло чи потрібно щось робити — завжди перепитувати
- Нагадувати про довжину контексту після великих правок

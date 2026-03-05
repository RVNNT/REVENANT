// =============================================================
// ДАНІ — редагуй тут: додавай секції, пункти, посилання
// =============================================================

const SECTIONS = [

  // ══════════════════════════════════════════════════════════════
  // 📖 GUIDE
  // ══════════════════════════════════════════════════════════════
  {
    group: "📖 STAGES",
    group_en: "📖 STAGES",
    items: [
      {
        id: "r0",
        emoji: "[R0]",
        color: "#3ddc84",
        title: "R0 — Clan",
        title_en: "R0 — Clan",
        subtitle: "50–200 осіб · 64 GB USB · T0 LoRa mesh · ~33–52 GB реального обʼєму",
        subtitle_en: "50–200 people · 64 GB USB · T0 LoRa mesh · ~33–52 GB real volume",
        analogy: "Як підняти distributed system з нуля: один pod (Termux), потім P2P мережа (LoRa + Reticulum), потім shared сервіси, і зрештою — фабрика нових нод. R0 — весь стек до першого стабільного клану.",
        analogy_en: "Like bootstrapping a distributed system from zero: one pod (Termux), then P2P network (LoRa + Reticulum), then shared services, finally a factory for new nodes. R0 is the full stack to the first stable clan.",
        entries: [
          {
            name: "POWER — Живлення та МікроГЕС",
            name_en: "POWER — Energy & Micro-HES",
            priority: "КРИТИЧНО",
            why: "Флешка без живлення — мертвий артефакт. Три джерела за пріоритетом: (1) МікроГЕС — якщо є потік води: генерує 24/7 без сонця і палива, 1–5 Вт, магніти з HDD + дріт з мотора. (2) Сонячна панель 10–20 Вт + MPPT контролер + LiFePO4 акумулятор. (3) Авто-акумулятор 12V як буферний резервуар. DEPOT містить: схеми MPPT/PWM контролерів, DC-DC buck/boost, AWG таблиці, BMS документацію, таблиці споживання.",
            why_en: "A flash drive without power is a dead artifact. Three sources by priority: (1) Micro-HES — if water flow exists: 24/7 generation, no sun or fuel, 1–5W, HDD magnets + motor wire. (2) Solar panel 10–20W + MPPT + LiFePO4. (3) Car battery 12V as buffer. DEPOT includes: MPPT/PWM schematics, DC-DC buck/boost, AWG tables, BMS docs, consumption tables.",
            targets: ["сонячна панель 10–20W", "MPPT контролер", "LiFePO4 акумулятор", "TP4056 заряд контролер", "авто-акумулятор 12V", "DC-DC buck/boost", "неодим магніти (HDD)", "емальований мідний дріт"],
            targets_en: ["solar panel 10–20W", "MPPT controller", "LiFePO4 battery", "TP4056 charge controller", "car battery 12V", "DC-DC buck/boost", "neodymium magnets (HDD)", "enameled copper wire"],
            note: "Є ріка/струмок → МікроГЕС (24/7, найнадійніше). Є сонце → сонячна панель. Ніяких умов → авто + 12V акумулятори.",
            note_en: "River/stream → Micro-HES (24/7, most reliable). Sunny → solar panel. Nothing → find cars and 12V batteries.",
            links: [
              { t: "📖 МікроГЕС — повний покроковий гайд", t_en: "📖 Micro-HES — full step-by-step guide", u: "#section/r0-microhes" }
            ]
          },
          {
            name: "T0 MESH — LoRa / Reticulum / Briar",
            name_en: "T0 MESH — LoRa / Reticulum / Briar",
            priority: "КРИТИЧНО",
            why: "Перша мережа без базових станцій і без інтернету. PHY: Sub-GHz LoRa + 2.4 GHz LoRa (~2.5 Mbps shared). Transport: Reticulum — store-and-forward поверх RF, як HTTP але для постапокаліпсису. App layer: Rnode + Sideband (текстові повідомлення), Nomad Network (форум), Matrix Synapse без федерації (груповий чат), Mumble (голос, Opus 6–12 kbps). Для Android: Briar (WiFi Direct + BT mesh, 100м), Jami (змішані Android+iOS через hotspot).",
            why_en: "First network without base stations or internet. PHY: Sub-GHz LoRa + 2.4 GHz LoRa (~2.5 Mbps shared). Transport: Reticulum — store-and-forward over RF, like HTTP for the post-apocalypse. App layer: Rnode + Sideband (messaging), Nomad Network (forum), Matrix Synapse no federation (group chat), Mumble (voice, Opus 6–12 kbps). Android: Briar (WiFi Direct + BT mesh, 100m), Jami (mixed Android+iOS via hotspot).",
            targets: ["LoRa модуль SX1276 / SX1262", "Rnode", "Reticulum", "Sideband APK", "Briar APK", "Jami APK", "Matrix Synapse", "Mumble"],
            targets_en: ["LoRa module SX1276 / SX1262", "Rnode", "Reticulum", "Sideband APK", "Briar APK", "Jami APK", "Matrix Synapse", "Mumble"],
            links: [
              { t: "Reticulum docs", u: "https://reticulum.network/manual/" },
              { t: "Sideband (F-Droid)", u: "https://f-droid.org/packages/io.unsigned.sideband/" },
              { t: "Briar (F-Droid)", u: "https://f-droid.org/packages/org.briarproject.briar.android/" }
            ]
          },
          {
            name: "MESH APPS — BitChat / Briar / Sideband",
            name_en: "MESH APPS — BitChat / Briar / Sideband",
            priority: "КРИТИЧНО",
            why: "Крос-платформний app-layer поверх BLE/WiFi Direct без інфраструктури. BitChat: BLE mesh для iOS/Android/Desktop, зашифровані повідомлення між пристроями без інтернету і без сервера, store-and-forward через інших учасників мережі. Briar: WiFi Direct + BT mesh (Android), P2P encrypted messaging + форуми + блоги, синхронізується через LoRa (Briar Mailbox). Sideband: GUI для Reticulum поверх LoRa/BT/WiFi, LXMF протокол, encrypted messages + файли.",
            why_en: "Cross-platform app layer over BLE/WiFi Direct without infrastructure. BitChat: BLE mesh for iOS/Android/Desktop, encrypted messaging between devices without internet or server, store-and-forward through other participants. Briar: WiFi Direct + BT mesh (Android), P2P encrypted messaging + forums + blogs, syncs over LoRa (Briar Mailbox). Sideband: GUI for Reticulum over LoRa/BT/WiFi, LXMF protocol, encrypted messages + files.",
            targets: ["BitChat (iOS/Android/Desktop)", "Briar APK", "Sideband APK", "BLE mesh", "WiFi Direct", "LXMF"],
            links: [
              { t: "BitChat GitHub", u: "https://github.com/permadao/bitchat" },
              { t: "Briar (F-Droid)", u: "https://f-droid.org/packages/org.briarproject.briar.android/" },
              { t: "Sideband (F-Droid)", u: "https://f-droid.org/packages/io.unsigned.sideband/" }
            ]
          },
          {
            name: "MOBILE BOOTSTRAP — Android та iOS",
            name_en: "MOBILE BOOTSTRAP — Android & iOS",
            priority: "КРИТИЧНО",
            why: "Телефон — перша нода RESPAWN. Android: F-Droid snapshot + APK mirror + Termux bootstrap (Termux:Boot + Termux:Widget, QEMU + KVM → Debian ARM64). Termux перетворює Android у повноцінний Linux-термінал без root — тут запускається gcc, python, git. iOS: Jailbreak archive + IPSW archive + sideload tools. Один телефон стає хотспотом — інші підключаються через Jami.",
            why_en: "Phone is the first RESPAWN node. Android: F-Droid snapshot + APK mirror + Termux bootstrap (Termux:Boot + Termux:Widget, QEMU + KVM → Debian ARM64). Termux turns Android into a full Linux terminal without root. iOS: jailbreak archive + IPSW archive + sideload tools. One phone becomes a hotspot — others connect via Jami.",
            targets: ["Termux APK", "F-Droid APK", "Termux:Boot APK", "QEMU ARM", "gcc", "python3", "git", "openssh"],
            links: [
              { t: "Termux (F-Droid)", u: "https://f-droid.org/packages/com.termux/" }
            ],
            archive: { dir: "00-android/termux/", files: ["termux-app_v0.118.apk"] }
          },
          {
            name: "DEV STACK — gcc / clang / cargo / Node / nasm",
            name_en: "DEV STACK — gcc / clang / cargo / Node / nasm",
            priority: "КРИТИЧНО",
            why: "Мови: C/C++, Rust, Node.js, Assembly. Toolchains: gcc/g++, clang, musl (статична збірка без glibc), cargo, Node LTS, nasm, arm-none-eabi (cross для STM32/Cortex-M), aarch64-linux-gnu. Build tools: make, cmake, ninja, gdb, pkg-config. ~4–6 GB. Аналог: npm install але для всього embedded стеку.",
            why_en: "Languages: C/C++, Rust, Node.js, Assembly. Toolchains: gcc/g++, clang, musl (static builds without glibc), cargo, Node LTS, nasm, arm-none-eabi (cross for STM32/Cortex-M), aarch64-linux-gnu. Build tools: make, cmake, ninja, gdb, pkg-config. ~4–6 GB.",
            targets: ["gcc / g++", "clang / clangd", "musl-libc", "cargo + rust", "Node.js LTS", "nasm", "arm-none-eabi-gcc", "aarch64-linux-gnu-gcc", "make / cmake / ninja", "gdb / pkg-config"],
            links: [
              { t: "ARM GNU Toolchain", u: "https://developer.arm.com/downloads/-/arm-gnu-toolchain-downloads" }
            ],
            archive: { dir: "01-compilers/", files: ["arm-gnu-toolchain-*.tar.xz", "rust-*.tar.gz", "node-lts-*.tar.xz"] }
          },
          {
            name: "DEV ENVIRONMENT — Zed + Neovim + LSP + Debug",
            name_en: "DEV ENVIRONMENT — Zed + Neovim + LSP + Debug",
            priority: "ВАЖЛИВО",
            why: "R0 — платформа розробки, а не лише архів. Кожен розробник клану має запустити проект за 30 секунд. Primary: Zed (офлайн release x86+ARM, local LSP cache, R0 profile). Fallback: Neovim (мінімальний config, nvim-lspconfig, treesitter, telescope, fugitive). LSP: clangd/bear (C/C++), rust-analyzer, typescript-language-server, bash-language-server. Debug: lldb, cgdb, rust-gdb, valgrind, strace, ltrace, core dump policy. Shell: zsh+bash, tmux, fzf, ripgrep, fd. Git: Forgejo (локальний git сервер), git-lfs, pre-commit. Containers: podman + buildah. ~5–8 GB.",
            why_en: "R0 is a dev platform, not just an archive. Every clan developer must start a project in 30 seconds. Primary: Zed (offline x86+ARM release, local LSP cache, R0 profile). Fallback: Neovim (minimal config, nvim-lspconfig, treesitter, telescope, fugitive). LSP: clangd/bear, rust-analyzer, tsserver, bash-language-server. Debug: lldb, cgdb, rust-gdb, valgrind, strace. Shell: zsh+bash, tmux, fzf, ripgrep, fd. Git: Forgejo (local git server), git-lfs. Containers: podman + buildah. ~5–8 GB.",
            targets: ["Zed editor", "Neovim + plugins", "clangd", "rust-analyzer", "tsserver", "lldb / valgrind", "tmux / fzf / ripgrep", "Forgejo git server", "podman + buildah"],
            links: [
              { t: "Zed releases", u: "https://github.com/zed-industries/zed/releases" },
              { t: "Forgejo releases", u: "https://codeberg.org/forgejo/forgejo/releases" }
            ]
          },
          {
            name: "OFFLINE LLM — Ollama 4B Q4",
            name_en: "OFFLINE LLM — Ollama 4B Q4",
            priority: "ВАЖЛИВО",
            why: "Офлайн AI-асистент без інтернету. Модель ~4B Q4 ≈ 3 GB — вміщається на будь-якому девайсі з 4+ GB RAM. Ollama — CPU inference runtime, embedding model, lightweight vector DB. Аналог: локальний npm-registry але для AI. ~4–5 GB.",
            why_en: "Offline AI assistant without internet. Model ~4B Q4 ≈ 3 GB — fits on any device with 4+ GB RAM. Ollama — CPU inference runtime, embedding model, lightweight vector DB. Like a local npm registry but for AI. ~4–5 GB.",
            targets: ["Ollama runtime", "Mistral 4B Q4 / Phi-3-mini", "embedding model", "llama.cpp (fallback)"],
            links: [
              { t: "Ollama releases", u: "https://github.com/ollama/ollama/releases" }
            ]
          },
          {
            name: "FABRICATION — FreeCAD + CAD/CAM",
            name_en: "FABRICATION — FreeCAD + CAD/CAM",
            priority: "ВАЖЛИВО",
            why: "R0 зберігає CAD/CAM для проєктування. LinuxCNC (ЧПУ-верстати) переноситься на R1 де є FabLab. FreeCAD: параметричне 3D-моделювання, G-code генерація і симуляція для 3D-друку, бібліотека деталей + material profiles, офлайн toolchain для 3D-принтерів. Metric Seed: STL-стандарти (лінійка, кронциркуль, еталонний куб 20мм), шаблони M2–M12 різьб, калібрувальні тести, міжклановий допуск ±0.2мм. ~3–5 GB.",
            why_en: "R0 keeps CAD/CAM for design. LinuxCNC (CNC machines) moves to R1 where FabLab exists. FreeCAD: parametric 3D modeling, G-code generation and simulation for 3D printing, parts library + material profiles. Metric Seed: STL standards (ruler, caliper, 20mm cube), M2–M12 thread templates, calibration tests, inter-clan tolerance ±0.2mm. ~3–5 GB.",
            targets: ["FreeCAD", "PrusaSlicer / Cura", "G-code post-processor", "OpenSCAD", "STL reference standards", "M2–M12 thread templates"],
            links: [
              { t: "FreeCAD releases", u: "https://github.com/FreeCAD/FreeCAD/releases" }
            ]
          },
          {
            name: "RADIO DOCTRINE — Anti-jam / EMCON / Fallback PHY",
            name_en: "RADIO DOCTRINE — Anti-jam / EMCON / Fallback PHY",
            priority: "ВАЖЛИВО",
            why: "T0 mesh у зоні конфлікту — перша ціль. LR2021 — залізо. Доктрина — виживання мережі. Frequency strategy: ISM band таблиці, frequency hopping policy (алгоритм, time slots, seed rotation), fallback bands (433/868/915 MHz, 2.4, 5.8 GHz). Anti-jam: checklist виявлення-перемикання-ізоляції, silent window protocol, EMCON mode (повне радіомовчання, процедура входу/виходу). Fallback PHY: FSK (CC1101/SX1276), WiFi ad-hoc (802.11 IBSS), Ethernet over twisted pair, courier protocol (фізична доставка як останній резерв). ~0.2–0.5 GB.",
            why_en: "T0 mesh in a conflict zone is the first target. LR2021 is hardware. Doctrine is network survival. Frequency strategy: ISM band tables, frequency hopping policy, fallback bands. Anti-jam: detection-switch-isolation checklist, silent window protocol, EMCON mode. Fallback PHY: FSK (CC1101/SX1276), WiFi ad-hoc (802.11 IBSS), Ethernet over twisted pair, courier protocol. ~0.2–0.5 GB.",
            targets: ["CC1101 / SX1276 конфіги", "802.11 IBSS схема", "EMCON процедура", "ISM band таблиці", "frequency hopping seed"],
            targets_en: ["CC1101 / SX1276 configs", "802.11 IBSS diagram", "EMCON procedure", "ISM band tables", "frequency hopping seed"],
            links: []
          },
          {
            name: "SECURITY + ECONOMY — Integrity / Ledger / Maps",
            name_en: "SECURITY + ECONOMY — Integrity / Ledger / Maps",
            priority: "ВАЖЛИВО",
            why: "Integrity & Security: SHA256/SHA512 маніфест всіх артефактів носія, GPG/age підписи, AIDE (file integrity baseline), DR Quick-Reference Card (що робити при захопленні вузла), key rotation checklist. Reproducible Build Seed: gcc bootstrap, musl libc, binutils, Linux kernel headers, lockfile архів, deterministic build scripts, reprotest/diffoscope. ~2–3 GB. Economy: офлайн-first mutual credit облік, локальна валюта / трудові одиниці, distributed ledger без блокчейн, CLI + мінімальний web UI, sync через T0 mesh. ~0.5 GB. Offline Maps: OSM region extract ~0.5–2 GB, routing engine, offline tiles.",
            why_en: "Integrity & Security: SHA256/SHA512 manifest of all medium artifacts, GPG/age signing, AIDE (file integrity baseline), DR Quick-Reference Card, key rotation checklist. Reproducible Build Seed: gcc bootstrap, musl libc, binutils, kernel headers, lockfile archive, deterministic scripts, reprotest/diffoscope. ~2–3 GB. Economy: offline-first mutual credit accounting, local currency/labor units, no blockchain. ~0.5 GB. Offline Maps: OSM region ~0.5–2 GB.",
            targets: ["SHA256/SHA512 маніфест", "GPG / age signing", "AIDE baseline", "reprotest / diffoscope", "mutual credit ledger", "OsmAnd / MAPS.ME offline"],
            targets_en: ["SHA256/SHA512 manifest", "GPG / age signing", "AIDE baseline", "reprotest / diffoscope", "mutual credit ledger", "OsmAnd / MAPS.ME offline"],
            links: [
              { t: "OsmAnd offline maps", u: "https://osmand.net/docs/versions/free-versions/" }
            ]
          }
        ]
      },

      // ── МікроГЕС (внутрішній розділ R0, не показується на головній) ───
      {
        hidden: true,
        id: "r0-microhes",
        emoji: "[GES]",
        color: "#00b4d8",
        title: "МікроГЕС — Електрика з Води",
        title_en: "Micro-HES — Electricity from Water",
        subtitle: "R0 POWER · 4–8 год збірки · 1–5 Вт · нуль фабричних деталей",
        subtitle_en: "R0 POWER · 4–8h build · 1–5W · zero factory parts",
        analogy: "Як зібрати Node.js сервер з підручних засобів: замість npm install — знаходиш компоненти по руїнах. Вода — трафік, магніти — CPU, котушки — RAM.",
        analogy_en: "Like building a Node.js server from scraps: instead of npm install — find components in ruins. Water is traffic, magnets are CPU, coils are RAM.",
        entries: [
          {
            name: "🤔 Чому МікроГЕС, а не щось інше?",
            name_en: "🤔 Why Micro-HES and not something else?",
            priority: "КРИТИЧНО",
            why: "Сонце заходить, вітер стихає, паливо закінчується — але річка тече постійно, 24/7, взимку і влітку. Це єдине джерело стабільного струму без фабричних модулів.\n\n✓ МікроГЕС: постійний струм вдень і вночі, всі матеріали з руїн, не потребує сонця чи вітру.\n✗ TEG (термогенератор): без фабричних модулів Пельтьє — менше 0.1 Вт.\n✗ Саморобна сонячна панель: неможливо без кремнію.\n~ Вітрогенератор: той самий принцип, але вітер непостійний.\n\n⚠️ Але: потрібна вода! МікроГЕС — найкращий вибір якщо є струмок, ріка або труба з тиском.",
            why_en: "Sun sets, wind dies, fuel runs out — but a river flows constantly, 24/7, winter and summer. The only source of stable current without factory modules.\n\n✓ Micro-HES: constant current day and night, all materials from ruins.\n✗ TEG: without Peltier modules — less than 0.1W.\n✗ DIY solar: impossible without silicon.\n~ Wind: same principle, but wind is inconsistent.\n\n⚠️ But: water required! Best choice if you have a stream, river or pressurized pipe.",
            targets: ["струмок або ріка", "або труба з тиском ≥0.5 м"],
            targets_en: ["stream or river", "or pipe with pressure ≥0.5 m"]
          },
          {
            name: "🔬 Як це працює — фізика за 3 речення",
            name_en: "🔬 How it works — physics in 3 sentences",
            priority: "КРИТИЧНО",
            why: "Якщо рухати магніт поруч з котушкою дроту — в котушці з'являється струм (Закон Фарадея). Чим швидше рухається магніт і чим більше витків — тим більше струму. Генератор дає змінний струм (AC) → 4 діоди (випрямний міст) → постійний (DC) для акумулятора і телефону.\n\nАналогія: м'ясорубка навпаки — вода крутить лопаті → лопаті крутять магніти → магніти поруч з котушками виробляють струм.",
            why_en: "Moving a magnet near a coil generates current (Faraday's Law). Faster magnet + more turns = more current. Generator produces AC → 4 diodes (bridge rectifier) → DC for battery and phone.\n\nAnalogy: meat grinder in reverse — water spins blades → blades spin magnets → magnets near coils produce current.",
            targets: ["закон Фарадея", "AC → випрямний міст → DC"],
            targets_en: ["Faraday's Law", "AC → bridge rectifier → DC"]
          },
          {
            name: "🔍 Що шукати і де — карта руїн",
            name_en: "🔍 What to find and where — ruins map",
            priority: "КРИТИЧНО",
            why: "Пріоритет пошуку: комп'ютерні офіси (HDD = магніти), майстерні і гаражі (мотори = дріт), квартири (кухня + техніка).",
            why_en: "Search priority: computer offices (HDD = magnets), workshops (motors = wire), apartments (kitchen + appliances).",
            targets: [
              "🧲 Магніти (6–12): HDD жорсткі диски, колонки/сабвуфери, двигуни мікрохвильовки",
              "🔄 Емальований мідний дріт (100–200м): мотори пральних машин, трансформатори БЖ",
              "🌀 Турбіна: пластикові ложки 8–12шт, CD-диск, стрижень парасольки (вал)",
              "🔌 Діоди: будь-яка стара зарядка (випрямний міст всередині)"
            ],
            targets_en: [
              "🧲 Magnets (6–12): HDD hard drives, speakers/subwoofers, microwave motors",
              "🔄 Enameled copper wire (100–200m): washing machine motors, PSU transformers",
              "🌀 Turbine: plastic spoons 8–12pcs, CD disc, umbrella shaft (axle)",
              "🔌 Diodes: any old charger (bridge rectifier inside)"
            ],
            note: "HDD-магніти крихкі! Підніми кінчиком ножа. Не клади два поруч — б'ють один одного і ламаються.",
            note_en: "HDD magnets are brittle! Lift with a knife tip. Don't place two together — they slam and shatter."
          },
          {
            name: "① Крок 1 — Турбіна",
            name_en: "① Step 1 — Turbine",
            priority: "КРИТИЧНО",
            why: "Колесо яке вода буде крутити. Час: 30–60 хв.",
            why_en: "The wheel that water spins. Time: 30–60 min.",
            targets: ["CD/DVD-диск або фанера ~12–15 см", "8–12 пластикових ложок", "вал ~30 см", "гарячий клей + скотч"],
            targets_en: ["CD/DVD disc or plywood ~12–15 cm", "8–12 plastic spoons", "axle ~30 cm", "hot glue + tape"],
            steps: [
              { t: "Підготуй диск і лопаті", t_en: "Prepare disk and blades", c: "Пробий отвір у центрі CD ТОЧНО по діаметру валу.\nПідготуй 8–12 однакових ложок." },
              { t: "Приклей лопаті та тест", t_en: "Glue blades and test", c: "Рівномірно по краю диска, опуклою стороною НАЗОВНІ, кут ~45°.\nТЕСТ: облий водою — крутиться від легкого потоку? ✅" }
            ]
          },
          {
            name: "② Крок 2 — Ротор з магнітами",
            name_en: "② Step 2 — Rotor with magnets",
            priority: "КРИТИЧНО",
            why: "⚠️ БЕЗПЕКА: неодимові магніти дуже потужні. Тримай на відстані 10+ см один від одного поки не кріпиш. Час: 30–60 хв.",
            why_en: "⚠️ SAFETY: neodymium magnets are very powerful. Keep 10+ cm apart until mounting. Time: 30–60 min.",
            steps: [
              { t: "Визнач полюси (ОБОВ'ЯЗКОВО)", t_en: "Identify poles (MANDATORY)", c: "З компасом: піднеси магніт — бік що притягується = N → познач маркером.\nБез компасу: підвісь голку на нитці — вкаже північ." },
              { t: "Розмісти магніти N-S-N-S по колу", t_en: "Place magnets N-S-N-S around the circle", c: "Приклей, тримай 30 сек, одразу скотч поверх.\n⚠️ Сушка мін. 2 год (звичайний клей) або 30 хв (епоксидка)." }
            ]
          },
          {
            name: "③ Крок 3 — Статор (котушки)",
            name_en: "③ Step 3 — Stator (coils)",
            priority: "КРИТИЧНО",
            why: "Нерухома плата з котушками впритул до ротора, зазор 1–3 мм. Час: 1–2 год.",
            why_en: "Fixed board with coils next to rotor, gap 1–3 mm. Time: 1–2 hours.",
            steps: [
              { t: "Намотай 4–8 котушок", t_en: "Wind 4–8 coils", c: "Шаблон ~4×6 см, 200–400 витків, залиш 15 см кінців.\nТонший дріт (0.3–0.5 мм) = вища напруга." },
              { t: "Зачисти кінці і з'єднай послідовно", t_en: "Strip ends and connect in series", c: "Шкіркою або полум'ям до мідного блиску.\nКінець 1-ї → Початок 2-ї → ... Залиш 2 вільних кінці — вихід.\n⚠️ Зазор ротор-статор = 1–3 мм (оптимум 1.5–2 мм)." }
            ]
          },
          {
            name: "④⑤ Кроки 4–5 — Рама, збірка, запуск",
            name_en: "④⑤ Steps 4–5 — Frame, assembly, launch",
            priority: "КРИТИЧНО",
            why: "Рама тримає вал (турбіна + ротор обертаються) і статор (нерухомий). Примітивний підшипник: скотч + рослинна олія. Порядок на валу: [Опора 1] → [Турбіна] → [Ротор] → [Опора 2].",
            why_en: "Frame holds shaft (turbine + rotor rotate) and stator (fixed). Primitive bearing: tape + vegetable oil. Order on shaft: [Support 1] → [Turbine] → [Rotor] → [Support 2].",
            steps: [
              { t: "Збери і встанови", t_en: "Assemble and install", c: "Жолоб для води: кут подачі ~30°, вода б'є в зовнішній край лопатей.\nПерепад 0.5 м → ~1 Вт, перепад 2 м → ~3–5 Вт." },
              { t: "Перший запуск", t_en: "First launch", c: "Підключи LED → запусти воду.\nLED світиться? ✅\nНе світиться? → поміняй дроти місцями (полярність).\n\nМікроГЕС → випрямний міст → акумулятор 12V → USB → телефон\nТелефон 3000mAh: при 2 Вт → 7–8 год / при 5 Вт → 3–4 год." }
            ]
          },
          {
            name: "🩺 Проблеми та рішення",
            name_en: "🩺 Problems and solutions",
            priority: "ВАЖЛИВО",
            why: "LED не світиться → зачисти кінці шкіркою до блиску.\nLED мерехтить → збільш потік, зменш зазор до 1 мм.\nТурбіна не крутиться → змасти вал маслом.\nКрутиться але струму нема → перевір чергування магнітів N-S-N-S.\nРотор чіпляє статор → збільш зазор.\nСильна вібрація → перевір рівність магнітів, зміцни раму.\nГріються котушки → коротке замикання, перевір з'єднання.",
            why_en: "LED not lighting → strip wire ends with sandpaper.\nLED flickers → increase flow, reduce gap to 1mm.\nTurbine not spinning → oil the shaft.\nSpins but no current → check N-S-N-S magnet alternation.\nRotor catches stator → increase gap.\nStrong vibration → check magnet alignment, anchor frame.\nCoils hot → short circuit, check connections.",
            targets: []
          },
          {
            name: "🚀 Рівні потужності + чекліст",
            name_en: "🚀 Power levels + checklist",
            priority: "БАЖАНО",
            why: "Рівень 1 (~1 Вт): 4 магніти, 4 котушки × 200 витків → LED або телефон за ніч.\nРівень 2 (~2–3 Вт): 8 магнітів, 6–8 котушок → кілька LED або радіо.\nРівень 3 (~5 Вт): 12 магнітів, 8–12 котушок, перепад 2+ м → зарядка 12V за день.\nРівень 4 (10+ Вт): два паралельних генератори → живлення малого табору.",
            why_en: "Level 1 (~1W): 4 magnets, 4 coils × 200 turns → LED or phone overnight.\nLevel 2 (~2–3W): 8 magnets, 6–8 coils → LEDs or radio.\nLevel 3 (~5W): 12 magnets, perimeter 2+ m → 12V charge per day.\nLevel 4 (10+W): two parallel generators → small camp power.",
            note: "Чекліст: вал крутиться вільно · ротор не торкається статора · магніти в скотчі · зазор 1–3 мм · LED тест пройдено · котушки захищені від вологи · потік на зовнішній край лопатей · генератор НАД водою.",
            note_en: "Checklist: shaft spins freely · rotor clears stator · magnets taped · gap 1–3 mm · LED test passed · coils moisture-protected · flow hits outer blade edge · generator ABOVE water.",
            targets: []
          }
        ]
      },

      // ── R1 — HEX ──────────────────────────────────────────────
      {
        id: "r1",
        emoji: "[R1]",
        color: "#4f9cf9",
        title: "R1 — Hex",
        title_en: "R1 — Hex",
        subtitle: "до 25,000 осіб · 1 TB SSD · T1 fiber backbone · ~321–493 GB реального обʼєму",
        subtitle_en: "up to 25,000 people · 1 TB SSD · T1 fiber backbone · ~321–493 GB real volume",
        analogy: "Як перейти від одного мікросервісу до повноцінного production кластеру: з'являється Proxmox, PostgreSQL HA, PKI, SCADA. Hex — мінімальна цивілізаційна одиниця з повним цифровим стеком.",
        analogy_en: "Like going from a single microservice to a full production cluster: Proxmox, PostgreSQL HA, PKI, SCADA appear. Hex is the minimum civilizational unit with a full digital stack.",
        entries: [
          {
            name: "GOVERNANCE — Keycloak + Odoo + Matrix + E-doc",
            name_en: "GOVERNANCE — Keycloak + Odoo + Matrix + E-doc",
            priority: "КРИТИЧНО",
            why: "Без governance R1 — просто датацентр. Identity/Access: Keycloak — SSO, RBAC, OIDC, mTLS інтеграція, PKI. Communication: Matrix Synapse — внутрішня федерація між Hex-вузлами, E2EE, архівування. ERP/Governance: Odoo — облік, ресурси, логістика, виробництво, HR. E-Document Layer: e-doc сервер, цифровий підпис, архів, версіонування, журнал аудиту. Keycloak ~2–4 GB, Odoo+deps ~5–10 GB, Matrix ~3–6 GB, E-doc ~2–5 GB. Разом ~12–25 GB.",
            why_en: "Without governance R1 is just a datacenter. Identity: Keycloak — SSO, RBAC, OIDC, mTLS, PKI. Communication: Matrix Synapse — inter-Hex federation, E2EE, archiving. ERP: Odoo — accounting, resources, logistics, manufacturing, HR. E-doc: digital signing, archive, audit log. Keycloak ~2–4 GB, Odoo ~5–10 GB, Matrix ~3–6 GB, E-doc ~2–5 GB. Total ~12–25 GB.",
            targets: ["Keycloak", "Odoo + deps", "Matrix Synapse", "E-doc server", "digital signing stack"],
            links: [
              { t: "Keycloak releases", u: "https://github.com/keycloak/keycloak/releases" }
            ]
          },
          {
            name: "INDUSTRIAL RUNTIME — MQTT + OPC UA + SCADA",
            name_en: "INDUSTRIAL RUNTIME — MQTT + OPC UA + SCADA",
            priority: "КРИТИЧНО",
            why: "Embedded toolchain без runtime інтеграції = ізольовані плати. Eclipse Mosquitto (MQTT): TLS+mTLS, PKI інтеграція. OPC UA: server runtime, gateway до MQTT, PKI trust chain. SCADA — ScadaBR/OpenSCADA: telemetry, alarm engine, historian, dashboard. Historian: PostgreSQL HA, time-series schema, архів ≥1 рік. MQTT+OPC+SCADA+deps ~5–15 GB.",
            why_en: "Embedded toolchain without runtime integration = isolated boards. Eclipse Mosquitto (MQTT): TLS+mTLS, PKI. OPC UA: server runtime, MQTT gateway, PKI trust chain. SCADA — ScadaBR/OpenSCADA: telemetry, alarm engine, historian, dashboard. Historian: PostgreSQL HA, time-series, ≥1 year archive. ~5–15 GB.",
            targets: ["Eclipse Mosquitto", "OPC UA server", "ScadaBR / OpenSCADA", "PostgreSQL HA time-series"],
            links: [
              { t: "Eclipse Mosquitto", u: "https://mosquitto.org/download/" }
            ]
          },
          {
            name: "CORE STACK — Proxmox + PostgreSQL + Redis + Vault",
            name_en: "CORE STACK — Proxmox + PostgreSQL + Redis + Vault",
            priority: "КРИТИЧНО",
            why: "Compute: Proxmox cluster, container-based services — вся інфраструктура Hex в контейнерах. Data: PostgreSQL HA, Redis, object storage. Infra: Prometheus+Grafana (моніторинг), NetBox (мережевий CMDB), CoreDNS (офлайн DNS), Vault (секрети і PKI).",
            why_en: "Compute: Proxmox cluster, container-based services — all Hex infra in containers. Data: PostgreSQL HA, Redis, object storage. Infra: Prometheus+Grafana (monitoring), NetBox (network CMDB), CoreDNS (offline DNS), Vault (secrets and PKI).",
            targets: ["Proxmox VE", "PostgreSQL HA", "Redis", "HashiCorp Vault", "Prometheus + Grafana", "NetBox", "CoreDNS"],
            links: [
              { t: "Proxmox ISO", u: "https://www.proxmox.com/en/downloads" }
            ]
          },
          {
            name: "PACKAGE MIRRORS — Debian + Container + PyPI + npm",
            name_en: "PACKAGE MIRRORS — Debian + Container + PyPI + npm",
            priority: "КРИТИЧНО",
            why: "Офлайн дзеркала пакетів — основа R1. Debian Mirror (amd64+arm64 minimal): 80–120 GB. Container Registry: 20–40 GB. PyPI Core: 20–40 GB. npm Minimal: 5–10 GB. Разом ~125–210 GB. Без цього кожна установка вимагає інтернету.",
            why_en: "Offline package mirrors are the foundation of R1. Debian Mirror (amd64+arm64 minimal): 80–120 GB. Container Registry: 20–40 GB. PyPI Core: 20–40 GB. npm Minimal: 5–10 GB. Total ~125–210 GB. Without this, every install requires internet.",
            targets: ["apt-mirror / debmirror", "Docker/OCI registry", "devpi (PyPI mirror)", "verdaccio (npm mirror)"],
            links: []
          },
          {
            name: "EMBEDDED + ELECTRONICS — STM32 / ESP32 / KiCad",
            name_en: "EMBEDDED + ELECTRONICS — STM32 / ESP32 / KiCad",
            priority: "ВАЖЛИВО",
            why: "Embedded Stack: STM32 (toolchain, OpenOCD, HAL), ESP32 (ESP-IDF, flashing tools), Arduino (IDE, AVR toolchain), RP2040 (Pico SDK), Raspberry Pi (OS images, GPIO libs, cross-tools). ~10–16 GB. Electronics (KiCad): FreeCAD (R0) = механіка, KiCad (R1) = електроніка. KiCad EDA: схемний редактор, PCB layout, 3D preview. Стандартні бібліотеки символів + footprints ~2–3 GB. Datasheet archive: MCU, силова електроніка, конектори ~2–5 GB. BOM tools, Gerber viewer. ~7–14 GB.",
            why_en: "Embedded Stack: STM32 (toolchain, OpenOCD, HAL), ESP32 (ESP-IDF, flashing tools), Arduino (IDE, AVR toolchain), RP2040 (Pico SDK), RPi (OS images). ~10–16 GB. Electronics (KiCad): FreeCAD (R0) = mechanics, KiCad (R1) = electronics. KiCad EDA: schematic, PCB layout, 3D preview. Standard symbol+footprint libs ~2–3 GB. Datasheet archive ~2–5 GB. ~7–14 GB.",
            targets: ["STM32 HAL + OpenOCD", "ESP-IDF", "Arduino IDE + AVR", "RP2040 Pico SDK", "KiCad EDA", "KiCad libraries", "datasheet archive"],
            links: [
              { t: "KiCad EDA", u: "https://www.kicad.org/download/" }
            ]
          },
          {
            name: "FABRICATION R1 — LinuxCNC + Scavenging Registry",
            name_en: "FABRICATION R1 — LinuxCNC + Scavenging Registry",
            priority: "ВАЖЛИВО",
            why: "LinuxCNC: фрезерний верстат, токарний, лазерний — все ЧПУ обладнання FabLab. HAL конфіги для поширених платформ, G-code post-processors, інтеграція з FreeCAD CAM (R0 проекти → R1 верстати). ~1–2 GB. Scavenging Registry: R1 будується не з нуля — з того що є. Donor Hardware Catalog: авто-сенсори (ABS, MAP, стартерні мотори), офісна техніка (принтери = NEMA17, банкомати), побутова техніка (пральні машини = інверторні мотори). SQLite DB + PDF довідник. Розширений datasheet archive: MOSFET (IRF/STP), PWM контролери (UC3842/TL494/SG3525), логіка 74HC/HCT, op-amps, CAN/RS485. ~5.5–6 GB.",
            why_en: "LinuxCNC: milling, lathe, laser — all FabLab CNC equipment. HAL configs for common platforms, G-code post-processors, FreeCAD CAM integration. ~1–2 GB. Scavenging Registry: R1 is built from what exists. Donor Hardware Catalog: automotive sensors, office equipment (printers = NEMA17), appliances (washing machines = inverter motors). SQLite DB + PDF. Extended datasheet archive: MOSFET, PWM controllers, 74HC/HCT logic, op-amps, CAN/RS485. ~5.5–6 GB.",
            targets: ["LinuxCNC", "HAL configs", "Scavenging SQLite DB", "MOSFET datasheets", "PWM controller docs"],
            links: [
              { t: "LinuxCNC", u: "https://linuxcnc.org/downloads/" }
            ]
          },
          {
            name: "MEDICAL + AGRICULTURE + EDUCATION",
            name_en: "MEDICAL + AGRICULTURE + EDUCATION",
            priority: "ВАЖЛИВО",
            why: "Medical (OpenEMR + DICOM): DICOM потребує обладнання рівня Hex (рентген, УЗД). Повна EMR система, PACS-сумісна файлова система, Keycloak RBAC для медперсоналу. ~2–3 GB. Agriculture (FarmOS): precision agriculture з сенсорами і REST API. Планування посівів, yield tracking, T1 MQTT → OPC UA інтеграція. ~2–5 GB. Education (Moodle LMS): повноцінна LMS система, offline PWA mode, SCORM сумісність, тестування і сертифікація. Потребує школи і викладачів — рівень R1 інституції. ~2–4 GB.",
            why_en: "Medical (OpenEMR + DICOM): DICOM requires Hex-level hardware (X-ray, ultrasound). Full EMR, PACS-compatible filesystem, Keycloak RBAC for medical staff. ~2–3 GB. Agriculture (FarmOS): precision farming with sensors and REST API. Crop planning, T1 MQTT → OPC UA integration. ~2–5 GB. Education (Moodle LMS): full LMS, offline PWA, SCORM, testing and certification. Requires school and teachers — R1 institution level. ~2–4 GB.",
            targets: ["OpenEMR", "DICOM / PACS", "FarmOS", "Moodle LMS", "SCORM content"],
            links: []
          },
          {
            name: "KNOWLEDGE ARCHIVE — Wikipedia / Kiwix",
            name_en: "KNOWLEDGE ARCHIVE — Wikipedia / Kiwix",
            priority: "ВАЖЛИВО",
            why: "Повний офлайн архів людських знань. Kiwix server — HTTP-сервер для всієї T1 мережі. ZIM формат, офлайн пошук. Wikipedia повний дамп ~60 GB. Опційно: Wiktionary, WikiBooks, WikiSource, StackOverflow. Аналог: npm registry але для людства.",
            why_en: "Full offline archive of human knowledge. Kiwix server — HTTP server for the entire T1 network. ZIM format, offline search. Full Wikipedia dump ~60 GB. Optional: Wiktionary, WikiBooks, WikiSource, StackOverflow.",
            targets: ["Kiwix server", "Wikipedia ZIM dump ~60 GB", "Wiktionary ZIM", "StackOverflow ZIM"],
            links: [
              { t: "Kiwix Library", u: "https://library.kiwix.org/" }
            ]
          },
          {
            name: "SECURITY + REPRODUCIBILITY + PKI",
            name_en: "SECURITY + REPRODUCIBILITY + PKI",
            priority: "ВАЖЛИВО",
            why: "Security Hardening: Wazuh (HIDS агент+менеджер, MITRE ATT&CK, file integrity, log correlation, active response) ~3–5 GB, AIDE baseline ~0.5 GB, DR Playbook (повна процедура відновлення вузла, checklist компрометації, RTO/RPO) ~0.3 GB, Key Rotation scripts (Vault+PKI) ~0.5 GB. Checksum Governance: master manifest SHA256+SHA512, GPG+age підписи ≥2 незалежних ключів (M-of-N), Merkle tree для часткової верифікації, sigstore/cosign для контейнерів. ~0.2–0.5 GB. Full PKI: offline Root CA, Intermediate CA, CRL+OCSP, internal ACME, mTLS для всіх сервісів. Reproducible Build Pipeline: GCC bootstrap 3 версії, glibc+musl, binutils, Linux kernel LTS, OpenSSL, Python, Rust, Node.js source. ~8–14 GB.",
            why_en: "Security Hardening: Wazuh (HIDS, MITRE ATT&CK, file integrity, log correlation) ~3–5 GB, AIDE baseline, DR Playbook (full node recovery, compromise checklist, RTO/RPO), key rotation scripts (Vault+PKI). Checksum Governance: SHA256+SHA512 manifest, GPG+age M-of-N signing, Merkle tree, sigstore/cosign. ~0.2–0.5 GB. Full PKI: offline Root CA, Intermediate CA, CRL+OCSP, mTLS everywhere. Reproducible Build Pipeline: GCC bootstrap 3 versions, glibc+musl, kernel LTS, Rust, Node.js source. ~8–14 GB.",
            targets: ["Wazuh HIDS", "AIDE", "DR Playbook", "Vault + PKI", "cosign / sigstore", "offline Root CA", "reprotest / diffoscope"],
            links: []
          }
        ]
      },

      // ── R2a — POLIS ────────────────────────────────────────────
      {
        id: "r2a",
        emoji: "[R2a]",
        color: "#f97316",
        title: "R2a — Поліс",
        title_en: "R2a — Polis",
        subtitle: "до 500,000 осіб · Multi-TB storage · T2a BGP fiber · повна е-держава",
        subtitle_en: "up to 500,000 people · Multi-TB storage · T2a BGP fiber · full e-government",
        analogy: "Як масштабувати Node.js сервіс до регіонального рівня: з'являється PostgreSQL sharding, Kafka backbone, multi-DC.",
        analogy_en: "Like scaling a Node.js service to regional level: PostgreSQL sharding, Kafka backbone, multi-DC appear.",
        entries: [
          {
            name: "T2a Network — Fiber між Hex-вузлами", name_en: "T2a Network — Fiber between Hex nodes",
            priority: "КРИТИЧНО",
            why: "T2a: fiber між Hex-вузлами, BGP, EVPN/MPLS, ≥10 Mbps/абонент. Об'єднує декілька T1 мереж.",
            why_en: "T2a: fiber between Hex nodes, BGP, EVPN/MPLS, ≥10 Mbps/subscriber. Unifies multiple T1 networks.",
            targets: ["BGP routing", "EVPN / MPLS", "fiber inter-connect"], links: []
          },
          {
            name: "Multi-DC Infrastructure", name_en: "Multi-DC Infrastructure",
            priority: "КРИТИЧНО",
            why: "PostgreSQL sharding (Citus), Kafka backbone між Hex-вузлами, Elastic cluster для full-text search і log aggregation.",
            why_en: "PostgreSQL sharding (Citus), Kafka backbone between Hex nodes, Elastic cluster for full-text search and log aggregation.",
            targets: ["PostgreSQL Citus", "Apache Kafka", "Elasticsearch cluster", "Ceph storage"], links: []
          },
          {
            name: "Full e-Government", name_en: "Full e-Government",
            priority: "ВАЖЛИВО",
            why: "Повна е-держава: податкова система, земельний реєстр, судова система. Redundant SCADA + Air-gapped safety layer. SOC stack.",
            why_en: "Full e-government: tax system, land registry, court system. Redundant SCADA + Air-gapped safety layer. SOC stack.",
            targets: ["e-Tax", "Land registry", "Court system", "SOC stack", "Air-gapped OT"], links: []
          },
          {
            name: "Nix/Guix Reproducibility (~40–80 GB)", name_en: "Nix/Guix Reproducibility (~40–80 GB)",
            priority: "БАЖАНО",
            why: "Full Nix/Guix модель відтворюваності — R2a roadmap. Full PKI + Hardware root of trust. Offline cold backup repos.",
            why_en: "Full Nix/Guix reproducibility model — R2a roadmap. Full PKI + Hardware root of trust. Offline cold backup repos.",
            targets: ["NixOS / Guix", "hardware root of trust"], links: []
          }
        ]
      },

      // ── R2b — MEGALOPOLIS ──────────────────────────────────────
      {
        id: "r2b",
        emoji: "[R2b]",
        color: "#a855f7",
        title: "R2b — Мегаполіс",
        title_en: "R2b — Megalopolis",
        subtitle: "до 1.2M осіб · Multi-DC · T2b metro optical rings · державний масштаб",
        subtitle_en: "up to 1.2M people · Multi-DC · T2b metro optical rings · state scale",
        analogy: "Як перейти від регіонального до державного масштабу: active-active DC, стратегічна PKI, наукові кластери.",
        analogy_en: "Like going from regional to state scale: active-active DC, strategic PKI, scientific clusters.",
        entries: [
          {
            name: "T2b Network — Metro optical rings + 5G/6G", name_en: "T2b Network — Metro optical rings + 5G/6G",
            priority: "КРИТИЧНО",
            why: "T2b: metro optical rings, 5G/6G, об'єднує декілька T2a мереж. Deep redundancy, active-active DC, distributed Kafka backbone.",
            why_en: "T2b: metro optical rings, 5G/6G, unifies multiple T2a networks. Deep redundancy, active-active DC, distributed Kafka.",
            targets: ["metro optical rings", "5G / 6G", "active-active DC"], links: []
          },
          {
            name: "Scientific Clusters + Strategic PKI", name_en: "Scientific Clusters + Strategic PKI",
            priority: "ВАЖЛИВО",
            why: "Наукові кластери для R&D, strategic-scale PKI (root of trust для всіх нижніх рівнів). R2b автономний без зовнішньої мережі.",
            why_en: "Scientific clusters for R&D, strategic-scale PKI (root of trust for all lower levels). R2b autonomous without external networks.",
            targets: ["HPC cluster", "strategic root CA", "distributed Kafka state-scale"], links: []
          }
        ]
      },

      // ── R3 — COVENANT ─────────────────────────────────────────
      {
        id: "r3",
        emoji: "[R3]",
        color: "#06b6d4",
        title: "R3 — Ковенант",
        title_en: "R3 — Covenant",
        subtitle: "2+ Полісів · федеративно-республіканський договір · T3 · цивілізаційна стійкість",
        subtitle_en: "2+ Poleis · federative-republican contract · T3 · civilizational resilience",
        analogy: "Як побудувати федерацію незалежних держав з єдиним технологічним стеком і розподіленим суверенітетом.",
        analogy_en: "Like building a federation of independent states with a shared technology stack and distributed sovereignty.",
        entries: [
          {
            name: "T3 Network — Inter-Polis Backbone", name_en: "T3 Network — Inter-Polis Backbone",
            priority: "КРИТИЧНО",
            why: "T3: міжполісна магістраль, об'єднує декілька T2a/T2b мереж. Забезпечує зв'язок між незалежними Полісами.",
            why_en: "T3: inter-Polis backbone, unifies multiple T2a/T2b networks. Provides connectivity between independent Poleis.",
            targets: ["inter-Polis BGP", "federated PKI", "cross-Polis WireGuard"], links: []
          },
          {
            name: "Distributed Sovereignty Framework", name_en: "Distributed Sovereignty Framework",
            priority: "КРИТИЧНО",
            why: "Кожен Поліс зберігає внутрішню автономію. Ковенант існує для запобігання системному колапсу: якщо один Поліс виходить з ладу — мережа продовжує роботу через інші.",
            why_en: "Each Polis preserves internal autonomy. The Covenant exists to prevent systemic collapse: if one Polis fails, the network persists through the others.",
            targets: ["federated identity", "contractual framework", "cross-Polis DR"], links: []
          }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // 🔨 BUILD
  // ══════════════════════════════════════════════════════════════
    {
    group: "🔨 BUILD — ЗБІРКА TOOLCHAIN",
    group_en: "🔨 BUILD — TOOLCHAIN ASSEMBLY",
    items: [
      {
        id: "build-coming",
        emoji: "[BUILD]",
        color: "#f97316",
        title: "BUILD — Незабаром",
        title_en: "BUILD — Coming Soon",
        subtitle: "Компілятори, toolchains, cross-compilation для всіх платформ.",
        subtitle_en: "Compilers, toolchains, cross-compilation for all platforms.",
        analogy: "Як npm install але для embedded — встановлюємо весь стек офлайн з DEPOT.",
        analogy_en: "Like npm install but for embedded — installing the full stack offline from DEPOT.",
        entries: [
          {
            name: "Розділ в розробці", name_en: "Section in development",
            priority: "ДОДАТКОВО",
            why: "Повні гайди по збірці toolchain для ARM, RISC-V, AVR — з DEPOT, без інтернету.",
            why_en: "Full toolchain build guides for ARM, RISC-V, AVR — from DEPOT, no internet.",
            targets: ["gcc-arm-none-eabi", "clang", "cargo", "nasm"], links: []
          }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // 📦 DEPOT
  // ══════════════════════════════════════════════════════════════
    {
    group: "📦 DEPOT — СТРУКТУРА НОСІЯ",
    group_en: "📦 DEPOT — BOOT MEDIUM STRUCTURE",
    items: [
      {
        id: "depot-coming",
        emoji: "[DEPOT]",
        color: "#4f9cf9",
        title: "DEPOT — Незабаром",
        title_en: "DEPOT — Coming Soon",
        subtitle: "Структура REVENANT-DEPOT: що де лежить, як зібрати флешку з нуля.",
        subtitle_en: "REVENANT-DEPOT structure: what goes where, how to build the boot drive from scratch.",
        analogy: "Як package.json але для USB-флешки — повний маніфест того що має бути на носії.",
        analogy_en: "Like package.json but for a USB drive — full manifest of what should be on the boot medium.",
        entries: [
          {
            name: "Розділ в розробці", name_en: "Section in development",
            priority: "ДОДАТКОВО",
            why: "R0 структура директорій, скрипти збирання депо, чеклісти цілісності, SHA256 маніфести.",
            why_en: "R0 directory structure, depot assembly scripts, integrity checklists, SHA256 manifests.",
            targets: ["64GB USB", "128GB USB (recommended)", "SHA256 manifest", "rsync scripts"], links: []
          }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // 🗺️ ROADMAP
  // ══════════════════════════════════════════════════════════════
    {
    group: "🗺️ ROADMAP — ПЛАН РОЗВИТКУ",
    group_en: "🗺️ ROADMAP — DEVELOPMENT PLAN",
    items: [
      {
        id: "roadmap-main",
        emoji: "[ROAD]",
        color: "#a855f7",
        title: "ROADMAP",
        title_en: "ROADMAP",
        subtitle: "R0 Clan — в розробці. Всі наступні фази — заплановані.",
        subtitle_en: "R0 Clan — in development. All next phases — planned.",
        analogy: "Кожен Rn — major версія цивілізаційної інфраструктури. Ми на R0 — перший реліз.",
        analogy_en: "Each Rn is a major version of civilization infrastructure. We're at R0 — first release.",
        entries: [
          {
            name: "R0 — Clan (в розробці)", name_en: "R0 — Clan (in development)",
            priority: "КРИТИЧНО",
            why: "R0: Bootstrap від Android/ноутбука до повноцінного dev середовища для 50-200 людей. 64-128 GB USB. Dev stack, Offline LLM, T0 mesh (LoRa + Reticulum), BitChat/Briar, FreeCAD, Economy ledger.",
            why_en: "R0: Bootstrap from Android/laptop to full dev environment for 50-200 people. 64-128 GB USB. Dev stack, Offline LLM, T0 mesh (LoRa + Reticulum), BitChat/Briar, FreeCAD, Economy ledger.",
            targets: ["64GB USB", "Termux + gcc", "BitChat / Briar mesh", "Offline LLM ~4B Q4", "FreeCAD CAD/CAM"],
            links: [{ t: "REVENANT GitHub", u: "https://github.com/RVNNT" }]
          },
          {
            name: "R1 — Hex (в розробці)", name_en: "R1 — Hex (in development)",
            priority: "ВАЖЛИВО",
            why: "R1: Hex — до 25,000 людей, 1 TB SSD. Governance stack (Keycloak, Odoo, Matrix), Industrial runtime (MQTT, OPC UA, SCADA), Electronics (KiCad), Medical (OpenEMR), FarmOS, Moodle, Wikipedia offline.",
            why_en: "R1: Hex — up to 25,000 people, 1 TB SSD. Governance (Keycloak, Odoo, Matrix), Industrial (MQTT, OPC UA, SCADA), Electronics (KiCad), Medical (OpenEMR), FarmOS, Moodle, Wikipedia.",
            targets: ["1TB SSD", "Keycloak SSO", "MQTT/OPC UA/SCADA", "KiCad PCB", "OpenEMR", "Kiwix+Wikipedia"],
            links: []
          },
          {
            name: "R2a — Поліс / R2b — Мегаполіс (в розробці)", name_en: "R2a — Polis / R2b — Megalopolis (in development)",
            priority: "БАЖАНО",
            why: "R2a: до 500,000 людей, multi-DC, повна e-government. R2b: до 1.2M, metro optical rings, 5G/6G.",
            why_en: "R2a: up to 500,000 people, multi-DC, full e-government. R2b: up to 1.2M, metro optical rings, 5G/6G.",
            targets: ["Multi-TB storage", "BGP/EVPN", "Nix/Guix reproducible builds"],
            links: []
          },
          {
            name: "R3 — Ковенант (в розробці)", name_en: "R3 — Covenant (in development)",
            priority: "ДОДАТКОВО",
            why: "R3: Федерація 2+ Полісів, T3 міжполісна магістраль, федеративна PKI, distributed sovereignty framework. Цивілізаційна стійкість.",
            why_en: "R3: Federation of 2+ Poleis, T3 inter-Polis backbone, federated PKI, distributed sovereignty framework. Civilizational resilience.",
            targets: ["inter-Polis BGP", "federated PKI", "cross-Polis WireGuard", "contractual framework"],
            links: []
          }
        ]
      }
    ]
  },

  // ══════════════════════════════════════════════════════════════
  // 🤝 COMMUNITY
  // ══════════════════════════════════════════════════════════════
    {
    group: "🤝 COMMUNITY — СПІЛЬНОТА",
    group_en: "🤝 COMMUNITY — COMMUNITY",
    items: [
      {
        id: "community-main",
        emoji: "[COM]",
        color: "#22c55e",
        title: "COMMUNITY — Долучитись",
        title_en: "COMMUNITY — Get Involved",
        subtitle: "Open-source проект. Контриб'юції, дискусії, звіти про баги — вітаються.",
        subtitle_en: "Open-source project. Contributions, discussions, bug reports — welcome.",
        analogy: "Як npm ecosystem: цінність проекту — в кількості людей які його тестують і покращують.",
        analogy_en: "Like the npm ecosystem: the project's value is in the people testing and improving it.",
        entries: [
          {
            name: "GitHub — код, issues, discussions", name_en: "GitHub — code, issues, discussions",
            priority: "БАЖАНО",
            why: "Основний хаб проекту. Issues — для багів і фіч. Discussions — для ідей. Pull Requests — для контриб'юцій.",
            why_en: "Main project hub. Issues — bugs and features. Discussions — ideas. Pull Requests — contributions.",
            targets: ["GitHub Issues", "Pull Requests", "Discussions"],
            links: [
              { t: "GitHub RVNNT", u: "https://github.com/RVNNT" }
            ]
          },
          {
            name: "Як контрибьютити", name_en: "How to contribute",
            priority: "БАЖАНО",
            why: "Найцінніші контриб'юції: (1) тестування офлайн на реальному залізі (2) переклади (3) нові секції для DEPOT (4) виправлення посилань що протухли.",
            why_en: "Most valuable: (1) offline testing on real hardware (2) translations (3) new DEPOT sections (4) fixing dead links.",
            targets: ["тестування", "переклади", "нові секції", "виправлення посилань"],
            targets_en: ["testing", "translations", "new sections", "fixing dead links"],
            links: []
          },
          {
            name: "Telegram — спільнота", name_en: "Telegram — community",
            priority: "БАЖАНО",
            why: "Чат спільноти: обговорення, питання, анонси оновлень.",
            why_en: "Community chat: discussions, questions, update announcements.",
            targets: [],
            links: [
              { t: "t.me/rvnnt2", u: "https://t.me/rvnnt2" }
            ]
          }
        ]
      }
    ]
  }

]
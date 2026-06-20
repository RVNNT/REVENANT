# GEMINI.md — Project Briefing for LLM

## LLM Interaction Protocol (DICTUM v1.0)

1. **Language:** Ukrainian. Technical terms: English.
2. **Style:** Concise, direct, information-dense. No filler, no speculation, no motivational language.
3. **Correctness over completeness.**
4. **Never hallucinate.** If unsure — state it explicitly with `Confidence: low`.
5. **Never fabricate** sources, links, or product data.
6. **Scope:** Follow the exact scope of the request. Do not expand unless asked.
7. **Ambiguity:** If required information is missing — stop and ask clarification instead of guessing.
8. **Before complex actions:** restate the task, clarify uncertainties, ask for confirmation.
9. **Destructive Action Protocol:** Before any action that may cause destructive, structural, or irreversible changes:
   - State **current state** (what exists now)
   - State **proposed change** (what will be done)
   - **Impact Analysis:** what breaks? (e.g. "This will break backward compatibility with Phase 1 nodes")
   - Ask `⚠️ підтверджуєш?` — proceed only after explicit `так, підтверджую`.
10. **Before changing any existing file:** compile a list of changes, send for approval, proceed only after confirmation.
11. **Code:** Always pay close attention to primary keys, data integrity, structural dependencies. Identify the **core invariant** before suggesting changes — never degrade it for a secondary optimization.
12. **Default output format** for guides/docs/tutorials: **HTML**, unless another format is explicitly requested.

---

## What is REVENANT

**REVENANT** — Hardened Bootstrap Software Recovery Protocol.

A system for bootstrapping civilization from a single physical medium (USB / SSD / HDD) without internet access. Everything — OS, compilers, apps, documentation, firmware — is stored offline and deploys from scratch.

**Core principle:** one flash drive → working technical civilization.

**Live site:** [rvnnt.github.io/REVENANT](https://rvnnt.github.io/REVENANT)

---

## Civilizational Scale Model

### Settlement levels (R)

| Level | Name | Population | Medium |
|-------|------|------------|--------|
| R0 | Clan | 50–200 | 64–128 GB USB |
| R1 | Hex | up to 25,000 | 1 TB SSD |
| R2a | Polis | up to 500,000 | Multi-TB |
| R2b | Megalopolis | up to 1,200,000 | Multi-DC |
| R3 | Covenant | 2+ Poleis | Distributed |

### Network layers (T)

| Layer | Scope | Technology |
|-------|-------|-----------|
| T0 | Clan mesh | LoRa (Sub-GHz + 2.4 GHz), phones |
| T1 | Hex | Fiber backbone + wireless |
| T2a | Polis | Fiber between Hex nodes, BGP/EVPN |
| T2b | Megalopolis | Metro optical rings, 5G/6G |
| T3 | Covenant | Inter-Polis backbone |

---

## R0 — Clan (current focus)

**Input:** one flash drive.  
**Output:** secured T0 mesh network, text + voice communication for 50–200 people.

### What R0 contains (~33–52 GB real volume)

| Layer | Size |
|-------|------|
| Offline LLM (Ollama 4B Q4) | 4–5 GB |
| Dev Stack (gcc/clang/cargo/Node/nasm) | 4–6 GB |
| Dev Environment (Zed+Neovim+LSP+debug+git) | 5–8 GB |
| Offline Maps (OSM) | 0.5–2 GB |
| FreeCAD + toolchain | 3–5 GB |
| Power Stack (solar/wind/HES docs) | 0.5–1 GB |
| Radio Doctrine (EMCON, anti-jam, fallback PHY) | 0.2–0.5 GB |
| Metric Seed (STL standards, M2–M12 threads) | ~0.1 GB |
| Economy (mutual credit ledger) | 0.5 GB |
| Reproducible Build Seed | 2–3 GB |
| Integrity & Security (SHA256 manifest, GPG) | 0.5–1 GB |
| Documentation Pack | 2–3 GB |
| Firmware + other critical | 3–5 GB |
| Reserve | ~7 GB |
| **Total** | **~33–52 GB** |

### T0 Network stack

**PHY:** LR2021 — Sub-GHz LoRa + 2.4 GHz LoRa (~2.5 Mbps shared)  
**Transport:** Reticulum (store-and-forward over RF) + custom lightweight UDP-like datagram over raw RF  
**App layer:** Rnode/Sideband, **Rampart + Outband** (custom), Nomad Network, Matrix Synapse (no federation), Mumble (Opus 6–12 kbps)

---

## R1 — Hex (next milestone)

**25,000 people, 2 km², 1 TB SSD, ~321–493 GB real volume.**

Key additions over R0:
- Governance: Keycloak (SSO/RBAC/PKI), Odoo (ERP), Matrix Synapse (federated), E-doc stack
- Industrial: Eclipse Mosquitto (MQTT), OPC UA, ScadaBR/OpenSCADA, PostgreSQL HA historian
- Compute: Proxmox cluster, HashiCorp Vault, CoreDNS, Prometheus+Grafana
- Package mirrors: Debian (80–120 GB), Container Registry (20–40 GB), PyPI (20–40 GB), npm (5–10 GB)
- Electronics: KiCad EDA, PCB fabrication stack, datasheet archive
- FabLab: LinuxCNC (CNC machines)
- Medical: OpenEMR + DICOM
- Agriculture: FarmOS
- Education: Moodle LMS
- Knowledge: Kiwix + full Wikipedia dump (~60 GB)
- Security: Wazuh HIDS, AIDE, full PKI (offline Root CA), DR Playbook
- Reproducible builds: GCC bootstrap 3 versions, musl/glibc, kernel LTS source

---

## Hardware Components

### COREBAND (firmware)
**Platform:** ESP32 + SX1262 (LoRa), RadioLib  
**Purpose:** Enhanced RNode — the radio dongle that connects to phones  
**Connection:** BLE (Nordic UART Service) + USB-OTG (CDC ACM)

**4 development phases:**

| Phase | Result | Timeline |
|-------|--------|----------|
| 1 | Standard RNode compatibility + NOISE-KILLING (SF7/BW250, CAD, frequency offset) | 4–6 weeks |
| 2 | Voice (PTT Codec2 + Voice Messages), QoS, Dual Channel | +4–6 weeks |
| 3 | NVS Wipe (Panic PIN), IFAC hardware filter, Blacklist, Smart Beacon, BLE Gateway, Auto-Freq Agility | +4–6 weeks |
| 4 | FHSS (frequency hopping), TDMA Slot Model, full anti-EW protection | +6–8 weeks |

<context name="coreband_invariant" priority="critical">
**Core architectural invariant — NEVER violate:**
`setFrequency()` is called ONLY from Radio Abstraction Layer via `get_active_channel(timestamp)`.
MAC never knows the actual frequency. No business logic, QoS, provisioning, or UI calls frequency directly.
Phase 1–3: `get_active_channel()` always returns `channel_0`.
Phase 4: `get_active_channel()` returns `hop_table[slot % size]`.
This makes Phase 4 (FHSS) an evolution, not a rewrite. Violating this invariant makes Phase 4 a painful full rewrite.
</context>

**NOISE-KILLING progression** (Meshtastic interference threshold at 1.5 km radius):
- Baseline: ~210 nodes
- Phase 1 (SF7/BW250 + CAD + offset): ~660
- Phase 2 (+ Dual Channel): ~850
- Phase 4 (+ Full FHSS): ~11,700

### OUTBAND (app)
**Platform:** Android, Python/Kivy, fork of Sideband  
**Purpose:** User-facing mesh communication app  

**4 development phases:**

| Phase | Result | Timeline |
|-------|--------|----------|
| 1 | Text (LXMF), roles (MEMBER/OFFICER/ADMIN), provisioning (.clan/QR/NFC/USB/BLE), Panic PIN, local Blacklist | 3–4 months |
| 2 | Voice PTT (Codec2 700C + VAD), QoS priority queue, Airtime Budget | +2–3 months |
| 3 | Succession (planned + emergency), Group Rekeying, Remote Kill-switch, READ MODE, Smart Beacon, BLE Gateway | +3 months |
| 4 | FHSS, Slot Model, IFAC hardware filter | +4–6 months |

**Role model:**
- `ROLE_MEMBER` — chat, maps, PTT, SOS
- `ROLE_OFFICER` — + Voice Priority Override, Tactical Wipe
- `ROLE_ADMIN` — + network params, Group Rekeying, Consensus Wipe

**Hardware status (independent of role):**
- `STATUS_RECRUIT` — any device (text only)
- `STATUS_RANGER` — COREBAND only (+ voice, beacon, wipe, succession)

**Panic PIN:** enters as ROLE_MEMBER, silently performs RAM zeroization + NVS erase + sends compromise packet.

---

## Web Interface (index.html)

Single-file offline HTML application. No build tools, no dependencies.

**Architecture:**
- `SECTIONS = [...]` — all content data (UA + EN bilingual)
- CSS variables for dark/light theme
- Hash-based routing (`#section/id`)
- Accordion entries with priorities (КРИТИЧНО / ВАЖЛИВО / БАЖАНО / ДОДАТКОВО)

<context name="index_html_editing_rules" priority="critical">
**Editing rules — NEVER violate:**
- ALWAYS use targeted str_replace on a specific fragment. NEVER rewrite the whole file.
- When editing, identify the exact `id` or `name` of the target section/entry first.
- Provide only the updated JS object or the specific string to be replaced — not surrounding context.
- STRICTLY use only the existing data structure fields listed below. Do NOT invent new CSS classes, HTML tags, or JS fields not present in the renderer.
- Chunk-based editing: when adding new content, provide only the new JS object to insert, not the full SECTIONS array.
</context>

<context name="index_html_data_structure" priority="critical">
**Data structure per entry — only these fields exist in the renderer:**
```js
{
  name: "UA", name_en: "EN",
  priority: "КРИТИЧНО",  // КРИТИЧНО | ВАЖЛИВО | БАЖАНО | ДОДАТКОВО
  why: "UA", why_en: "EN",
  targets: ["technical terms"],
  links: [{ t: "label", u: "https://..." }],
  note: "UA", note_en: "EN",       // optional
  steps: [{
    t: "UA step title", t_en: "EN",
    b: "UA description", b_en: "EN",  // optional
    c: "code — language-neutral"       // optional
  }],
  archive: {
    dir: "00-android/termux/",
    files: ["file.apk"],
    note: "UA", note_en: "EN"       // optional
  }
}
```
Section-level fields: `id`, `emoji`, `color`, `title`/`title_en`, `subtitle`/`subtitle_en`, `analogy`/`analogy_en`, `entries[]`, `hidden` (optional), `path` (optional).
Group-level fields: `group`, `group_en`, `items[]`.
</context>

---

## DEPOT Structure (offline archive)

```
COLDSTART-DEPOT/
  00-os-iso/          ← Linux ISO images
  00-bootstrap/tcc/   ← TCC compiler for bootstrap
  00-android/termux/  ← Termux APK
  01-compilers/       ← arm-none-eabi-gcc, riscv, avr
  02-libc/            ← newlib, musl, avr-libc, glibc
  03-startup/         ← CMSIS, STM32 LL, linker scripts
  04-flash-debug/     ← OpenOCD, avrdude, GDB
  05-emulation/       ← QEMU, Renode
  06-docs-isa/        ← PDF ISA manuals
  07-docs-refman/     ← PDF MCU reference manuals
  08-books/           ← books PDF
  09-os-bootloaders/  ← Buildroot, U-Boot, Alpine
  10-tools/           ← cmake, ninja, make
  11-eda/             ← KiCad, LTspice
  12-networking/      ← lwIP, Wireshark
  13-math/            ← CLRS, DSP guide
  14-power/           ← solar, battery guides
  15-rtos/            ← FreeRTOS, Zephyr
  16-protocols/       ← UART, SPI, I2C reference code
```

---

## Project Files

| File | Purpose |
|------|---------|
| `README.md` | Public overview for GitHub |
| `index.html` | Main web UI (single deployable file) |
| `index.md` | Full technical spec: R0 + R1 detailed |
| `rampart.md` | RAMPART firmware TZ (ESP32+LoRa, 4 phases) |
| `outband.md` | OUTBAND app TZ (Android, 4 phases) |
| `scenario_phone.md` | Bootstrap scenario: phone → civilization |
| `mesh for l2.md` | Research: mesh routing at scale (L2 problem) |
| `t2-star.md` | Research: T2 wireless tech (60 GHz, FWA, 5G) |
| `t2-t3.md` | Research: T2–T3 network architecture options |
| `GEMINI.md` | This file |

---

## Key Design Decisions

- **ARM only** — no x86 support. Platforms: macOS ARM, Linux ARM, Android (Termux), JB iOS.
- **Bilingual** — EN default, UA toggle. Every content field has `field` + `field_en` pair.
- **Single HTML file** — index.html is built from `sections.js` + `renderer.html` via `build.sh`.
- **No blockchain** — mutual credit ledger uses distributed sync over T0 mesh, no crypto dependencies.
- **Reticulum** is the transport layer for T0/T1. At T2+ it rides as overlay over hardware protocols.
- **RAMPART Phase 1 = standard RNode** — 100% Sideband-compatible. CLAN features are strictly feature-gated.
- **Archive name:** COLDSTART-DEPOT (not VAULT, not ARCHIVE).
- **Main recovery section:** RESPAWN.

---

## Current Status & Next Priorities

**Done:** R0 spec complete, R1 spec complete, RAMPART TZ complete (4 phases), OUTBAND TZ complete (4 phases), web UI with full R0+R1 content.

**In progress:** RAMPART Phase 1 implementation.

**Next for web UI:**
1. RESPAWN section — step-by-step civilization recovery protocol (phases: Power → Linux → Local network → Services → Hardware production → Regional network)
2. Add `steps[]` + `archive` to remaining sections without them (priority: toolchains → startup → flash → os)
3. Remove `scenario-x86` section (x86 not supported)
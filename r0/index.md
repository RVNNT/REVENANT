
#￹​‌​‌​‌‌​​‌‌‌‌​‌‌‌​​​‌‌​​​​‌​​​​​‌‌​​‌‌​‌​‌​​‌‌​​‌​​‌‌​​‌‌​‌‌‌​‌‌‌​‌​​​​​‌‌​‌‌‌​​​‌​‌​‌‌‌​‌​​‌‌​‌​‌​‌​​​‌​​​​‌​​​​​‌​‌‌‌​​‌​​​​​​￺# R0 — Clan (50–200 people)

**Goals:**
- Stable text + voice communication
- Full autonomous software development
- Minimal fabrication (3D modeling)
- Internal economy
- Reproducible builds and artifact integrity
- Autonomous power supply (Power Stack)
- Radio discipline and T0 survival (Radio Doctrine)
- Physical standardization between clans (Metric Seed)

### Boot Medium
- 64 GB USB (minimum)
- 128 GB recommended
- Real volume: ~28–44 GB

---

### T0 Network (Clan Mesh)

**PHY: LR2021**
- Sub-GHz LoRa
- 2.4 GHz LoRa (~2.5 Mbps shared)

**Transport:**
- LoRa + Reticulum
- Custom lightweight UDP-like datagram over raw RF
- Store-and-forward

**App layer:**
- Rnode + Sideband
- Coreband (enhanced Rnode) + Outband (fork of Sideband)
- Nomad Network
- Matrix Synapse (no federation)
- Mumble (Opus 6–12 kbps)

---

### Mobile Bootstrap

**Android**
- F-Droid snapshot
- APK mirror
- Termux bootstrap (Termux:Boot + Termux:Widget, QEMU + KVM → Debian ARM64)

**iOS**
- Jailbreak archive
- IPSW archive
- Sideload tools

---

### Offline Maps
- OSM region extract (~0.5–2 GB)
- Routing engine
- Offline tiles (selected zoom)

---

### Offline LLM Stack
- Model: ~4B Q4 (≈3 GB)
- Ollama
- CPU inference runtime
- Embedding model
- Lightweight vector DB

**Footprint: ~4–5 GB**

---

### Dev Stack (R0)

**Languages:** C / C++, Rust, Node.js, Assembly

**Toolchains:**
- gcc / g++, clang, musl
- cargo
- Node LTS
- nasm
- arm-none-eabi
- aarch64-linux-gnu

**Build tools:** make, cmake, ninja, gdb, pkg-config

**Footprint: ~4–6 GB**

---

### Fabrication Stack (R0)

#### FreeCAD + toolchain
> LinuxCNC (CNC machine control) moves to R1,
> where physical FabLab infrastructure exists.
> R0 retains CAD/CAM for design work.

- FreeCAD: parametric 3D modeling, CAD/CAM
- G-code generation and simulation (for 3D printing)
- Parts library + material profiles
- Offline toolchain for 3D printers

**Footprint: ~3–5 GB**

---

### Power Stack (R0)

> A flash drive without power is a useless brick.
> R0 survives 48 hours without a power doctrine.

- **DIY solar controller docs**: MPPT and PWM controller schematics, panel sizing calculations
- **Car charging**: DC-DC buck/boost schematics, 12V → 5V USB, overvoltage protection
- **Wind generation basics**: rectifiers, dump load resistors, charge regulation
- **Battery chemistry safety**: LiFePO4 vs Li-ion — thermal limits, BMS logic, safe storage
- **BMS documentation**: balancing schematics, threshold values, recovery procedures
- **DC microgrid guides**: 12V / 24V / 48V standards, AWG tables, fusing, grounding
- **Inverter repair basics**: topologies (modified sine vs pure sine), MOSFET replacement, diagnostics
- **Energy calculator**: typical equipment consumption tables + planning templates

**Footprint: ~0.5–1 GB**

---

### Radio Doctrine (R0)

> T0 mesh in a conflict zone is the first target.
> LR2021 is hardware. Doctrine is network survival.

#### Frequency Strategy
- Permitted ISM band tables by region
- Frequency hopping policy: algorithm, time slots, seed rotation
- Fallback bands: Sub-GHz (433/868/915 MHz), 2.4 GHz, 5.8 GHz

#### Anti-Interference Procedures
- Anti-jam checklist: detection, switching, source isolation
- Silent window protocol: radio silence schedule, trigger conditions
- EMCON (Emission Control) mode: full radio silence, entry/exit procedure

#### Fallback PHY
- FSK (bare minimum): configs for CC1101 / SX1276 in FSK mode
- WiFi ad-hoc: 802.11 IBSS setup, IP scheme without DHCP
- Ethernet over twisted pair: DIY patch cables, direct connection scheme
- Courier protocol: physical medium transport as last resort fallback

#### Operational Discipline
- Manual call signs: assignment system, format, rotation
- Paper routing fallback: manual message routing scheme between nodes
- Spectral discipline: silence rules, minimum power, duty cycle

**Footprint: ~0.2–0.5 GB**

---

### Metric Seed (R0)

> If Clan A and Clan B print parts independently —
> they must fit together without adjustment.

- **STL reference standards**: meter ruler, caliper template, 20mm reference cube
- **FreeCAD parametric models**: same standards as editable source
- **Calibration targets**: test prints for extruder and bed calibration
- **Standard threads**: M2–M12 nut and bolt templates (printable go/no-go gauge)
- **Inter-clan compatibility**: agreed tolerances (±0.2mm default)

**Footprint: ~0.05–0.1 GB**

---

### Economy Stack (R0)

#### Mutual credit ledger
- Offline-first mutual credit accounting
- Local currency / labor units
- Distributed ledger (no blockchain dependencies)
- CLI + minimal web UI
- Sync over T0 mesh when connection is available

**Footprint: ~0.5 GB**

---

### Reproducible Build Seed (R0)

> If the toolchain is corrupted — a recovery point is needed.
> R0 carries a minimal seed for rebuilding the critical toolchain.

- **Source tarballs**: gcc bootstrap, musl libc, binutils, Linux kernel headers
- **Lockfile archive**: pinned versions of all critical R0 packages
- **Build scripts**: deterministic build scripts with hash verification
- **reprotest / diffoscope**: build reproducibility verification
- Foundation for the full source archive at R1

**Footprint: ~2–3 GB**

---

### Integrity & Security Layer (R0)

> A medium without checksum governance is not a trusted medium.

- **SHA256/SHA512 manifest**: hashes of all medium artifacts
- **GPG/age signing**: signed manifest files
- **AIDE** (base config): file integrity baseline for critical files
- **DR Quick-Reference Card**: what to do on node capture, key loss, physical intrusion
- **Key rotation checklist**: rotation procedure on compromise

**Footprint: ~0.5–1 GB**

---

### Dev Environment Layer (R0)

> R0 is a development platform, not just a toolchain archive.
> Every developer in the clan must be able to start a new project in 30 seconds
> and work comfortably under stress, on any hardware.

#### Shell
- bash + zsh (with configs and completions)
- tmux: session management, persistent work across reconnects
- fzf: fuzzy finder for files, history, commands
- ripgrep: fast recursive search
- fd: modern find replacement

#### Editors

**Primary — Zed**
- Frozen offline release for x86 + ARM Linux
- Offline installer
- Local LSP cache
- Pre-configured R0 profile (keybindings, theme, font)

**Fallback — Neovim**
- Minimal but complete config
- nvim-lspconfig: LSP integration
- treesitter: syntax highlighting and code navigation
- telescope: fuzzy finder inside editor
- fugitive: git integration
- gitsigns: inline git diff
- Fully functional without GUI or display server

#### LSP & Static Analysis

| Language | Tools |
|----------|-------|
| C / C++ | clangd, bear (compile_commands generation) |
| Rust | rust-analyzer, full rust toolchain |
| Node / TypeScript | typescript-language-server, eslint, prettier |
| Bash | bash-language-server, shellcheck |
| Markdown | markdownlint, offline preview |

#### Debug Stack
- lldb: LLVM debugger
- cgdb: GDB TUI frontend
- rust-gdb: Rust-aware GDB wrapper
- valgrind: memory error detection
- strace: system call tracer
- ltrace: library call tracer
- **Core dump policy**: automatic save to dedicated folder + docs on reading dumps

#### Build UX
- meson: modern build system
- ccache: C/C++ compiler cache
- sccache: Rust / distributed compiler cache
- npm offline cache + node_modules mirror for key packages

#### Git Infrastructure
- git, git-lfs, pre-commit hooks
- **Forgejo** (local git server): lightweight self-hosted git
  - Essential for 10+ developers
  - Issue tracking, code review, branch management
  - Runs as a container on R0 hardware

#### Testing
- pytest (Python)
- cargo test + criterion (Rust benchmarks)
- gcov / lcov (C/C++ coverage)
- tarpaulin (Rust coverage)

#### DevDocs Mirror (minimal set)
> Already have: C/C++ manuals, Rust Book, Node API docs, Assembly reference.
> DevDocs adds: instant cross-spec search in one offline interface.

- C, Rust, Node.js, Bash
- POSIX spec
- ELF spec
- SQLite docs
- OpenSSL docs
- TCP/IP reference

**Footprint: ~0.5–1 GB**

#### Containers (minimal)
- podman: rootless container runtime
- buildah: container image builder
- No local registry at R0 (registry moves to R1)

#### Dev Security
- cargo audit: Rust dependency vulnerability scan
- clang-tidy: C/C++ static analyzer
- bandit: Python static security analyzer
- SSH CA: certificate-based SSH auth
- git commit signing (GPG/age — already in Integrity Layer, wired here)

#### Project Templates
One command → working project skeleton:
- C project (Makefile + CMake, clangd config)
- Rust service (Cargo workspace, CI skeleton)
- Embedded firmware (STM32 / ESP32 starter)
- CLI utility (Rust or C, argument parsing)
- Node server (TypeScript, ESLint, Prettier pre-configured)

#### Dev Dashboard
- Minimal CLI panel: service status, git status, build status, checksum verify
- Single command: `r0 status`

#### Dev Backup
- restic: fast encrypted incremental backup
- Auto-snapshot policy (daily + on git push)
- Versioned backup retention
- Restore test procedure documented

#### Comfort
- **Fira Code** (font): ligatures, clear distinction between similar characters
- Base color schemes for Neovim and terminal (dark, low eye strain)

**Dev Environment Layer total: ~5–8 GB**

---

### Documentation Pack (R0)
- C/C++ manuals
- Rust Book + std docs
- Node API docs
- Assembly reference
- DevOps guides
- PKI basics
- Embedded quick start

**Footprint: ~2–3 GB**

---

### Other Critical (R0)
- Disk imaging tools
- SQLite + minimal PostgreSQL
- Backup tools
- Firmware archive (basic)
- Time source (GPS/NTP fallback)

**Footprint: ~3–5 GB**

---

### R0 Footprint

| Layer | Size |
|-------|------|
| Offline LLM Stack | 4–5 GB |
| Dev Stack | 4–6 GB |
| **Dev Environment Layer** | **5–8 GB** |
| Offline Maps | 0.5–2 GB |
| FreeCAD + toolchain | 3–5 GB |
| Power Stack | 0.5–1 GB |
| Radio Doctrine | 0.2–0.5 GB |
| Metric Seed | ~0.1 GB |
| Mutual credit ledger | 0.5 GB |
| Reproducible Build Seed | 2–3 GB |
| Integrity & Security Layer | 0.5–1 GB |
| Documentation Pack | 2–3 GB |
| Firmware + other | 3–5 GB |
| Reserve | ~7 GB |
| **Total** | **~33–52 GB** |

→ **64 GB USB minimum. 128 GB recommended.**

### R0 Outcome
- Secured T0 mesh network (text + voice)
- Full autonomous software development
- Professional dev environment (Zed + Neovim + LSP + debug + git)
- Local git server (Forgejo)
- Container runtime (podman + buildah)
- 3D modeling and design (FreeCAD)
- Internal economy (mutual credit)
- Autonomous power (solar / car / wind / DC microgrid)
- Radio discipline and T0 survival (anti-jam, EMCON, fallback PHY)
- Physical standardization between clans (Metric Seed)
- Reproducible toolchain (source seed)
- Trusted medium (checksum + signing)
- Ready to deploy R1

---

## R1 — Hex (up to 25,000 people)

**Density:** ~12,500 people/km²
**Radius:** ≤1 km
**Fully wired backbone**

### Boot Medium
- 1 TB SSD (minimum)
- Real volume: ~321–493 GB

---

### T1 Network (Hex)
- Fiber backbone
- T1 wireless access (partially mesh)
- ≥1 Mbps / subscriber
- Unifies multiple T0 networks

---

### 1.1 Governance Stack (mandatory)

> Without this, R1 is just a datacenter.

#### Identity / Access — Keycloak
- SSO, RBAC, OIDC, mTLS integration, PKI

#### Communication — Matrix Synapse
- Internal federation between Hex nodes, E2EE, archiving

#### ERP / Governance — Odoo
- Accounting, resources, logistics, manufacturing, HR

#### E-Document Layer
- e-doc server, digital signing, archive, versioning, audit log

| Component | Size |
|-----------|------|
| Keycloak | ~2–4 GB |
| Odoo + deps | ~5–10 GB |
| Matrix | ~3–6 GB |
| E-doc stack | ~2–5 GB |
| **Total** | **~12–25 GB** |

---

### 1.2 Industrial Runtime Layer (mandatory)

> Embedded toolchain without runtime integration = isolated boards.

#### Eclipse Mosquitto (MQTT)
- TLS + mTLS, PKI integration

#### OPC UA
- Server runtime, gateway to MQTT, PKI trust chain

#### SCADA — ScadaBR / OpenSCADA
- Telemetry, alarm engine, historian, dashboard

#### Historian
- PostgreSQL HA, time-series schema, archive ≥ 1 year

| Component | Size |
|-----------|------|
| MQTT + OPC + SCADA + deps | ~5–15 GB |

---

### 1.3 Core Stack

**Compute:** Proxmox cluster, container-based services
**Data:** PostgreSQL HA, Redis, object storage
**Infra:** Prometheus + Grafana, NetBox, CoreDNS, Vault

---

### 1.4 Package Mirrors

| Mirror | Size |
|--------|------|
| Debian Mirror (amd64 + arm64 minimal) | 80–120 GB |
| Container Registry | 20–40 GB |
| PyPI Core | 20–40 GB |
| npm Minimal | 5–10 GB |

---

### 1.5 Embedded Stack

| Platform | Components |
|----------|------------|
| STM32 | Toolchain, OpenOCD, HAL |
| ESP32 | ESP-IDF, flashing tools |
| Arduino | IDE, AVR toolchain |
| RP2040 | Pico SDK |
| Raspberry Pi | OS images, GPIO libs, cross-tools |

**Footprint: ~10–16 GB**

---

### 1.6 Electronics Stack

#### KiCad + PCB Fabrication Stack
> FreeCAD (R0) covers mechanics and 3D printing.
> KiCad (R1) covers electronics.
> Hex is the minimum level where a FabLab appears.

- **KiCad EDA**: schematic capture, PCB layout, 3D board preview
- **Standard libraries**: symbols, footprints, 3D models (~2–3 GB)
- **Community libs**: KiCad Community, manufacturing libraries (~1–2 GB)
- **Fab docs**: IPC standards, SMT assembly guide, DFM rules, Gerber spec
- **BOM tools**: KiCost, KiBot for production automation
- **Chip salvage docs**: desoldering, component identification, ESR testing
- **Datasheet archive**: MCU, power electronics, connectors, passives (~2–5 GB)
- **Gerber viewer + CAM**: file verification before production

**Footprint: ~7–14 GB**

---

### 1.7 Scavenging & Salvage Registry

> R1 is not built from scratch — it is built from what exists.
> The donor hardware catalog turns waste into resources.

#### Donor Hardware Catalog
- **Automotive sensors**: which car models contain ABS sensors (Hall-effect), MAP sensors, stepper motors from starters, alternators, DC-DC modules — with pinouts
- **Office equipment**: printers (stepper motors, NEMA17 compatible), ATMs (feed mechanisms, sensors), cash registers (thermal printers)
- **Household appliances**: washing machines (inverter motors), microwaves (magnetrons, HV transformers), refrigerators (compressors)
- **Network equipment**: routers (SoC, flash, RAM identification), UPS (battery, charging circuits, MOSFET)
- Format: SQLite DB + PDF reference

#### Extended Datasheet Archive (+5 GB)
- **Power transistors**: MOSFET (IRF series, STP series), IGBT (GT series) — datasheet + application notes
- **PWM controllers**: UC3842/3843, TL494, SG3525, LM5116 and clones
- **Logic ICs**: full 74HC/HCT series, CD4000 series, common CMOS
- **Operational amplifiers**: LM358, LM741, TL071/072, OPA series
- **Power electronics**: bridge rectifiers, suppressors, TVS diodes, varistors
- **Communication ICs**: RS485 (MAX485), CAN (MCP2551), I2C/SPI buffers

**Footprint: ~5.5–6 GB**

---

### 1.8 Fabrication Extension (R1)

#### LinuxCNC + full CNC toolchain
> LinuxCNC moved from R0: CNC machines = R1 FabLab infrastructure.

- LinuxCNC: milling, lathe, cutting, laser control
- HAL configurations for common platforms
- G-code post-processors
- Integration with FreeCAD CAM (R0 projects → R1 machines)

**Footprint: ~1–2 GB**

---

### 1.9 Medical Stack (R1)

#### OpenEMR + DICOM
> DICOM requires hardware (X-ray, ultrasound) — Hex-level equipment.
> Full EMR = institutional medicine, not clan-level.

- OpenEMR: full electronic medical records
- DICOM support: X-ray, ultrasound, image storage
- PACS-compatible filesystem
- Offline installer + DB schema
- Keycloak integration (RBAC for medical staff)

**Footprint: ~2–3 GB**

---

### 1.10 Agriculture Stack (R1)

#### FarmOS + precision agriculture
> Precision agriculture with sensors and REST API =
> organized farming at Hex scale.

- Open farm management platform
- Crop planning, yield tracking, resource management
- Offline field maps (OSM integration)
- Sensor integration (T1 MQTT → OPC UA)
- REST API for automation

**Footprint: ~2–5 GB**

---

### 1.11 Education Stack (R1)

#### Moodle + LMS
> A full LMS requires a school, teachers, and a student pipeline —
> an R1 institution, not clan-level peer-to-peer education.

- Full-featured LMS
- Offline mode with PWA
- Course content (sciences, medicine, agriculture, engineering)
- SCORM compatibility
- Testing and certification

**Footprint: ~2–4 GB**

---

### 1.12 Knowledge Archive

#### Kiwix + Wikipedia dump
- Full offline Wikipedia archive
- Kiwix server (HTTP for the entire T1 network)
- ZIM format, offline search
- Optional: Wiktionary, WikiBooks, WikiSource, StackOverflow

**Footprint: ~60 GB**

---

### 1.13 Hardware & Firmware Archive

> Hardware that fails without firmware means a dead node.

#### BIOS/UEFI Recovery Images
- Dell iDRAC / BIOS (PowerEdge): ~2–3 GB
- HP iLO / System ROM (ProLiant): ~2–3 GB
- Supermicro BMC + BIOS: ~1–2 GB
- ASRock Rack, Lenovo ThinkSystem: ~1–2 GB
- UEFI Capsule updates for Intel platforms
- **Total: ~5–10 GB**

#### NIC / RAID / HBA Firmware
- Intel i210, i350, X550, X710: ~0.5 GB
- Mellanox / Nvidia ConnectX-4/5/6: ~0.5 GB
- Broadcom NetXtreme / BCM57xxx: ~0.5 GB
- Realtek 8125/8168: ~0.2 GB
- LSI MegaRAID / Broadcom RAID: ~0.5 GB
- HPE Smart Array: ~0.5 GB
- **Total: ~2–4 GB**

#### CPU Microcode Archive
- intel-ucode (Haswell → Sapphire Rapids): ~0.3 GB
- amd-ucode (Zen 1 → Zen 4): ~0.1 GB
- **Total: ~0.5 GB**

#### GPU Firmware
- AMD amdgpu (GFX8–GFX11): ~1–2 GB
- Intel i915 (DMC, GuC, HuC): ~0.5 GB
- Nvidia open GSP (30xx/40xx): ~0.5 GB
- **Total: ~2–3 GB**

#### Driver Archive
- Realtek wifi (rtl8821ce, rtl88x2bu): ~0.5 GB
- Broadcom wl (bcmwl-kernel): ~0.3 GB
- Intel iwlwifi firmware blobs: ~0.5 GB
- DKMS-compatible modules: ~1–2 GB
- **Total: ~2–5 GB**

#### Kernel Source + Rebuild Toolchain
- Linux LTS source tarball (compressed): ~1.2 GB
- Kernel documentation: ~0.5 GB
- Kconfig reference + build scripts: ~0.3 GB
- Cross-compile toolchain: ~1–2 GB
- **Total: ~3–5 GB**

#### Server Repair Documentation
- IPMI / BMC management guide
- Dell OpenManage / iDRAC reference
- HP iLO complete guide
- Storage troubleshooting (RAID rebuild, HDD diagnostics)
- ECC memory / POST code reference
- Hardware-level network debugging
- **Total: ~2–5 GB**

**Hardware & Firmware Archive total: ~14–32 GB**

---

### 1.14 Reproducible Build Pipeline

> Binary registry corrupted → reproduce from source.

#### Source Archive (critical components)
- GCC (bootstrap: 3 versions for staged rebuild): ~1.5 GB
- glibc + musl libc: ~0.5 GB
- binutils + ld: ~0.3 GB
- Linux kernel LTS: ~1.2 GB (shared with Firmware Archive)
- OpenSSL + LibreSSL: ~0.3 GB
- Python (CPython source): ~0.5 GB
- Rust (rustc bootstrap + std): ~2–3 GB
- Node.js source: ~0.5 GB
- systemd, busybox, util-linux: ~0.5 GB
- **Total: ~7–12 GB**

#### Toolchain Pinning & Lockfiles
- SHA256-verified lockfiles for all critical deps
- Reproducible build manifests (Debian `.buildinfo` format)
- Version compatibility matrices
- **Total: ~0.5 GB**

#### Build Verification Toolchain
- reprotest: build reproducibility verification
- diffoscope: diff between binary artifacts
- strip-nondeterminism: timestamp removal from builds
- **Total: ~0.5–1 GB**

> Full Nix/Guix model (~40–80 GB) — roadmap for R2.
> R1 uses a lightweight source archive + deterministic scripts.

**Reproducible Build Pipeline total: ~8–14 GB**

---

### 1.15 Security Hardening Layer

> PKI exists. WireGuard exists. But those are network perimeter controls.
> Protection against physical intrusion and insider threats is also needed.

#### Host-based IDS — Wazuh
- HIDS agent + manager
- MITRE ATT&CK mapping
- File integrity monitoring, log correlation, active response
- **Footprint: ~3–5 GB**

#### File Integrity — AIDE
- Baseline snapshot of critical system files
- Scheduled verification, alert pipeline to Wazuh
- **Footprint: ~0.5 GB**

#### Disaster Recovery Playbook
- Full step-by-step node recovery procedure from scratch
- Compromise checklist
- Compromised node isolation from T1
- RTO/RPO targets and metrics
- **Footprint: ~0.3 GB**

#### Key Rotation & Emergency Governance
- Key rotation on node capture: revocation, new certificates, re-enrollment
- Governance emergency protocol: quorum, out-of-band verification
- Dead man's switch: automatic key revocation on missing heartbeat
- Automated rotation scripts (Vault + PKI integration)
- **Footprint: ~0.5 GB**

#### Intrusion Detection (Physical)
- Motion / door sensor integration API (T1 MQTT-based)
- Alert pipeline to Wazuh
- Physical audit log
- Tamper evidence procedures
- **Footprint: ~0.3 GB**

**Security Hardening Layer total: ~5–8 GB**

---

### 1.16 Checksum Governance Layer

> A medium without a signature is just files.

- **Master manifest**: SHA256 + SHA512 for every file on the medium
- **Signed manifest**: GPG + age signatures from ≥2 independent keys (M-of-N)
- **Merkle tree**: partial verification of large archives
- **Automated verification script**: runs at boot, checks integrity
- **Audit log**: immutable log of all integrity checks
- **sigstore / cosign**: container image signing

**Footprint: ~0.2–0.5 GB**

---

### 1.17 Full PKI
- Offline Root CA
- Intermediate CA
- CRL + OCSP
- Internal ACME
- mTLS for all services

---

### 1.18 Extended Docs (~10–20 GB)
- Full embedded manuals
- PostgreSQL admin
- Keycloak + Odoo + Matrix guides
- Industrial integration docs
- SCADA / OPC UA reference
- Medical stack docs (OpenEMR, DICOM)
- FarmOS administration
- Moodle administration

---

### R1 Footprint

| Layer | Size |
|-------|------|
| Debian Mirror | 80–120 GB |
| Container Registry | 20–40 GB |
| PyPI Core | 20–40 GB |
| npm Minimal | 5–10 GB |
| Governance Stack | 12–25 GB |
| Industrial Runtime | 5–15 GB |
| Embedded Stack | 10–16 GB |
| Electronics Stack (KiCad) | 7–14 GB |
| Scavenging & Salvage Registry | 5.5–6 GB |
| LinuxCNC + CNC toolchain | 1–2 GB |
| Medical Stack (OpenEMR + DICOM) | 2–3 GB |
| Agriculture Stack (FarmOS) | 2–5 GB |
| Education Stack (Moodle) | 2–4 GB |
| Kiwix + Wikipedia dump | ~60 GB |
| Hardware & Firmware Archive | 14–32 GB |
| Reproducible Build Pipeline | 8–14 GB |
| Security Hardening Layer | 5–8 GB |
| Checksum Governance Layer | 0.2–0.5 GB |
| PKI + Infra | 2–5 GB |
| Docs | 10–20 GB |
| Reserve | ~29 GB |
| **Total** | **~321–493 GB** |

→ **1 TB SSD — R1 standard.**

### R1 Outcome
- Minimum viable civilizational unit
- Full digital infrastructure (T1)
- Industrial-ready (SCADA + MQTT + OPC UA)
- Governance-ready (Keycloak, Odoo, E-doc)
- FabLab-ready (KiCad PCB + LinuxCNC CNC)
- Medical institution (OpenEMR + DICOM)
- Agricultural production (FarmOS + sensor integration)
- Educational institution (Moodle LMS)
- Donor hardware catalog (Scavenging Registry)
- Full offline archive of human knowledge (Wikipedia)
- Hardware recovery (any common hardware)
- Reproducible build from source
- HIDS + DR playbook + key rotation
- Trusted medium (checksum governance)
- Cloneable architecture

---

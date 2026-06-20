# Autonomous Offline Dev Stack

---

## Table of Contents

1. [Firmware & OS](#1-firmware--os)
   - [1.1 Boot Stack](#11-boot-stack)
   - [1.2 NixOS — Rejected](#12-nixos--rejected)
   - [1.3 Debian — Selected](#13-debian--selected)
2. [Userspace Stack](#2-userspace-stack)
   - [2.1 Shell Layer](#21-shell-layer)
   - [2.2 Language Runtimes & Toolchains](#22-language-runtimes--toolchains)
   - [2.3 Dev Environment](#23-dev-environment)
   - [2.4 LLM Layer](#24-llm-layer)
   - [2.5 System Reliability](#25-system-reliability)
   - [2.6 Recovery & Backup](#26-recovery--backup)
3. [Communication](#3-communication)
   - [3.1 Mesh (Primary)](#31-mesh-primary)
   - [3.2 Low-bandwidth Fallback](#32-low-bandwidth-fallback)
   - [3.3 Wired LAN](#33-wired-lan)
   - [3.4 Centralized Internet](#34-centralized-internet)
4. [Bootstrap Drive](#4-bootstrap-drive)
   - [4.1 Drive Layout](#41-drive-layout)
   - [4.2 Ansible Provisioning](#42-ansible-provisioning)
   - [4.3 Bootstrap Procedure](#43-bootstrap-procedure)
   - [4.4 Verification](#44-verification)
5. [System Invariant](#5-system-invariant)

---

## 1. Firmware & OS

### 1.1 Boot Stack

```
Firmware
  └── UEFI / BIOS
        initializes CPU, RAM
        searches for boot device

Bootloader
  └── GRUB
        loads kernel from disk

Kernel
  └── Linux kernel
        drivers, memory, scheduler

Init system
  └── systemd
        brings up userspace

Userspace
        shell (bash / zsh)
        compilers, runtimes, utils
```

> **Note:** Absolute minimum: UEFI → bootloader → kernel → init → shell.
> UEFI is assumed "given" (embedded in hardware).

---

### 1.2 NixOS — Rejected

**Reason 1 — No FHS**

NixOS completely abandons the standard filesystem hierarchy. Paths like `/lib/ld-linux.so` and `/usr/bin/python` do not exist. Any proprietary binary (industrial driver, closed-source software) will fail to run.

Workaround: `nix-ld`, `steam-run`, or manual `patchelf` — complexity that simply does not exist on Debian.

**Reason 2 — Mandatory Nix Language**

Functional language with lazy evaluation. Entry barrier is unacceptable in a bootstrap context where participants are not Nix specialists.

**Reason 3 — Storage Overload**

Nix stores multiple versions of the same library in `/nix/store`. On an autonomous device with limited disk, this is critical.

> **Conclusion:** Nix is an excellent tool for stable environments. Bootstrap Recovery Protocol is not a stable environment.

---

### 1.3 Debian — Selected

Goal: *reproducible enough + maximally simple*.

| Property | Rationale |
|---|---|
| Binary compatibility (FHS) | Any Linux binary runs without patching |
| APT + stable packages | Predictable versions, version freeze is possible |
| Minimal image | Debian netinst → <300 MB base |
| Ansible-friendly | Standard Python, standard APT |
| Long LTS | 5 years of support without OS upgrade |

---

## 2. Userspace Stack

### 2.1 Shell Layer

| Component | Role |
|---|---|
| `bash` + `zsh` | Shells + configs + completions |
| `tmux` | Session management, persistent work across reconnects |
| `fzf` | Fuzzy finder: files, history, commands |
| `ripgrep` | Fast recursive search |
| `fd` | Modern find replacement |
| `coreutils` | Base Unix utilities |

**Minimum invariant:** `bash + tmux`

---

### 2.2 Language Runtimes & Toolchains

#### JS / Node.js

| Layer | Components |
|---|---|
| Runtime | Node.js LTS |
| Package managers | npm · pnpm (preferred: offline dedup) |
| Dependency cache ⚠️ critical | `~/.npm` · `~/.pnpm-store` |
| Local registry | Verdaccio (eliminates npmjs dependency) |
| Build / bundle | Vite · TypeScript |
| Backend | Express / Fastify (cached) |
| Desktop | Tauri (preferred: fewer deps) · Electron |
| System bindings | node-gyp (gcc + python) |

**Minimum invariant:** `Node.js + pnpm + pnpm-store + Verdaccio`

#### Rust

| Layer | Components |
|---|---|
| Toolchain | rustup + stable · cargo |
| Targets | x86_64-unknown-linux-gnu · aarch64-unknown-linux-gnu · thumbv7em-none-eabihf |
| Cache | sccache · `~/.cargo/registry` mirror · `cargo vendor` |
| Analysis | clippy · cargo audit · rust-analyzer (LSP) |
| Dev tools | cargo-expand · cargo-watch · rust-gdb |
| Testing | cargo test · criterion (benchmarks) · tarpaulin (coverage) |

**Minimum invariant:** `rustup + cargo + sccache + cargo-registry-mirror`

#### Python

| Layer | Components |
|---|---|
| Runtime | python3 + venv |
| Packaging | pip · setuptools · build |
| Cache | wheel cache (`/opt/python/wheels`) |
| Local index | devpi (simple PyPI mirror) |
| Testing | pytest |
| Security | bandit (static analyzer) |

**Minimum invariant:** `python3 + pip + wheels + local index`

#### C / C++

| Layer | Components |
|---|---|
| Toolchain | gcc · clang · make · cmake · meson |
| Cache | ccache |
| Headers | glibc-dev · linux headers |
| Analysis | clangd (LSP) · bear (compile_commands) · clang-tidy |
| Coverage | gcov · lcov |

**Minimum invariant:** `gcc + clang + cmake + headers + ccache + clangd`

---

### 2.3 Dev Environment

#### Editors

| Role | Tool | Details |
|---|---|---|
| Primary | Zed | Frozen offline release, x86 + ARM Linux; pre-configured R0 profile (keybindings, theme, font) |
| Fallback | Neovim | nvim-lspconfig · treesitter · telescope · fugitive · gitsigns; fully functional without GUI or display server |

#### LSP & Static Analysis

| Language | Tools |
|---|---|
| C / C++ | clangd · bear (compile_commands generation) |
| Rust | rust-analyzer |
| Node / TS | typescript-language-server · eslint · prettier |
| Bash | bash-language-server · shellcheck |
| Markdown | markdownlint · offline preview |

#### Debug Stack

| Category | Tools |
|---|---|
| Debuggers | gdb · cgdb (TUI frontend) · lldb · rust-gdb |
| Memory / tracing | valgrind · strace · ltrace |
| Network | tcpdump · netcat |
| Process | htop · lsof · ps |
| Core dumps | Auto-save to dedicated folder + documented read procedure |

**Minimum invariant:** `gdb + strace + tcpdump + valgrind`

#### Git Infrastructure

| Component | Role |
|---|---|
| git + git-lfs | Base VCS + large file support |
| pre-commit hooks | Lint / format enforcement |
| Forgejo | Self-hosted git server: issue tracking, code review, branch management; runs as container; essential for 10+ developers |
| `/srv/git/mirrors` | Local repository mirrors |

**Minimum invariant:** `git + Forgejo + local mirrors`

#### Testing

| Language | Tools |
|---|---|
| Python | pytest |
| Rust | cargo test · criterion · tarpaulin |
| C / C++ | gcov · lcov |

#### Dev Security

| Tool | Role |
|---|---|
| cargo audit | Rust dependency vulnerability scan |
| clang-tidy | C/C++ static analyzer |
| bandit | Python static security analyzer |
| SSH CA | Certificate-based SSH auth |
| GPG / age | Git commit signing |

#### Project Templates

One command → working project skeleton:

| Template | Contents |
|---|---|
| C project | Makefile + CMake + clangd config |
| Rust service | Cargo workspace + CI skeleton |
| Embedded firmware | STM32 / ESP32 starter |
| CLI utility | Rust or C + argument parsing |
| Node server | TypeScript + ESLint + Prettier pre-configured |

#### Dev Dashboard

```
r0 status   →   service status / git status / build status / checksum verify
```

#### Comfort

| Component | Detail |
|---|---|
| Font | Fira Code — ligatures, clear character distinction |
| Color schemes | Dark, low eye strain — for Neovim and terminal |

---

### 2.4 LLM Layer

| Layer | Components |
|---|---|
| Inference engine | Ollama (binary) |
| Model | GGUF · gemma-3-12b-it-Q4_K_M (for 16 GB RAM) |
| Model storage | `/opt/llm/models/*.gguf` |
| Runtime | Python (venv) |
| Agent | Aider |
| Python cache | `/opt/python/wheels` |

**Minimum invariant:** `Ollama + GGUF model + Python + wheels + Aider`

---

### 2.5 System Reliability

| Component | Role |
|---|---|
| CA bundle snapshot | TLS verification without external access |
| WiFi / NIC firmware | Available offline at install time |
| GPU firmware (optional) | For ML workloads |
| Time tools + local NTP | Correct timestamps for git, certs, logs |

**Minimum invariant:** `CA certs + firmware + time sync`

---

### 2.6 Recovery & Backup

| Component | Role |
|---|---|
| Live ISO | Rescue OS |
| fsck · parted · dd | Disk tools |
| restic | Fast encrypted incremental backup |
| Auto-snapshot policy | Daily + on git push · versioned retention |
| Restore procedure | Documented and tested |

**Minimum invariant:** `rescue OS + disk tools + restic`

---

## 3. Communication

### 3.1 Mesh — Primary

Infrastructure-independent overlay. Operates on top of any PHY.

| Component | Role |
|---|---|
| Yggdrasil | IPv6 overlay mesh · end-to-end encryption · auto-peering via multicast · minimal configuration |
| PHY options | WiFi · Ethernet · LoRa |

> Deployable by an average developer. No single point of failure. Automatic roaming between PHY layers.

---

### 3.2 Low-bandwidth Fallback — No infrastructure

| Protocol | PHY | Use case |
|---|---|---|
| Meshtastic | LoRa | Text messages, GPS coordinates between nodes |
| Briar | WiFi Direct / Bluetooth | Encrypted P2P messaging without a router |
| bitchat | Bluetooth Mesh | Ultra-short range broadcast |

---

### 3.3 Wired LAN

| Component | Detail |
|---|---|
| Ethernet + static IP | Or local DHCP server |
| dnsmasq | Local DNS resolver |
| L2 / L3 routing | Simple routing between cluster nodes |

---

### 3.4 Centralized Internet — If available

| Layer | Components |
|---|---|
| Network | Standard TCP/IP stack |
| DNS | 8.8.8.8 / local resolver |
| Application | HTTP/HTTPS + TLS |
| Services | SMTP · SSH · NTP |

---

### Topology

```
  [Clan A]                          [Clan B]
  Yggdrasil mesh  <──────────────>  Yggdrasil mesh
  WiFi / Ethernet                   WiFi / Ethernet
        │                                 │
  Reticulum gateway node ──────  Reticulum gateway node
        │                                 │
       LoRa                             LoRa
```

Reticulum is a transport-agnostic networking layer. Bridges inter-clan communication over LoRa when Yggdrasil is unavailable due to absence of an IP layer between clans.

---

## 4. Bootstrap Drive

### 4.1 Drive Layout

```
/boot                       ← GRUB + kernel
/                           ← Debian root
/opt/
  cache/
    npm/
    pnpm/
    pip/
    cargo/
    docker/
  llm/
    ollama/
    models/                 ← *.gguf
    cache/
  python/
    wheels/
/srv/
  verdaccio/                ← local npm registry
  git/
    mirrors/                ← git repo mirrors
    forgejo/                ← Forgejo data
  docs/                     ← offline documentation
  ai/
    aider-env/
/var/
  cache-control/
  backups/
/iso/                       ← rescue ISO
```

---

### 4.2 Ansible Provisioning

#### Structure

```
infra/
├── inventory
├── playbook.yml
└── roles/
    ├── base          ← build-essential, curl, git, python3
    ├── shell         ← bash, zsh, tmux, fzf, ripgrep, fd
    ├── editors       ← Zed (offline), Neovim + plugins, LSP cache
    ├── node          ← Node.js LTS + npm + pnpm
    ├── python        ← python3 + venv + pip
    ├── cxx           ← gcc, clang, cmake, meson, ccache
    ├── rust          ← rustup + toolchain + sccache
    ├── cache         ← warms npm/pnpm/pip/cargo; starts Verdaccio
    ├── docker        ← Docker + preloaded images
    ├── llm           ← Ollama + models + Aider
    ├── git-mirror    ← /srv/git/mirrors setup
    ├── forgejo       ← Forgejo container
    ├── mesh          ← Yggdrasil + systemd autostart
    ├── debug         ← gdb, lldb, valgrind, strace, tcpdump
    ├── testing       ← pytest, tarpaulin, lcov
    ├── security      ← cargo audit, bandit, SSH CA, GPG
    ├── system        ← certs, firmware, time tools
    ├── recovery      ← rescue ISO, disk tools
    └── backup        ← restic + snapshot policy
```

#### Playbook (abbreviated)

```yaml
- hosts: localhost
  become: yes
  roles:
    - base
    - shell
    - editors
    - node
    - python
    - cxx
    - rust
    - cache       # critical: cache before build-tools
    - docker
    - llm
    - git-mirror
    - forgejo
    - mesh
    - debug
    - testing
    - security
    - system
    - recovery
    - backup
```

---

### 4.3 Bootstrap Procedure

**Step 0 — Base Debian install**

```bash
apt update && apt install -y git sudo curl ansible
```

**Step 1 — Clone R0 infra repo**

```bash
git clone /opt/cache/git/r0-infra /srv/infra
cd /srv/infra
```

**Step 2 — Run playbook**

```bash
ansible-playbook playbook.yml
```

→ Fully provisioned system. All services start automatically via systemd.

**Step 3 — Services on boot**

| Service | URL / command |
|---|---|
| Yggdrasil mesh | automatic (systemd) |
| Verdaccio | `http://local.dev:4873` |
| Forgejo | `http://local.dev:3000` |
| Ollama API | `http://local.dev:11434` |
| Docs portal | `http://local.dev` |

---

### 4.4 Verification

```bash
r0 status
```

| Check | Expected result |
|---|---|
| Service health | Verdaccio · Forgejo · Ollama — UP |
| Mesh connectivity | Yggdrasil peers visible |
| Offline build test | `npm install` without access to npmjs |
| LLM smoke test | `ollama run gemma3` → response received |
| Checksum verify | ISO + model checksums match |

---

## 5. System Invariant

Minimum working set — what offline development cannot function without. Each layer depends on the one above it.

| Layer | Components |
|---|---|
| OS | Debian + bootloader |
| Shell | zsh + tmux + fzf + ripgrep |
| Editors | Zed + Neovim + LSP cache |
| JS | Node + pnpm + pnpm-store + Verdaccio |
| Python | python3 + pip + wheels + devpi |
| C/C++ | gcc + clang + cmake + ccache |
| Rust | rustup + cargo + sccache + registry mirror |
| Git | git + Forgejo + local mirrors |
| LLM | Ollama + GGUF model + Aider |
| Debug | gdb + valgrind + strace + tcpdump |
| Mesh | Yggdrasil |
| Docs | DevDocs + MDN + man pages (offline) |
| Reliability | CA certs + firmware + NTP |
| Backup | restic + snapshot policy |
| Recovery | rescue ISO + disk tools |
| Provisioning | Ansible playbook + roles |

> **Offline condition:**
> Without dependency caches (npm-store, pip wheels, cargo registry) — offline build is impossible.
> Without Verdaccio / devpi — npm/pip install reaches out to external servers.
> Without Forgejo — no centralized code review for teams of 10+.

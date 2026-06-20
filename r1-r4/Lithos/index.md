# Volume 0: Master Index & System Architecture

**Status:** Structure Updated | **Architecture:** Folder-Isolated Packages

---

## 1. The Lithos Core Architecture Overview

The system under construction is a discrete Transistor-Transistor Logic (TTL) computing node integrated into a closed-loop industrial control system. Its sole operational imperative is maintaining the thermal equilibrium ($1420^\circ\text{C} \pm 0.1^\circ\text{C}$) of a Czochralski silicon pulling furnace.

* **Data Path:** 8-bit, suitable for real-time thermal telemetry processing.
* **Memory:** Harvard Architecture (Separate Instruction and Data buses).
* **Fabrication:** Point-to-point Wire-Wrap on FR-4 matrices (Zero PCB fabrication dependency).
* **Actuation Output:** Pulse-Width Modulation (PWM) signal to Solid-State Relays / IGBTs.

---

## 2. Structural Architecture Blueprint

To ensure system survivability and prevent file collision, documentation is modularized into dedicated subdirectories. Each volume occupies its own physical folder:

```text
lithos_docs/
├── volume_0/
│   └── index.md (This file)
├── volume_1/
│   └── volume_1_harvesting.md
├── volume_2/
│   └── volume_2_alu.md
└── [Standardized sequential volumes...]
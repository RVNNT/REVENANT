# 3. Communication

## Principle

Not a flat P2P mesh for all devices. Instead, a layered funnel:

```
clients → access nodes → mesh core → gateway → interconnect
```

Two tiers, one technology stack: **WiFi + IP + BATMAN-adv + Yggdrasil**.

---

## 3.1 Level 1 — Local Mesh (~200 devices)

### Architecture

```
[Phones / laptops]
        ↓ WiFi (client AP)
[Access routers]       ← 20–50 nodes
        ↓
[BATMAN-adv mesh between routers]
```

### Technology

**BATMAN-adv** (Better Approach To Mobile Adhoc Networking — advanced)

- L2 mesh — behaves like a transparent switch
- No manual routing configuration required
- Stable and battle-tested on OpenWRT and Linux
- Automatic node discovery and failover

### Minimum node setup

Any cheap router running **OpenWRT**, or a mini-PC with a WiFi card.

Each node runs:
- `batman-adv` mesh interface (between routers)
- WiFi AP interface (for client devices)

### Critical rules

| Rule | Reason |
|---|---|
| Mesh only between routers, not client devices | Phones as mesh nodes are unstable and drain battery |
| Max 20–50 mesh routers per segment | Larger meshes degrade L2 broadcast performance |
| Clients connect via AP only | Simplifies topology, clients are invisible to the mesh |

**Minimum invariant:** `batman-adv + OpenWRT/Linux + WiFi AP config`

---

## 3.2 Level 2 — Inter-Mesh Interconnect

### Architecture

```
[Mesh segment A]       [Mesh segment B]
        │                      │
  [Gateway node]  ←──→  [Gateway node]
             Yggdrasil overlay
```

### Gateway node

A designated router (or separate node) that has:
- Access to the local BATMAN-adv mesh
- A point-to-point link to another gateway

Gateways are **controlled nodes** — not every router becomes a gateway.

### Physical link between gateways

| Option | Range | Notes |
|---|---|---|
| WiFi point-to-point (directional antenna) | 1–5 km | Recommended default |
| Ethernet | Local / structured cable run | Use when infrastructure exists |

### Yggdrasil — inter-gateway overlay

Yggdrasil runs **only on gateway nodes**, not inside the mesh.

It provides:
- Automatic routing between segments
- End-to-end encryption on inter-segment traffic
- Stable IPv6 addressing regardless of physical topology
- Simple configuration — no manual BGP/OSPF

**Minimum invariant:** `Yggdrasil + gateway nodes + WiFi P2P or Ethernet backbone`

---

## 3.3 Full Stack

```
LEVEL 1 — local

Clients
  ↓ WiFi
Access routers
  ↓
BATMAN-adv (L2 mesh between routers)

─────────────────────────────────────

LEVEL 2 — inter-cluster

Gateway nodes
  ↓ WiFi P2P / Ethernet
Yggdrasil (L3 overlay)

─────────────────────────────────────

LEVEL 3 — services

HTTP · Git · Chat · LLM API
```

### Technology summary

| Layer | Technology | Role |
|---|---|---|
| Client access | WiFi 802.11 AP | Devices connect to nearest router |
| Local mesh | BATMAN-adv | L2 mesh between routers — "local switch" |
| Inter-cluster link | WiFi P2P / Ethernet | Physical backbone between gateways |
| Inter-cluster routing | Yggdrasil | L3 overlay — "inter-network router" |

Three technologies. One mental model:

```
WiFi → BATMAN-adv → (gateway) → Yggdrasil
```

### Scale

| Tier | Capacity |
|---|---|
| 1 mesh segment | ~200 clients, 20–50 routers |
| Multi-segment | Thousands of clients |
| Full backbone | Tens of thousands (multiple Yggdrasil regions) |

---

## 3.4 Wired LAN (optional)

Where Ethernet infrastructure exists, routers can mesh over cable instead of WiFi. BATMAN-adv is PHY-agnostic.

| Component | Detail |
|---|---|
| Ethernet + static IP | Or DHCP within segment |
| `dnsmasq` | Local DNS resolver |
| L2/L3 routing | Handled by BATMAN-adv and Yggdrasil respectively |

---

## 3.5 Centralized Internet (if available)

| Layer | Components |
|---|---|
| Network | Standard TCP/IP stack |
| DNS | Local resolver / 8.8.8.8 fallback |
| Application | HTTP/HTTPS + TLS |
| Services | SMTP · SSH · NTP |

Internet access is **optional and additive** — the stack functions fully without it.

---

## System Invariant — Communication

| Layer | Components |
|---|---|
| Local mesh | BATMAN-adv + OpenWRT routers |
| Client access | WiFi AP on each router |
| Gateway link | WiFi P2P (directional) or Ethernet |
| Inter-segment | Yggdrasil on gateway nodes only |
| DNS | dnsmasq |

> **Mesh rule:** BATMAN-adv between routers only. Clients, phones, and laptops connect via AP — never as mesh nodes.
>
> **Yggdrasil rule:** Runs on gateway nodes only. Never deployed to client devices or every router in the segment.
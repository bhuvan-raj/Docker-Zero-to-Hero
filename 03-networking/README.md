# 03 — Docker Networking

[← Back to Main README](../README.md)

---

## 📋 Table of Contents

- [Why Do Containers Need Networks?](#-why-do-containers-need-networks)
- [Docker Network Types](#-docker-network-types)
- [Bridge Network — Deep Dive](#-bridge-network--deep-dive)
- [Reserved IPs in Bridge Network](#reserved-ips-in-bridge-network)
- [Networking Commands](#-networking-commands)
- [Hands-on Project](#-hands-on-project)

---

## 🌐 Why Do Containers Need Networks?

Containers are isolated by default — they need a network to:

- Communicate with other containers (e.g., an app connecting to a database)
- Serve websites or APIs to external users
- Download updates or dependencies from the internet

---

## 🔌 Docker Network Types

| Driver | Use Case | Isolation |
|--------|----------|-----------|
| **Bridge** | Default for standalone containers on the same host | Container-level |
| **Host** | Container shares the host's network stack directly | None (uses host ports) |
| **None** | Complete network isolation | Full |
| **Overlay** | Multi-host communication (requires Docker Swarm) | Cross-host |
| **Macvlan** | Assigns a MAC address to each container — appears as a physical device | MAC-level |

### Bridge (default)

- Default network driver when no `--network` flag is specified.
- Containers can communicate using container names (DNS resolution).
- Has outbound internet access via NAT.

### Host

- Container shares the host machine's network stack.
- No isolation — more performant but less secure.
- No port mapping needed (uses host ports directly).

### None

- Container has no network interfaces at all.
- No external or inter-container communication possible.

### Overlay

- Used for multi-host container communication.
- Requires Docker Swarm mode.
- Enables distributed networks across Docker nodes.

### Macvlan

- Assigns a unique MAC address to each container.
- Containers appear as physical devices on the network.
- Useful for direct network access scenarios like DHCP.

---

## 🌉 Bridge Network — Deep Dive

The Bridge network is the default driver when you don't specify a network. It's designed for containers running on the **same Docker host** to communicate with each other.

When you create a user-defined bridge network, Docker provides automatic DNS resolution between containers by their names — this does **not** work on the default `bridge` network.

---

## Reserved IPs in Bridge Network

For the default bridge CIDR `172.17.0.0/16`:

| IP Address | Reserved For |
|------------|-------------|
| `172.17.0.0` | Network address |
| `172.17.0.1` | Gateway (bridge interface on host) |
| `172.17.0.2` onwards | Assigned to containers |
| `172.17.255.255` | Broadcast address |

---

## 🛠️ Networking Commands

```bash
# List all Docker networks
docker network ls

# Inspect a specific network
docker network inspect <network-name>

# Create a user-defined bridge network
docker network create my-bridge
# (Docker creates a bridge network by default if --driver is not specified)

# Run a container attached to a specific network
docker run -dit --name container1 --network my-bridge ubuntu

# Connect an existing container to a network
docker network connect my-bridge container2

# Disconnect a container from a network
docker network disconnect my-bridge container2

# Remove a user-defined network
docker network rm my-bridge
```

---

## 🧪 Hands-on Project

Practice Docker networking with a real multi-container application:

**Docker Word Counter App** — demonstrates container-to-container communication over a user-defined bridge network.

👉 [github.com/bhuvan-raj/Docker-word-counter-app](https://github.com/bhuvan-raj/Docker-word-counter-app)

---

## ➡️ Next

[04 — Docker Storage →](../04-storage/README.md)

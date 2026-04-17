# 04 — Docker Storage

[← Back to Main README](../README.md)

---

## 📋 Table of Contents

- [Why Do We Need Docker Storage?](#-why-do-we-need-docker-storage)
- [Storage Types Overview](#-storage-types-overview)
- [Bind Mounts](#-bind-mounts)
- [Docker Volumes](#-docker-volumes)
- [-v vs --mount](#-v-vs---mount)
- [tmpfs Mounts](#-tmpfs-mounts)
- [Volume Commands](#-volume-commands)

---

## 💾 Why Do We Need Docker Storage?

Containers are **ephemeral** by nature — any data written inside a container is lost when the container is removed. Docker storage mechanisms allow you to **persist data** outside the container's lifecycle.

This is essential for:
- Databases that must retain records between restarts
- Web servers storing user uploads
- Applications generating logs for later analysis

---

## 📊 Storage Types Overview

| Type | Managed By | Persistence | Best For |
|------|-----------|-------------|----------|
| **Bind Mount** | You (host path) | Yes | Development, live code sync |
| **Docker Volume** | Docker | Yes | Production data, databases |
| **tmpfs Mount** | RAM | No (wiped on stop) | Sensitive temp data, caching |

---

## 📎 Bind Mounts

Bind mounts link a **specific folder on your host machine** to a folder inside the container. You control the exact path on the host.

**When to use:** Development environments where you want live sync between host files and the container.

```bash
# Using -v flag
docker run -v /home/bubu/app:/app nginx

# Using --mount (more explicit)
docker run --mount type=bind,source=/host/path,target=/container/path nginx
```

> ⚠️ Bind mounts tightly couple your container to the host's file system. Prefer volumes for production.

---

## 📦 Docker Volumes

Docker volumes are the **recommended** way to persist data. They are entirely managed by Docker and stored in Docker's directory on the host (`/var/lib/docker/volumes/` on Linux).

**Advantages over bind mounts:**
- Not tied to a specific host path
- Can be shared between multiple containers
- Easier to back up and migrate
- Work correctly on both Linux and Windows hosts

```bash
# Named volume
docker run -v my-data-volume:/app/data nginx

# Using --mount (more explicit, recommended)
docker run --mount source=my-data-volume,target=/app/data nginx

# Anonymous volume (Docker generates a name)
docker run -v /app/data nginx
```

---

## ⚖️ -v vs --mount

| | `-v` / `--volume` | `--mount` |
|---|---|---|
| Syntax | Compact, colon-separated | Verbose, key=value pairs |
| Error messages | Less descriptive | Clearer, more helpful |
| Recommended for | Quick commands, scripting | New users, complex setups |
| Functionality | Identical | Identical |

Both flags achieve the same result. `--mount` is generally preferred for readability and better error feedback.

---

## ⚡ tmpfs Mounts

A `tmpfs` mount stores data **directly in the host machine's RAM**. It is fast, but completely wiped when the container stops.

**Key properties:**
- Extremely fast (in-memory)
- Non-persistent — data does not survive container restarts
- Secure — sensitive data never touches disk
- Cannot be shared between containers

```bash
# Create a tmpfs mount at /app/temp inside the container
docker run -d --name my-app --tmpfs /app/temp nginx
```

**Good use cases:** temporary tokens, session data, cache that can be safely regenerated.

---

## 🛠️ Volume Commands

| Command | Description |
|---------|-------------|
| `docker volume create my-volume` | Create a named volume |
| `docker volume ls` | List all volumes |
| `docker volume inspect my-volume` | Show detailed info about a volume |
| `docker volume rm my-volume` | Delete a volume (fails if in use) |
| `docker volume prune` | Delete all unused volumes |

```bash
# Create
docker volume create my-volume

# List
docker volume ls

# Inspect
docker volume inspect my-volume

# Remove
docker volume rm my-volume

# Clean up all unused volumes
docker volume prune
```

---

## ➡️ Next

[05 — Docker Registry & Docker Hub →](../05-registry/README.md)

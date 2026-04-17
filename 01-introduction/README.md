# 01 — Introduction to Docker

[← Back to Main README](../README.md)

---

## 📋 Table of Contents

- [What are Containers?](#-what-are-containers)
- [Containers vs Virtual Machines](#-containers-vs-virtual-machines)
- [What is Docker?](#-what-is-docker)
- [Installing Docker](#-installing-docker)
- [Docker Architecture](#-docker-architecture)
- [Enable Normal User to Use Docker](#enable-normal-user-to-use-docker)
- [Docker Container Lifecycle](#-docker-container-lifecycle)
- [Docker Daemon vs Docker Engine](#docker-daemon-vs-docker-engine)
- [Essential Docker Commands](#-essential-docker-commands)

---

## 📦 What are Containers?

Containers are lightweight, portable environments that package applications with their dependencies, ensuring consistency across different computing environments.

---

## ⚖️ Containers vs Virtual Machines

| Feature | Containers | Virtual Machines |
|--------------------|-----------|-----------------|
| Isolation | Process-Level | Full OS-Level |
| Startup Speed | Fast (Seconds) | Slow (Minutes) |
| Size | MBs | GBs |
| Performance | Near Native | Overhead due to Hypervisor |
| Portability | High | Medium |

---

## 🐳 What is Docker?

Docker is an open-source containerization tool used to package applications along with their libraries and dependencies into small, standalone, and isolated units known as **containers**.

---

## 🛠️ Installing Docker

### Linux (Fedora example)

```bash
sudo dnf install docker
sudo systemctl start docker
```

### Windows & Mac

- Download from [Docker Official Site](https://www.docker.com/)
- Follow the installation steps.

---

## 🏗️ Docker Architecture

- **Docker Client** — Sends commands to the Docker daemon.
- **Docker Daemon** — Runs on the host machine and manages containers.
- **Docker Images** — Blueprints for containers.
- **Docker Registry** — Stores and distributes images (Docker Hub).
- **Containers** — Running instances of Docker images.

---

## Enable Normal User to Use Docker

By default, Docker requires root privileges. Add your user to the `docker` group to run Docker without `sudo`:

```bash
sudo usermod -aG docker username
```

> You may need to log out and back in for this change to take effect.

---

## 🔄 Docker Container Lifecycle

| State | Description |
|-------|-------------|
| **Created** | Container created but not started yet (via `docker create`). |
| **Running** | Container is actively executing its processes (via `docker run`). |
| **Paused** | All processes are temporarily frozen (via `docker pause`). Resume with `docker unpause`. |
| **Stopped** | Container is stopped; no processes running, but data persists (via `docker stop`). |
| **Exited** | Main process completed or was manually stopped. Check with `docker ps -a`. |
| **Dead** | Rare state caused by internal errors. Requires manual cleanup. |

---

## Docker Daemon vs Docker Engine

### Docker Daemon

The background service running on your system. It manages images, containers, volumes, and networks, and listens to Docker API requests.

### Docker Engine

The complete Docker platform — includes the Daemon, CLI, REST API, container runtime (`containerd`), and build tools.

---

## ⚡ Essential Docker Commands

```bash
docker version              # Check Docker version
docker ps                   # List running containers
docker ps -a                # List all containers (including stopped)
docker ps -q                # List only container IDs of running containers
docker images               # List downloaded images
docker rmi <image>          # Remove an image
docker run <image>          # Run a container
docker stop <ID>            # Stop a container
docker rm <ID>              # Remove a container
docker rm -rf <ID>          # Stop and remove a container forcefully
docker inspect <container>  # Detailed info about a container
docker logs <container>     # View container logs
docker exec -it <container> bash  # Access a running container's shell
```

---

## ➡️ Next

[02 — Dockerfile & Images →](../02-dockerfile/README.md)

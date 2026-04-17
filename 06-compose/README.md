# 06 — Docker Compose

[← Back to Main README](../README.md)

---

## 📋 Table of Contents

- [What is Docker Compose?](#-what-is-docker-compose)
- [docker-compose.yml Structure](#-docker-composeyml-structure)
- [Key Directives Explained](#-key-directives-explained)
- [Essential Compose Commands](#-essential-compose-commands)
- [Hands-on Project](#-hands-on-project)

---

## 🧩 What is Docker Compose?

Docker Compose is a tool for **defining and managing multi-container Docker applications** using a simple YAML configuration file (`docker-compose.yml`).

Instead of running multiple `docker run` commands with different flags, Compose lets you describe the entire application stack in one file and manage it with a single command.

**Key benefits:**
- Define all services, networks, and volumes in one place
- Start, stop, and rebuild the entire stack with one command
- Automatically creates a shared network for all services
- Handles service dependencies and startup order

---

## 📄 docker-compose.yml Structure

```yaml
version: "<version>"             # Compose file format version (e.g., "3.8")

services:
  <service_name>:
    image: <image_name>          # Use an existing Docker image
    build: <context>             # Or build from a Dockerfile
    container_name: <name>       # Custom container name
    ports:
      - "<host_port>:<container_port>"
    environment:
      - <KEY>=<VALUE>
    volumes:
      - <host_path>:<container_path>
    networks:
      - <network_name>
    depends_on:
      - <another_service>        # Start order dependency
    restart: <policy>            # always | unless-stopped | on-failure
    command: <cmd>               # Override the default CMD
    healthcheck:
      test: ["CMD", "<command>"]
      interval: <time>
      timeout: <time>
      retries: <count>

volumes:
  <volume_name>:                 # Named volumes

networks:
  <network_name>:
    driver: <driver>             # bridge | overlay
```

---

## 🔑 Key Directives Explained

### `services`

Defines each container in your application. Each service becomes a running container with its own configuration.

### `image` vs `build`

- `image` — pulls an existing image from a registry.
- `build` — builds an image from a local Dockerfile.

```yaml
# Using an existing image
image: postgres:15

# Building from a Dockerfile
build:
  context: ./app
  dockerfile: Dockerfile
```

### `ports`

Maps host ports to container ports. Format: `"host:container"`.

```yaml
ports:
  - "8080:80"    # Host 8080 → Container 80
  - "5432:5432"  # PostgreSQL
```

### `environment`

Sets environment variables in the container.

```yaml
environment:
  - POSTGRES_USER=admin
  - POSTGRES_PASSWORD=secret
  - POSTGRES_DB=mydb
```

### `volumes`

Mounts volumes for data persistence.

```yaml
volumes:
  - postgres-data:/var/lib/postgresql/data   # Named volume
  - ./config:/app/config                      # Bind mount
```

### `depends_on`

Controls startup order — the listed services start before this one. Note: `depends_on` waits for the container to start, not for the application inside it to be ready. Use `healthcheck` for readiness.

```yaml
depends_on:
  - db
  - redis
```

### `restart`

Defines the container restart policy.

| Policy | Behavior |
|--------|----------|
| `no` | Never restart (default) |
| `always` | Always restart, including on daemon start |
| `unless-stopped` | Restart unless manually stopped |
| `on-failure` | Restart only on non-zero exit codes |

### `networks`

Attaches the service to one or more networks. Services on the same network can communicate using their service names as hostnames.

---

## ⚡ Essential Compose Commands

```bash
# Start all services (detached mode)
docker compose up -d

# Start and rebuild images
docker compose up -d --build

# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# View logs for all services
docker compose logs

# Follow logs for a specific service
docker compose logs -f <service_name>

# List running services
docker compose ps

# Execute a command in a running service
docker compose exec <service_name> bash

# Rebuild a specific service
docker compose build <service_name>
```

---

## 🧪 Hands-on Project

See Docker Compose in action with a real multi-container application:

**Docker Compose Word Counter** — a multi-service app using Compose to connect a web frontend and a backend service.

👉 [github.com/bhuvan-raj/Docker-Compose-WordCounter](https://github.com/bhuvan-raj/Docker-Compose-WordCounter)

---

## ✅ Conclusion

You've completed the Docker Zero to Hero guide! Here's a quick recap of what you've covered:

| Section | Key Takeaway |
|---------|-------------|
| Introduction | Containers are lightweight, isolated units managed by Docker |
| Dockerfile & Images | Dockerfiles are blueprints; images are the built output |
| Networking | Containers need networks to communicate; bridge is the default |
| Storage | Use volumes for production data persistence; bind mounts for development |
| Registry | Tag images with your username and push to Docker Hub |
| Compose | Manage multi-container apps declaratively with a single YAML file |

**What's next?** Explore **Kubernetes** for orchestrating containers at scale.

[← Back to Main README](../README.md)

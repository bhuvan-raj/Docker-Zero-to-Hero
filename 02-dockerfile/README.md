# 02 — Dockerfile & Images

[← Back to Main README](../README.md)

---

## 📋 Table of Contents

- [What is a Docker Image?](#-what-is-a-docker-image)
- [What is a Dockerfile?](#-what-is-a-dockerfile)
- [Dockerfile Instructions](#-dockerfile-instructions)
- [Dockerfile Example](#-dockerfile-example)

---

## 🖼️ What is a Docker Image?

A Docker image is a **read-only template** that consists of an application along with its libraries and dependencies. It is used to create containers.

Think of an image as a blueprint — the container is the running instance created from that blueprint.

---

## 📄 What is a Dockerfile?

A Dockerfile is a **plain text file** containing the instructions to build a Docker image. Docker reads the file top-to-bottom and executes each instruction in sequence to assemble the image.

---

## 🧱 Dockerfile Instructions

### 1. `FROM`

Specifies the base image to build upon. Almost every Dockerfile starts with `FROM`.

```dockerfile
FROM ubuntu:22.04
FROM python:3.9-slim
```

### 2. `WORKDIR`

Sets the working directory for all subsequent instructions. Acts like `cd` inside the container.

```dockerfile
WORKDIR /app
```

### 3. `COPY`

Copies files and directories from the host machine into the container. Used for transferring static files like application code.

```dockerfile
COPY . .
COPY requirements.txt /app/requirements.txt
```

### 4. `ADD`

Similar to `COPY`, but also supports:
- Copying from remote URLs
- Automatically extracting `.tar.gz` archives

```dockerfile
ADD https://example.com/file.tar.gz /app/
```

> Prefer `COPY` for simple file transfers; use `ADD` only when you need its extra capabilities.

### 5. `LABEL`

Adds metadata to an image as key-value pairs. Non-executable — does not affect runtime behavior.

```dockerfile
LABEL maintainer="bhuvan@example.com"
LABEL version="1.0"
```

Inspect labels with: `docker inspect <image-id>`

### 6. `ENV`

Sets environment variables inside the image that are available at runtime.

```dockerfile
ENV APP_PORT=8000
ENV DB_HOST="database" APP_ENV="production"
```

> Use `ENV` for non-sensitive configuration. For secrets, use Docker secrets or a vault solution — never `ENV`.

### 7. `RUN`

Executes commands **during the image build** process. Commonly used for installing dependencies.

```dockerfile
RUN apt-get update && apt-get install -y curl
RUN pip install -r requirements.txt
```

> Combine multiple `RUN` commands with `&&` to reduce image layers.

### 8. `CMD`

Defines the **default command** that runs when the container starts. Can be overridden at runtime.

```dockerfile
CMD ["python3", "app.py"]
```

### 9. `ENTRYPOINT`

Similar to `CMD`, but the command is **always executed** — it cannot be overridden at runtime (only appended to). Used for fixed executable commands.

```dockerfile
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```

> `ENTRYPOINT` defines the process; `CMD` provides default arguments to it.

### 10. `EXPOSE`

Declares the port the container listens on. This is **documentation only** — it does not publish the port.

```dockerfile
EXPOSE 8080
```

Publish the port when running the container: `docker run -p 8080:8080 my-image`

### 11. `USER`

Specifies the user under which the container should run. Improves security by avoiding running as root.

```dockerfile
USER appuser
```

### 12. `VOLUME`

Creates a mount point for data persistence. Ensures a directory's data is not lost when the container stops.

```dockerfile
VOLUME ["/app/data"]
```

### 13. `HEALTHCHECK`

Tells Docker how to test whether the container is still working correctly.

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:5000 || exit 1
```

| Option | Default | Description |
|--------|---------|-------------|
| `--interval` | 30s | How often to run the check |
| `--timeout` | 30s | Max time to wait for a response |
| `--start-period` | 0s | Grace period for app initialization |
| `--retries` | 3 | Failures before marking container unhealthy |

### 14. `ARG`

Defines a **build-time variable** passed via `--build-arg`. Unlike `ENV`, `ARG` values are not present in the final image.

```dockerfile
ARG APP_VERSION=1.0.0
RUN wget https://example.com/myapp-v${APP_VERSION}.tar.gz
```

```bash
docker build -t my-app --build-arg APP_VERSION=2.0.0 .
```

### 15. `ONBUILD`

Specifies a trigger instruction that runs when this image is used as a base in another Dockerfile. Useful for creating reusable parent images.

```dockerfile
ONBUILD COPY . /app
ONBUILD RUN pip install -r requirements.txt
```

---

## 📝 Dockerfile Example

```dockerfile
# Base image
FROM python:3.9-slim

# Metadata
LABEL maintainer="Bhuvan <bhuvan@example.com>"

# Environment variables
ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

# Copy source code
COPY . .

# Install dependencies
RUN pip install -r requirements.txt

# Expose application port
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
  CMD curl -f http://localhost:5000 || exit 1

# Default command
CMD ["python3", "app.py"]
```

---

## ➡️ Next

[03 — Docker Networking →](../03-networking/README.md)

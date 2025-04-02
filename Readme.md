# Docker Guide - README

## Table of Contents
1. [What are Containers?](#what-are-containers)
2. [Containers vs Virtual Machines](#containers-vs-virtual-machines)
3. [What is Docker?](#what-is-docker)
4. [Installing Docker](#installing-docker)
5. [Docker Architecture](#docker-architecture)
6. [Essential Docker Commands](#essential-docker-commands)
7. [What is a Dockerfile?](#what-is-a-dockerfile)
8. [Writing a Dockerfile](#writing-a-dockerfile)
9. [Dockerfile Example](#dockerfile-example)
10. [Hands-on Project: Dockerfile](#hands-on-project-dockerfile)
11. [Other Docker Tools](#other-docker-tools)
12. [What is Docker Compose?](#what-is-docker-compose)
13. [Docker Compose Format](#docker-compose-format)
14. [Hands-on Project: Docker Compose](#hands-on-project-docker-compose)

---

## 1. What are Containers?
Containers are lightweight, portable environments that package applications with their dependencies, ensuring consistency across different computing environments.

## 2. Containers vs Virtual Machines
| Feature            | Containers | Virtual Machines |
|--------------------|-----------|-----------------|
| Isolation         | Process-Level | Full OS-Level |
| Startup Speed    | Fast (Seconds) | Slow (Minutes) |
| Size             | MBs | GBs |
| Performance      | Near Native | Overhead Due to Hypervisor |
| Portability      | High | Medium |

## 3. What is Docker?
Docker is a platform that enables developers to build, run, and share containerized applications easily.

## 4. Installing Docker
### **Linux (Fedora example)**
```bash
sudo dnf install docker
sudo systemctl start docker
```
### **Windows & Mac** 
- Download from [Docker Official Site](https://www.docker.com/)
- Follow the installation steps.

## 5. Docker Architecture
![Alt Text](assets/docker.png)
 
- **Docker Client:** Sends commands to the Docker daemon.
- **Docker Daemon:** Runs on the host machine and manages containers.
- **Docker Images:** Blueprints for containers.
- **Docker Registry:** Stores and distributes images (Docker Hub).
- **Containers:** Running instances of Docker images.

## 6. Essential Docker Commands
```bash
docker version         # Check Docker version
docker ps             # List running containers
  - docker ps -a      # List all containers
  - docker ps -q      # List container id only of the running containers   
docker images         # List downloaded images
docker rmi            # To remove an image
docker run            # Run a container
docker stop <ID>      # Stop a container
docker rm <ID>        # Remove a container
```

## 7. What is a Dockerfile?
A Dockerfile is a script containing instructions to automate the building of Docker images.

## 8. Writing a Dockerfile
### **Basic Dockerfile Structure:**
```dockerfile
- FFROM

    Specifies the base image to be used for building the container.

    Every Dockerfile must start with this instruction.

- LABEL

    Adds metadata such as the maintainer, version, and description of the image.

- ENV

    Defines environment variables that can be used within the container.

    Helps in setting up configurations dynamically.

- WORKDIR

    Sets the working directory inside the container.

    Ensures that all subsequent commands run within this directory.

- COPY

    Copies files and directories from the host machine to the container.

    Used for transferring static files like application code.

- ADD

    Similar to COPY but also allows adding files from remote URLs.

    Can automatically extract .tar.gz archives.

- RUN

    Executes commands during the image build process.

    Commonly used for installing dependencies and setting up configurations.

- EXPOSE

    Declares the ports on which the container will listen.

    Does not actually publish the port, it is just a documentation step.

- CMD

    Defines the default command that runs when the container starts.

    Can be overridden at runtime.

- ENTRYPOINT

    Similar to CMD, but ensures that the specified command always runs.

    Commonly used for defining fixed executable commands.

- USER

    Specifies the user under which the container should run.

    Helps improve security by avoiding running as root.

- VOLUME

    Creates a mount point for data persistence.

    Ensures that certain directories are not deleted when the container stops.

- HEALTHCHECK

    Defines a command to check the health of the running container.

    Helps detect failures and restart the container if needed.

- ARG

    Defines build-time variables that can be passed while building the image.

    Unlike ENV, these values are not retained in the final image.

- ONBUILD

    Specifies a trigger that runs when the image is used as a base image in another Dockerfile.

    Useful for creating parent images with predefined build steps.
```

## 9. Dockerfile Example
```dockerfile
# Base Image
FROM python:3.9-slim

# Metadata
LABEL maintainer="Bhuvan <bhuvan@example.com>"

# Environment Variables
ENV APP_HOME=/usr/src/app
WORKDIR $APP_HOME

# Copying Files
COPY . .

# Installing Dependencies
RUN pip install -r requirements.txt

# Exposing Port
EXPOSE 5000

# Healthcheck
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD curl -f http://localhost:5000 || exit 1

# Default Command
CMD ["python3", "app.py"]

```


## 10. Other Docker Tools
- `docker inspect <container>` - Detailed info about a container.
- `docker logs <container>` - View logs.
- `docker exec -it <container> bash` - Access a running container.

## 11. What is Docker Compose?
Docker Compose is a tool for defining and managing multi-container Docker applications using a simple YAML configuration file (docker-compose.yml). 
It allows users to start, stop, and manage multiple interconnected containers with a single command.

## 12. Docker Compose Format
```yaml
version: "<version>"  # Defines the Docker Compose version (e.g., "3.8")

services:
  <service_name>:      # Define a service (container)
    image: <image_name>  # Use an existing Docker image
    build: <context>     # Build from a Dockerfile (optional)
    container_name: <name>  # Custom container name
    ports:
      - "<host_port>:<container_port>"  # Map host to container ports
    environment:
      - <KEY>=<VALUE>  # Define environment variables
    volumes:
      - <host_path>:<container_path>  # Mount volumes for data persistence
    networks:
      - <network_name>  # Connect to a network
    depends_on:
      - <another_service>  # Define service dependencies
    restart: <policy>  # Restart policy (always, unless-stopped, on-failure)
    command: <cmd>  # Override the default command
    healthcheck:     # Define a health check
      test: ["CMD", "<command>"]
      interval: <time>
      timeout: <time>
      retries: <count>

volumes:
  <volume_name>:  # Define persistent volumes

networks:
  <network_name>:  # Define custom networks
    driver: <network_driver>  # Network driver (e.g., bridge, overlay)

---

## Conclusion
This README provides a structured guide to Docker, from basics to hands-on projects. Explore further with **Docker Networking, Volumes, and Kubernetes!**


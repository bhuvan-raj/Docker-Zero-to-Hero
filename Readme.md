# Docker Guide - README


##  What are Containers?
Containers are lightweight, portable environments that package applications with their dependencies, ensuring consistency across different computing environments.

##  Containers vs Virtual Machines

![Alt Text](assets/docker1.png)


| Feature            | Containers | Virtual Machines |
|--------------------|-----------|-----------------|
| Isolation         | Process-Level | Full OS-Level |
| Startup Speed    | Fast (Seconds) | Slow (Minutes) |
| Size             | MBs | GBs |
| Performance      | Near Native | Overhead Due to Hypervisor |
| Portability      | High | Medium |

##  What is Docker?
Docker is a platform that enables developers to build, run, and share containerized applications easily.

##  Installing Docker
### **Linux (Fedora example)**
```bash
sudo dnf install docker
sudo systemctl start docker
```
### **Windows & Mac** 
- Download from [Docker Official Site](https://www.docker.com/)
- Follow the installation steps.

##  Docker Architecture
![Alt Text](assets/docker.png)
 
- **Docker Client:** Sends commands to the Docker daemon.
- **Docker Daemon:** Runs on the host machine and manages containers.
- **Docker Images:** Blueprints for containers.
- **Docker Registry:** Stores and distributes images (Docker Hub).
- **Containers:** Running instances of Docker images.

## Enable Normal User to Use Docker
```bash
sudo usermod -aG docker username
```
##  Docker Container Lifecycles

- 1. Created
    • The container has been created, but it hasn’t started yet.
    • State: CREATED
    • Example: A container is created using docker create, but it hasn't been run yet.
- 2. Running
    • The container is currently running.
    • State: RUNNING
    • Example: After running a container using docker run, it enters this state and begins executing its commands.
- 3. Paused
    • The container is temporarily paused, meaning all its processes are stopped, but the container is still running.
    • State: PAUSED
    • Example: A container can be paused using docker pause <container_name_or_id> and later resumed with docker unpause.
- 4. Stopped
    • The container is stopped and no longer running.
    • State: STOPPED
    • Example: A container can be stopped using docker stop <container_name_or_id>. It is no longer executing any processes, but its data still exists.
- 5. Exited
    • The container has stopped running, either because the main process in the container completed or was manually stopped.
    • State: EXITED
    • Example: A container that runs a short-lived process and finishes execution will exit. You can check this state using docker ps -a.
- 6. Dead
    • This state is rare. A container is in this state when it encounters an internal error or when it becomes unresponsive.
    • State: DEAD
    • Example: A container in a "dead" state requires manual intervention for cleanup.

## Docker Registry
A Docker Registry is a storage and distribution system for Docker images. It holds images and allows users to upload (push) or download (pull) images. A registry can be private or public and is used to store and manage images for deployment in containers.
    • A registry can be hosted on your own infrastructure or a cloud provider.
    • Docker Hub is the default public registry for Docker images.
    • Docker images are stored as repositories in the registry.
## Docker Hub
Docker Hub is the default public Docker registry provided by Docker Inc. It is a cloud-based repository where you can store and share Docker images. It is the largest collection of Docker images in the world and is widely used by developers to find and use pre-built images.
    • Docker Hub is free for public repositories (private repositories require a paid account).
    • It contains images for popular software, frameworks, and tools that can be pulled and used easily.
    • You can create your own Docker Hub account to manage personal repositories.

## Docker Daemon vs Docker Engine
## Docker Daemon
The background service that runs on your system. It manages images, containers, volumes, networks. Listens to Docker API requests.
## Docker Engine
The complete Docker platform including the Daemon, CLI, REST API, container runtime (containerd), and build tools.

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

## Docker Networking
## Docker networking allows containers to communicate:
    • With each other
    • With the host machine
    • With the outside world (like the internet)
      
## Why Do Containers Need Networks?
Containers are isolated — they need a network to:
    • Talk to databases or services
    • Serve websites or APIs to users
    • Download updates or dependencies from the internet

## Docker Network Types
 ---
 Bridge (default)
    • Default network for standalone containers.
    • Containers can communicate using container names (DNS resolution).
    • Has outbound internet access (via NAT).
   Host
    • Container shares the host’s network stack.
    • No isolation — useful for performance but less secure.
    • No port mapping needed (uses host ports directly).
  None
    • Container is completely isolated from all networks.
    • No external or inter-container communication.
  Overlay
    • Used for multi-host container communication (requires Swarm).
    • Enables distributed networks across Docker nodes.
  Macvlan
    • Assigns a MAC address to each container.
    • Containers appear as physical devices on the network.
    • Useful for direct network access like DHCP.
--- 
The Bridge network is the default network driver used when you don't specify a network while starting a container. It’s designed for containers running on the same Docker host to communicate with each other.

## Reserved IPs in Bridge Network
---
In a bridge network cidr 172.17.0.0/16, the following are reserved:
IP
172.17.0.0	 - Network address (reserved)
172.17.0.1	 - Gateway (used by bridge interface on host)
172.17.0.2 onwards	Assigned to containers
172.17.255.255	 - Broadcast address (reserved)
---



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


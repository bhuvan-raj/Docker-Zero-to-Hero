
# 05 — Docker Registries (Docker Hub, ECR, GHCR)

[← Back to Main README](../README.md)

---

## 📋 Table of Contents

* [Docker Registry vs Docker Hub](#-docker-registry-vs-docker-hub)
* [Docker Hub](#-docker-hub)
* [AWS ECR (Manual Console Method)](#-aws-ecr-manual-console-method)
* [GitHub Container Registry (GHCR)](#-github-container-registry-ghcr)
* [Key Concepts](#-key-concepts)

---

# 📦 Docker Registry vs Docker Hub

|            | Docker Registry                   | Docker Hub              |
| ---------- | --------------------------------- | ----------------------- |
| What it is | Generic storage system for images | Default public registry |
| Hosting    | Self-hosted / cloud               | Managed by Docker       |
| Access     | Public / Private                  | Public (free) / Private |
| Default    | ❌ No                              | ✅ Yes                   |

---

# 🐳 Docker Hub

## 📦 What is Docker Hub?

**Docker Hub** is the default public registry used by Docker to store and share container images.

---

## ✅ Prerequisites

* Docker installed
* Docker Hub account

---

## Step 1 — Create Account

1. Go to [https://hub.docker.com](https://hub.docker.com)
2. Sign up and verify email
3. Note your username

---

## Step 2 — Create Repository

1. Click **Create Repository**
2. Name → `my-nginx-app`
3. Visibility → Public
4. Click **Create**

---

## Step 3 — Create Personal Access Token (PAT)

1. Go to **Account Settings → Security**
2. Click **New Access Token**
3. Permissions:

   * Read, Write, Delete
4. Copy token

---

## Step 4 — Login via CLI

```bash
docker login
```

* Username → Docker Hub username
* Password → PAT

---

## Step 5 — Build Image

```bash
docker build -t my-nginx-app .
```

---

## Step 6 — Tag Image

```bash
docker tag my-nginx-app <dockerhub-username>/my-nginx-app:latest
```

---

## Step 7 — Push Image

```bash
docker push <dockerhub-username>/my-nginx-app:latest
```

---

## Step 8 — Verify

```bash
docker pull <dockerhub-username>/my-nginx-app:latest
```

---

# ☁️ AWS ECR (Manual Console Method)

## 📦 What is ECR?

**Amazon Web Services Elastic Container Registry (ECR)** is a secure, private Docker registry.

---

## ✅ Prerequisites

* AWS account
* Docker installed
* IAM permissions

---

## Step 1 — Create Repository (Console)

1. Go to AWS Console
2. Open **ECR**
3. Click **Create repository**
4. Name → `my-nginx-app`
5. Keep Private
6. Click Create

---

## Step 2 — View Push Commands

* Open repository
* Click **View push commands**

---

## Step 3 — Authenticate Docker

```bash
aws ecr get-login-password --region ap-south-1 | \
docker login --username AWS --password-stdin <account-id>.dkr.ecr.ap-south-1.amazonaws.com
```

---

## Step 4 — Build Image

```bash
docker build -t my-nginx-app .
```

---

## Step 5 — Tag Image

```bash
docker tag my-nginx-app:latest \
<account-id>.dkr.ecr.ap-south-1.amazonaws.com/my-nginx-app:latest
```

---

## Step 6 — Push Image

```bash
docker push <account-id>.dkr.ecr.ap-south-1.amazonaws.com/my-nginx-app:latest
```

---

## Step 7 — Verify

* Go to ECR → Repository
* Check image tag `latest`

---

# 🐙 GitHub Container Registry (GHCR)

## 📦 What is GHCR?

**GitHub Container Registry (GHCR)** stores Docker images integrated with repositories.

---

## ✅ Prerequisites

* GitHub account
* Docker installed

---

## Step 1 — Create PAT in GitHub

1. Go to **Settings → Developer Settings**
2. Personal Access Tokens → **Generate new token**
3. Select:

   * `read:packages`
   * `write:packages`
   * `delete:packages`
4. Copy token

---

## Step 2 — Login to GHCR

```bash
echo <YOUR_PAT> | docker login ghcr.io -u <github-username> --password-stdin
```

---

## Step 3 — Build Image

```bash
docker build -t my-nginx-app .
```

---

## Step 4 — Tag Image

```bash
docker tag my-nginx-app ghcr.io/<github-username>/my-nginx-app:latest
```

---

## Step 5 — Push Image

```bash
docker push ghcr.io/<github-username>/my-nginx-app:latest
```

---

## Step 6 — Verify

* Go to GitHub → Profile → Packages
* Check your image

---

# 🧠 Key Concepts

| Term         | Description                 |
| ------------ | --------------------------- |
| Docker Image | Application blueprint       |
| Repository   | Storage location            |
| Tag          | Version identifier          |
| Registry     | Image storage service       |
| PAT          | Secure authentication token |

---

# 🔁 Comparison

| Feature    | Docker Hub     | ECR           | GHCR           |
| ---------- | -------------- | ------------- | -------------- |
| Default    | ✅ Yes          | ❌ No          | ❌ No           |
| Visibility | Public/Private | Private       | Public/Private |
| Auth       | PAT            | AWS login     | GitHub PAT     |
| Best Use   | General        | AWS workloads | CI/CD          |

---

## ➡️ Next

[06 — Docker Compose →](../06-compose/README.md)

---

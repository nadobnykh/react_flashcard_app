## Docker CLI Basics

### Start a container from an image and open a shell

`docker run -it IMAGE_NAME bash`

---

### List all running containers

`docker ps`

---

### List all containers (running and stopped)

`docker ps -a`

---

### Build a Docker image from a Dockerfile

`docker build -t IMAGE_NAME .`

---

### Tag an existing Docker image

`docker tag SOURCE_IMAGE TARGET_IMAGE`

---

### Stop a running container

`docker stop CONTAINER_ID`

---

### Remove a container

`docker rm CONTAINER_ID`

---

### Remove an image

`docker rmi IMAGE_NAME`

---

### Show all images on the system

`docker images`

---

### Remove all stopped containers

`docker container prune`

---

### Execute a command in a running container

`docker exec -it CONTAINER_ID COMMAND`

---

## Dockerfile Basics

### Define base image

`FROM node:20`

---

### Set working directory inside image

`WORKDIR /app`

---

### Copy files into image

`COPY . .`

---

### Install dependencies using shell command

`RUN npm install`

---

### Define command to run container

`CMD ["npm", "start"]`

---

### Define environment variable

`ENV PORT=3000`

---

### Expose port at runtime

`EXPOSE 3000`

---

## Docker Compose Basics

### Start services defined in `docker-compose.yml`

`docker compose up`

---

### Start services in background

`docker compose up -d`

---

### Stop services

`docker compose down`

---

### Rebuild images and start services

`docker compose up --build`

---

### Show running services

`docker compose ps`

---

### View logs of all services

`docker compose logs`

---

### View logs of a specific service

`docker compose logs SERVICE_NAME`

---

### Execute command in a running service container

`docker compose exec SERVICE_NAME COMMAND`

---

## compose.yml Essentials

### Define a service using image

```yaml
services:
  web:
    image: nginx
```

---

### Build image from Dockerfile

```yaml
services:
  app:
    build: .
```

---

### Map ports between host and container

```yaml
ports:
  - "8080:80"
```

---

### Mount a volume

```yaml
volumes:
  - .:/app
```

---

### Set environment variables for a service

```yaml
environment:
  - NODE_ENV=production
```

---

### Define named volumes

```yaml
volumes:
  db-data:
```

---

### Connect services via custom network

```yaml
networks:
  - backend
```

---

### Set working directory for a service

```yaml
working_dir: /usr/src/app
```

---

### Override default command

```yaml
command: ["npm", "run", "dev"]
```

---










## Docker CLI Basics

### Start a container from an image and open a shell

`docker run -it IMAGE_NAME bash`
*→ Used in: console*

---

### List all running containers

`docker ps`
*→ Used in: console*

---

### List all containers (including stopped)

`docker ps -a`
*→ Used in: console*

---

### Build an image from Dockerfile in current directory

`docker build -t myapp:latest .`
*→ Used in: console*

---

### Tag an image for pushing to a registry

`docker tag myapp:latest myregistry/myapp:prod`
*→ Used in: console*

---

### Push an image to Docker Hub or another registry

`docker push myregistry/myapp:prod`
*→ Used in: console*

---

### Stop a running container

`docker stop CONTAINER_ID`
*→ Used in: console*

---

### Remove all stopped containers

`docker container prune`
*→ Used in: console*

---

### Execute command inside running container

`docker exec -it CONTAINER_ID bash`
*→ Used in: console*

---

### Start container with volume and port

`docker run -v $PWD:/app -p 3000:3000 node:20`
*→ Used in: console*

---

## Dockerfile Basics

### Use base image

`FROM node:20-alpine`
*→ Used in: Dockerfile*

---

### Set working directory

`WORKDIR /app`
*→ Used in: Dockerfile*

---

### Copy source files

`COPY . .`
*→ Used in: Dockerfile*

---

### Run command during image build

`RUN npm ci`
*→ Used in: Dockerfile*

---

### Expose port (informational only)

`EXPOSE 3000`
*→ Used in: Dockerfile*

---

### Define default container command

`CMD ["node", "server.js"]`
*→ Used in: Dockerfile*

---

### Define environment variable

`ENV NODE_ENV=production`
*→ Used in: Dockerfile*

---

### Use multi-stage build for smaller image

```Dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
```

*→ Used in: Dockerfile*

---

## Docker Compose Basics

### Start services

`docker compose up`
*→ Used in: console*

---

### Start in detached mode

`docker compose up -d`
*→ Used in: console*

---

### Stop and remove containers, networks, volumes

`docker compose down -v`
*→ Used in: console*

---

### Rebuild images and restart services

`docker compose up --build`
*→ Used in: console*

---

### Show logs from a service

`docker compose logs web`
*→ Used in: console*

---

### Execute shell inside service container

`docker compose exec app sh`
*→ Used in: console*

---

## docker-compose.yml Basics

### Define a service using image

```yaml
services:
  web:
    image: nginx
```

*→ Used in: docker-compose.yml*

---

### Build from local Dockerfile

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
```

*→ Used in: docker-compose.yml*

---

### Map ports

```yaml
ports:
  - "8080:80"
```

*→ Used in: docker-compose.yml*

---

### Mount code into container

```yaml
volumes:
  - .:/usr/src/app
```

*→ Used in: docker-compose.yml*

---

### Define environment variables

```yaml
environment:
  - NODE_ENV=production
```

*→ Used in: docker-compose.yml*

---

### Use secrets in production

```yaml
secrets:
  db_password:
    file: ./secrets/db_password.txt
```

*→ Used in: docker-compose.yml*

---

### Limit container resources (e.g., memory)

```yaml
deploy:
  resources:
    limits:
      memory: 512M
```

*→ Used in: docker-compose.yml (Swarm mode)*

---

### Configure health check

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
```

*→ Used in: docker-compose.yml*

---












## Docker Healthcheck (Basics + Production)

### Add a health check that runs a shell command periodically inside the container

```Dockerfile
HEALTHCHECK CMD curl --fail http://localhost:3000 || exit 1
```

*→ Used in: Dockerfile*

---

### Define a health check with custom interval and timeout in a Dockerfile

```Dockerfile
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD curl --fail http://localhost:3000 || exit 1
```

*→ Used in: Dockerfile*

---

### Add a health check for a service using curl in Compose

```yaml
services:
  app:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
```

*→ Used in: docker-compose.yml*

---

### What does Docker consider a healthy container?

A container is healthy if the last health check passed (exit code 0).
*→ Conceptual*

---

### What happens when a container is unhealthy?

Docker marks it as `unhealthy`; you can use this status in orchestration logic.
*→ Conceptual / used in: Docker CLI, Swarm, Kubernetes*

---

### Show container health status

`docker inspect --format='{{json .State.Health}}' CONTAINER_ID`
*→ Used in: console*

---

### Automatically restart unhealthy containers in Compose (Swarm only)

```yaml
deploy:
  restart_policy:
    condition: on-failure
```

*→ Used in: docker-compose.yml (Swarm mode only)*

---

## 🔧 General Docker CLI

### Build Docker image from current directory

`docker build -t myapp:latest .`
*→ Used in: Console*

---

### Run container interactively with shell

`docker run -it myapp /bin/sh`
*→ Used in: Console*

---

### View running containers

`docker ps`
*→ Used in: Console*

---

### Stop a running container

`docker stop CONTAINER_ID`
*→ Used in: Console*

---

### Remove an image

`docker rmi myapp:latest`
*→ Used in: Console*

---

### Show container health info

`docker inspect --format='{{json .State.Health}}' CONTAINER_ID`
*→ Used in: Console*

---

## 📦 Dockerfile Essentials

### Use lightweight base image

`FROM node:20-alpine`
*→ Used in: Dockerfile*

---

### Set working directory in image

`WORKDIR /app`
*→ Used in: Dockerfile*

---

### Copy all local files into image

`COPY . .`
*→ Used in: Dockerfile*

---

### Install dependencies without dev tools

`RUN npm ci --omit=dev`
*→ Used in: Dockerfile*

---

### Expose port for runtime

`EXPOSE 3000`
*→ Used in: Dockerfile*

---

### Define startup command

`CMD ["node", "dist/main.js"]`
*→ Used in: Dockerfile*

---

### Add health check for API

```Dockerfile
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
 CMD curl -f http://localhost:3000/health || exit 1
```

*→ Used in: Dockerfile*

---

## 🧩 docker-compose.yml - Services Overview

### Define services in Compose

```yaml
services:
  frontend:
    build: ./frontend
  backend:
    build: ./backend
```

*→ Used in: compose.yml*

---

### Use official PostgreSQL image with password

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: mysecret
```

*→ Used in: compose.yml*

---

### Redis service

```yaml
services:
  redis:
    image: redis:7
    ports:
      - "6379:6379"
```

*→ Used in: compose.yml*

---

### Grafana service with persistent volume

```yaml
services:
  grafana:
    image: grafana/grafana
    ports:
      - "3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana
volumes:
  grafana-data:
```

*→ Used in: compose.yml*

---

## 🔁 Ports, Volumes, Environment

### Map host to container ports

```yaml
ports:
  - "8080:3000"
```

*→ Used in: compose.yml*

---

### Mount current directory as volume

```yaml
volumes:
  - .:/usr/src/app
```

*→ Used in: compose.yml*

---

### Set multiple environment variables

```yaml
environment:
  NODE_ENV: production
  DB_HOST: db
  REDIS_HOST: redis
```

*→ Used in: compose.yml*

---

### Define named persistent volume

```yaml
volumes:
  pgdata:
```

*→ Used in: compose.yml*

---

## ✅ Health Checks and Conditions

### Health check for backend service

```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
  interval: 30s
  timeout: 5s
  retries: 3
```

*→ Used in: compose.yml*

---

### Only start frontend when backend is healthy

```yaml
depends_on:
  backend:
    condition: service_healthy
```

*→ Used in: compose.yml*

---

## 🛠️ Advanced Production Options

### Use multi-stage build (Next.js, Express)

```Dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm ci && npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
CMD ["node", "dist/main.js"]
```

*→ Used in: Dockerfile*

---

### Limit container resources (Swarm only)

```yaml
deploy:
  resources:
    limits:
      cpus: '0.5'
      memory: 512M
```

*→ Used in: compose.yml (Swarm only)*

---

### Auto-restart on failure

```yaml
restart: on-failure
```

*→ Used in: compose.yml*

---

### .dockerignore for smaller image

```
node_modules
dist
.env
Dockerfile
```

*→ Used in: .dockerignore*


---

## 🔐 TLS/SSL with NGINX in Docker (Reverse Proxy)

### Use NGINX official image as reverse proxy

```yaml
services:
  nginx:
    image: nginx:stable-alpine
```

*→ Used in: compose.yml*

---

### Copy custom NGINX config into container

```yaml
volumes:
  - ./nginx.conf:/etc/nginx/nginx.conf:ro
```

*→ Used in: compose.yml*

---

### Copy full cert chain and key into container

```yaml
volumes:
  - ./certs:/etc/nginx/certs:ro
```

*→ Used in: compose.yml*

---



### Expose ports 80 and 443 for reverse proxy

```yaml
ports:
  - "80:80"
  - "443:443"
```

*→ Used in: compose.yml*

---

### Secure backend behind reverse proxy only

Do **not** expose backend ports like `3000` in Compose
*→ Used in: compose.yml (omit `ports:` for backend)*

---

### Generate TLS cert locally with mkcert (dev only)

`mkcert -cert-file fullchain.pem -key-file privkey.pem example.com`
*→ Used in: Console*

---

### Use Let's Encrypt with certbot (production)

Use certbot to generate certs on host or in a separate container
*→ Used in: Console / production deployment scripts*







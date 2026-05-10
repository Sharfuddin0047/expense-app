# Production-Ready Expense Management System

A production-style full-stack Expense Management System built using React, Spring Boot, MySQL, Docker, Nginx, and AWS.

This project demonstrates real-world DevOps and deployment practices including:
- Docker containerization
- Multi-container orchestration
- Reverse proxy setup
- Health checks
- Persistent storage
- AWS EC2 deployment
- Linux-based deployment workflows

---

# Tech Stack

## Frontend
- React
- Vite
- Nginx

## Backend
- Spring Boot
- Java
- REST APIs

## Database
- MySQL 8

## DevOps & Deployment
- Docker
- Docker Compose
- AWS EC2
- Linux
- Nginx Reverse Proxy

---

# Features

- Full-stack expense management application
- Dockerized frontend and backend services
- Multi-container deployment using Docker Compose
- Nginx reverse proxy configuration
- Persistent MySQL storage using Docker volumes
- Health checks and service dependency management
- Environment-based runtime configuration
- Cloud deployment support on AWS EC2

---

# Project Architecture

```text
Client Request
      │
      ▼
   Nginx Proxy
      │
 ┌────┴────┐
 ▼         ▼
Frontend   Backend (Spring Boot)
(React)          │
                 ▼
              MySQL
```

---

# Docker Compose Services

| Service | Description |
|---|---|
| nginx | Reverse proxy and routing |
| walletapp-frontend | React frontend container |
| walletapp-backend | Spring Boot backend container |
| mysql | MySQL database container |

---

# DevOps Concepts Implemented

- Docker containerization
- Docker Compose orchestration
- Multi-container architecture
- Nginx reverse proxy setup
- Docker bridge networking
- Persistent Docker volumes
- Health check configuration
- Service dependency management
- AWS cloud deployment workflows
- Linux-based container deployment

---

# Folder Structure

```text
expense-app/
│
├── wallet-app/              # Spring Boot backend
├── walletapp/               # React frontend
├── nginx/
│   └── default.conf         # Nginx reverse proxy config
├── docker-compose.yml
└── README.md
```

---

# Getting Started

## Clone Repository

```bash
git clone https://github.com/Sharfuddin0047/expense-app.git
cd expense-app
```

---

# Run Application Using Docker Compose

```bash
docker compose up --build
```

---

# Access Application

| Service | URL |
|---|---|
| Frontend | http://localhost |
| Backend API | http://localhost/api |
| Health Check | http://localhost:1011/actuator/health |

---

# Environment Variables

Example backend configuration:

```env
DB_HOST=mysql
DB_PORT=3306
DB_NAME=wallet_app
DB_USER=root
DB_PASSWORD=your_password
SERVER_PORT=1011
```

---

# Docker Compose Overview

The application uses multiple containers managed through Docker Compose:

- MySQL database container
- Spring Boot backend container
- React frontend container
- Nginx reverse proxy container

Key configurations include:
- Health checks
- Persistent volumes
- Service dependencies
- Bridge networking
- Reverse proxy routing

---

# Deployment on AWS EC2

## Steps Performed

1. Created AWS EC2 instance
2. Installed Docker and Docker Compose
3. Cloned project repository
4. Built and started containers
5. Configured Nginx reverse proxy
6. Exposed application through EC2 public IP

---

# Security Improvements Planned

- Use `.env` files for secrets management
- Configure HTTPS with SSL/TLS
- Add GitHub Secrets integration
- Secure database credentials

---

# Future Improvements

- Jenkins CI/CD pipeline integration
- GitHub Actions automation
- Kubernetes deployment
- Monitoring with Prometheus & Grafana
- Centralized logging
- Auto-scaling deployment setup

---

# Author

## Sharfuddin

GitHub:
https://github.com/Sharfuddin0047

LinkedIn:
https://www.linkedin.com/in/sharfuddin-ali

```
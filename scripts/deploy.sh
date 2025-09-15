#!/bin/bash

echo "--- Starting Deployment ---"

# 1. Build and push Docker images (optional, for a registry)
# docker-compose build
# docker-compose push

# 2. Deploy on a remote server (example using docker-compose)
# Make sure you have SSH access and Docker installed on the server.
# The .env files must be present on the server.

# Example:
# ssh user@your-server.com 'cd /path/to/your/app && docker-compose pull && docker-compose up -d'

echo "--- Running Docker Compose ---"
docker-compose up --build -d

echo "--- Deployment Complete ---"
echo "Dashboard should be available at http://localhost:3000"
echo "Backend API should be available at http://localhost:5000"

#!/bin/bash

echo "Pulling Git Repo"
git pull

echo "Building App"
docker-compose up api caddy -d --build
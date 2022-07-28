#!/usr/bin/env bash

echo "Stopping container"
docker-compose down
echo "Fetching latest"
git pull --rebase
echo "Building latest Dockerfile"
docker-compose build
echo "Starting container"
docker-compose up -d
echo "Done"

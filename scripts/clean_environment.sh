#!/bin/bash

cd "$(dirname "$0")/.." || exit

# Check for running docker containers and stop them if they exist
if [ $( docker ps -a | wc -l ) -gt 1 ]; then
    echo docker stop $(docker container ls -q) && docker system prune -a -f
else
    echo "No docker containers running, skipping..."
fi

# Prune docker container and volumes
docker system prune -a -f
docker volume prune -f && docker volume ls -q -f dangling=true

# Check for dangling images
dangling_images=$(docker images -f "dangling=true" -q)

# If there are dangling images, remove them
if [[ ! -z "$dangling_images" ]]; then
    echo "Found dangling images. Removing..."
    docker rmi -f "$dangling_images"
else
    echo "No dangling images found, skipping..."
fi

# Remove PostgreSQL Database directories
sudo rm -rf postgres_data/
sudo rm -rf postgres_testing_data/

# Remove TypeScript Build Directories
sudo rm -rf api/dist/

echo "Done"
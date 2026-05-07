#!/bin/bash

echo "Starting CatShop application..."

docker-compose up -d

echo "Waiting for services..."
sleep 10

echo ""
echo "=========================================="
echo "CatShop is running!"
echo "=========================================="
echo "Frontend: http://localhost:3001"
echo "Backend:  http://localhost:3000"
echo "=========================================="
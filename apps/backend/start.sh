#!/bin/bash

echo "Installing dependencies..."
npm install

echo "Running Prisma migrations..."
npx prisma migrate dev --name init

echo "Generating Prisma client..."
npx prisma generate

echo "Starting the app..."
npm run start:dev
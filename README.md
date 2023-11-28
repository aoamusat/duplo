# Duplo API Service

Duplo lorem ipsum dolor sit amet inter dolor sit amet, consectetur adipiscing elit

## Table of Contents

- [Duplo API Service](#duplo-api-service)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Local Development](#local-development)
    - [1. Install Dependencies](#1-install-dependencies)
    - [2.  Set Environment Variables](#2--set-environment-variables)
    - [3. Run database migrations](#3-run-database-migrations)
    - [4. Run database seeds](#4-run-database-seeds)
    - [5. Run the application](#5-run-the-application)
  - [Dockerized Deployment](#dockerized-deployment)

## Prerequisites

- Node.js
- npm or yarn
- Docker (for Dockerized deployment)

## Local Development

### 1. Install Dependencies

```bash
# Using npm
npm install
```

### 2.  Set Environment Variables
Create a .env file in the root of your project and configure the necessary environment variables. Example:

```bash
PG_USERNAME=
PG_PASSWORD=
PG_DATABASE=
PG_HOST=
PG_PORT=
MONGO_URI=
PORT=
MONGO_USER=
MONGO_PASSWORD=
MONGO_DBNAME=
ENV_PROFILE=
```
### 3. Run database migrations
```bash
npx sequelize db:migrate
```
### 4. Run database seeds
Let's create some data for testing
```bash
npx sequelize db:seed:all
```
### 5. Run the application
```bash
npm start
# or
npm run dev # for development mode
```

## Dockerized Deployment
Make sure you have [docker]([https://docker](https://www.docker.com/)) installed
```bash
docker compose up
```
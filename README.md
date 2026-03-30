# Devop Full Stack Project

This repository contains a full stack demo app with a Node/Express backend and a React/Vite frontend.

## Local setup

1. Install dependencies:
   - `npm install`
2. Start the backend:
   - `npm run start-backend`
3. Start the frontend:
   - `npm run start-frontend`

## Backend

- Port: `4000`
- Routes:
  - `GET /api/todos`
  - `POST /api/todos`
  - `PATCH /api/todos/:id/toggle`
  - `DELETE /api/todos/:id`

## Frontend

- Runs on Vite development server.
- Connects to backend at `http://localhost:4000/api/todos`.

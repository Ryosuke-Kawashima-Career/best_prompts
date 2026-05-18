# Walkthrough

## Overview

This application is built using [Stack/Framework, e.g., FastAPI & React] to perform [Core Purpose, e.g., AI-driven SEO indexing analysis].

## How to Run

Follow these steps to run the application locally:

### 1. Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Docker Compose

Alternatively, you can run all services using:

```bash
docker compose up --build
```

## Verification

- **Backend API**: Open [http://localhost:8000/docs](http://localhost:8000/docs) to access Swagger UI.
- **Frontend App**: Open [http://localhost:5173](http://localhost:5173) in your browser.

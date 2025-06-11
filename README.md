# System Design Document: Task Management App

## 1. Overview

A lightweight task management application for a single user type (basic user) with authentication, CRUD functionality, and filtering for tasks based on priority and status.

---

## 2. Features

* User Signup and Login using JWT
* Create, Read, Update, Delete (CRUD) Tasks
* Filter Tasks by Priority and Status
* Responsive UI with TailwindCSS and DaisyUI

---

## 3. Architecture Overview


* Client (React + TailwindCSS)
* REST API (HTTP)
* Backend (Node.js + Express)
* Database (PostgreSQL)
* Docker used for local development and containerization of all components.

---

## 4. Tech Stack

* **Frontend**: React, TypeScript, TailwindCSS, DaisyUI
* **Backend**: Node.js, Express.js
* **Database**: PostgreSQL
* **Authentication**: JWT (access tokens)
* **Environment**: Docker Compose for multi-service orchestration

---

## 5. User Roles

* **Basic User**: Can sign up, log in, and manage their own tasks

---

## 6. Data Model

### User

```sql
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL
```

### Task

```sql
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  priority VARCHAR(50),
  status VARCHAR(50),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

---

## 7. Database Diagram

```text
┌────────────┐         ┌────────────┐
│   users    │         │   tasks    │
├────────────┤         ├────────────┤
│ id (PK)    │◄────────│ user_id (FK) │
│ email      │         │ id (PK)      │
│ password   │         │ title        │
│ created_at │         │ description  │
└────────────┘         │ priority     │
                       │ status       │
                       │ created_at   │
                       │ updated_at   │
                       └────────────┘
```

---

## 8. API Endpoints

### Auth

* `POST api/auth/signup` → Register user, return JWT
* `POST api/auth/login` → Authenticate user, return JWT

### Tasks (JWT required)

* `GET api/tasks?priority=high&status=todo` → Filtered list
* `POST api/tasks` → Create task
* `PUT api/tasks/:id` → Update task
* `DELETE api/tasks/:id` → Delete task

---

## 9. JWT Authentication

* JWT is issued at login and stored client-side
* Each protected route expects `Authorization: Bearer <token>` header

---

## 10. Docker Setup

* `frontend` service: React dev server
* `backend` service: Node.js with Express API
* `db` service: PostgreSQL with seed script and migrations

---

## 11. Environment Variables (.env Instructions)

To store secrets and configuration values securely, create a `.env` file in both frontend and backend root directories.

### `.env` for Backend

```
DB_USER=user
DB_PASS=123
DB_HOST=postgres
DB_PORT=5432
DB_NAME=my_db
JWT_SECRET=secret_key
JWT_EXPIRES_IN=1h
```

**Important**: Never commit `.env` files to version control. Add `.env` to your `.gitignore` file:

```
.env
```

---

## 12. Future Enhancements

* Token refresh and expiry handling
* Due dates and reminders
* User profile and settings
* Deployment setup (e.g., Vercel + Railway)
* Unit and integration tests

---

## 13. Security Considerations

* Passwords are hashed with bcrypt
* JWTs are signed with a secret key and verified on every protected request
* Input validation and error handling on both frontend and backend

---

## 14. Limitations

* Local only: not designed for production scalability yet
* No role-based access control (RBAC)
* No file uploads or real-time updates

---

## 15. Conclusion

This system design outlines a minimal but complete full-stack task manager application with local development and strong separation of concerns between frontend, backend, and database layers.

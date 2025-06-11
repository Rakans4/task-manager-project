# Task Management App

## 1. Overview

A lightweight task management application for a single user type (basic user) with authentication, CRUD functionality, and filtering for tasks based on priority and status.

---

## 2. Features

* User Signup and Login using JWT
* Create, Read, Update, Delete (CRUD) Tasks
* Filter Tasks by Priority and Status
* UI with TailwindCSS and DaisyUI

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

## 6. Database Diagram

```text
┌────────────┐         ┌──────────────┐
│   users    │         │   tasks      │
├────────────┤         ├──────────────┤
│ id (PK)    │◄────────│ user_id (FK) │
│ email      │         │ id (PK)      │
│ password   │         │ title        │
└────────────┘         │ description  │
                       │ priority     │
                       │ status       │
                       │ created_at   │
                       └──────────────┘
```

---

## 7. API Endpoints

### Auth

* `POST api/auth/signup` → Register user, return JWT
* `POST api/auth/login` → Authenticate user, return JWT

### Tasks (JWT required)

* `GET api/tasks?priority=high&status=todo` → Filtered list
* `POST api/tasks` → Create task
* `PUT api/tasks/:id` → Update task
* `DELETE api/tasks/:id` → Delete task

---

## 8. JWT Authentication

* JWT is issued at login and stored client-side
* Each protected route expects `Authorization: Bearer <token>` header

---

## 9. Docker Setup

* `frontend` service: React dev server
* `backend` service: Node.js with Express API
* `db` service: PostgreSQL with seed script and migrations

---

## 10. Environment Variables (.env Instructions)

To store secrets and configuration values securely, create a `.env` file in server root directory.

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

## 11. Running the App with Docker

### 🧱 Prerequisites

* Clone the repository:

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

### ⚙️ Setup

1. Create `.env` files in `server/` as explained above
2. Ensure `docker-compose.yml` exists in the root of the project

### 🚀 Run the App

```bash
docker compose up --build
```

### 🌐 Access URLs

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3000](http://localhost:3000)
* PostgreSQL: `localhost:5432`

### 🛑 Stop the App

```bash
docker compose down
```

To remove volumes and reset database:

```bash
docker compose down -v
```


---

## 12. Future Enhancements

* Passwords are hashed with bcrypt
* Add search function
* Task notification
* Add CI/CD pipeline

---

## 13. Conclusion

This system design outlines a minimal but complete full-stack task manager application with local development and strong separation of concerns between frontend, backend, and database layers.

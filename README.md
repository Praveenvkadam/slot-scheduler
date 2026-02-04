# Slot Scheduler

A full-stack slot scheduling application with a React (Vite) frontend and a Node.js/Express + MongoDB backend. The app is structured as a simple monorepo with separate `frontend` and `backend` folders.

This project is clearly aimed at managing time slots (booking, availability, or scheduling logic) and already includes authentication, validation, and background jobs on the backend.

---

## Tech Stack

### Frontend

* React 19
* Vite
* React Router
* Redux Toolkit
* React Query (TanStack)
* Material UI + Tailwind CSS
* React Hook Form + Zod
* Axios

### Backend

* Node.js
* Express
* MongoDB + Mongoose
* JWT Authentication
* bcrypt (password hashing)
* Zod + express-validator (validation)
* node-cron (scheduled jobs)
* dotenv

---

## Project Structure

```
slot-scheduler-main/
├── backend/
│   ├── src/
│   │   └── Server.js
│   ├── package.json
│   └── node_modules/
│
├── frontend/
│   ├── src/
│   ├── vite.config.js
│   ├── package.json
│   └── node_modules/
│
└── README.md
```

---

## Prerequisites

* Node.js (v18+ recommended)
* npm or yarn
* MongoDB (local or cloud instance)

---

## Environment Variables

Create a `.env` file inside the `backend` directory.

Example:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/slot-scheduler
JWT_SECRET=your_jwt_secret
```

If these variables are missing or incorrect, the backend will not start correctly.

---

## Installation

### 1. Clone the repository

```
git clone <your-repo-url>
cd slot-scheduler-main
```

### 2. Install backend dependencies

```
cd backend
npm install
```

### 3. Install frontend dependencies

```
cd ../frontend
npm install
```

---

## Running the Project

### Start the backend

From the `backend` directory:

```
npm run dev
```

The backend runs using `nodemon` and will auto-restart on changes.

### Start the frontend

From the `frontend` directory:

```
npm run dev
```

Vite will start the frontend dev server and print the local URL in the terminal.

---

## Build for Production

From the `frontend` directory:

```
npm run build
```

This generates a production-ready build in the `dist` folder.

---

## Notes / Honest Warnings

* `node_modules` are included in this repository. This is a mistake. They should be removed and added to `.gitignore`.
* There are no tests configured. If this is more than a demo project, that’s a problem.
* The backend uses Express v5 (still not fully stable). If you want fewer surprises, downgrade to Express v4.
* Environment validation is minimal — missing variables will likely crash the server at runtime instead of failing fast.

---

## License

No license specified. If you plan to share or deploy this publicly, add one.

---

## Future Improvements (Obvious Ones)

* Add API documentation (Swagger / OpenAPI)
* Add tests (backend + frontend)
* Clean up repo structure (remove `node_modules`)
* Add Docker setup
* Add proper error handling and logging

---

If you want this README tightened, shortened, or rewritten for recruiters / GitHub visitors, say so and be specific.

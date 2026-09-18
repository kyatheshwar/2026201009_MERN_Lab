# Student Notes CRUD Micro-App (MERN Stack)

A decoupled full-stack notes management application built with **MongoDB, Express, React, and Node.js**. The React client (Vite, port 5173) talks to a REST API (Express, port 5000) backed by a local MongoDB database (`notes_db`).

## Candidate Details

- **Name:** Kyatheshwar Guduri
- **Student ID:** 2026201009
- **Email:** kyatheshwar.guduri@gmail.com
- **GitHub Repository:** _\<link to your repository\>_

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React 18 (Vite), Axios              |
| Backend  | Node.js, Express, CORS              |
| Database | MongoDB (local), Mongoose ODM       |

## Project Structure

```
notes-app/
|-- server/            # Node.js + Express backend
|   |-- config/db.js   # Mongoose connection logic
|   |-- models/Note.js # Note schema & model
|   |-- routes/noteRoutes.js # REST route handlers
|   \-- server.js      # App entry point & middleware
\-- client/            # Vite + React frontend
    \-- src/App.jsx    # State, form & notes list
```

## Prerequisites

- Node.js (v18+) and npm
- MongoDB running locally on the default port (`mongodb://localhost:27017`)

## Setup & Run

### 1. Start MongoDB

```bash
sudo systemctl start mongod
# or run the daemon directly: mongod --dbpath <your-db-path>
```

The server connects to `mongodb://localhost:27017/notes_db` — no secrets or custom ports required. The `notes_db` database is created automatically on first insert.

### 2. Start the backend (port 5000)

```bash
cd server
npm install
npm start
```

You should see:

```
Server running on http://localhost:5000
MongoDB connected: mongodb://localhost:27017/notes_db
```

### 3. Start the frontend (port 5173)

In a second terminal:

```bash
cd client
npm install
npm run dev
```

Open **http://localhost:5173** in your browser.

## REST API Contract

| Method | Endpoint         | Description                              | Success | Failure |
| ------ | ---------------- | ---------------------------------------- | ------- | ------- |
| POST   | `/api/notes`     | Create a note (`{ title, content }`)     | 201     | 400/500 |
| GET    | `/api/notes`     | List all notes, newest first             | 200     | 500     |
| DELETE | `/api/notes/:id` | Delete a note by its MongoDB `_id`       | 200     | 404/500 |

### Quick smoke test with curl

```bash
# Create
curl -X POST http://localhost:5000/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"Hello MERN"}'

# Read
curl http://localhost:5000/api/notes

# Delete (replace <id> with a real _id from the GET response)
curl -X DELETE http://localhost:5000/api/notes/<id>
```

## Features

- **Create:** Controlled form (title + content) posts via Axios and prepends the new note to the list instantly.
- **Read:** Notes fetched on mount via `useEffect`, rendered with a localized date, ordered newest first.
- **Delete:** Per-card Delete button calls the API and removes the note from local state without a page refresh.
- **Defensive states:** Loading indicator while requests are in flight, and a friendly "No notes yet — add one above!" empty state.

## Screenshots

See the `screenshots/` folder:

- `ui-preview.png` — app rendering multiple notes
- `delete-action.png` — post-delete view with the `200 OK` DELETE request visible in the DevTools Network tab
# notes-app

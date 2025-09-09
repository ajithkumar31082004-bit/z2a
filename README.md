
# Student Result App (Node.js + MySQL)

A full-stack Student Result app. Backend uses **Node.js/Express + MySQL** (username=`root`, password=`root`). Frontend is vanilla JS with Tailwind and jsPDF.

## Features

- Admin login (username: `Z2A`, password: `1234`)
- Add students with 1–10 subjects, live total/percentage/grade
- List all students (Roll, Name, Total, Grade, Overall Pass/Fail)
- Student portal to view results by Roll No + DOB
- Download PDF result card

## Tech

- Backend: Node.js/Express, MySQL (`mysql2`), CORS
- Frontend: Tailwind CSS, Vanilla JS, jsPDF
- API base: `http://localhost:5000`

## Quick Start

1. **Install MySQL** and ensure credentials `root`/`root` are valid locally.

2. **Create DB and tables** (automatic on first start). Alternatively, run the SQL manually:

```sql
-- See backend/schema.sql
```

3. **Run backend**

```bash
cd backend
npm install
npm start
```

Server runs at `http://localhost:5000`.

4. **Open frontend**

Simply open the HTML files from `frontend/` in your browser (e.g., `index.html` for students, `admin.html` for admin).
If your browser blocks cross-origin file access, you can serve the folder with a tiny static server:

```bash
# Option A: use VS Code Live Server
# Option B: Python's built-in server
cd frontend
python3 -m http.server 5500
# Then visit http://localhost:5500/index.html or /admin.html
```

## API

- `POST /api/admin/login` — body `{ "username": "Z2A", "password": "1234" }`
- `POST /api/students` — add student with subjects (Authorization: `Bearer admin-token`)
- `GET /api/students` — list all students
- `GET /api/students/:roll/:dob` — fetch one student by roll and DOB (DOB format: `YYYY-MM-DD`)

## MySQL Credentials

- host: `localhost`
- user: `root`
- password: `root`
- database: `student_results`

> On first run, the server will ensure the database and tables exist. You can also run `backend/schema.sql` manually.

## Folder Structure

```
student-result-mysql/
  backend/
    server.js
    package.json
    schema.sql
  frontend/
    index.html
    admin.html
```

## Notes

- Client-side and server-side validation included.
- CORS enabled on backend for development.
- If you change MySQL credentials, update them inside `backend/server.js`.

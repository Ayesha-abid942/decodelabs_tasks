# Intern Directory App (Project 4 — Frontend & Backend Integration)

Full-stack CRUD app: React frontend + Express/MySQL backend.
Covers: async API calls, dynamic UI updates, error handling, REST CRUD.

## 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env   # then edit DB credentials if needed
```

Create the database:
```bash
mysql -u root -p < schema.sql
```

Run the server:
```bash
npm run dev     # requires nodemon, or use: npm start
```
Server runs at http://localhost:5000

Test it directly:
```bash
curl http://localhost:5000/api/interns
```

## 2. Frontend Setup

If you don't already have a React app, create one (Vite is fastest):
```bash
npm create vite@latest frontend -- --template react
```
Then copy `src/App.jsx`, `src/api.js`, and `src/App.css` from this
project into your generated `frontend/src/` folder (overwrite the
defaults).

```bash
cd frontend
npm install
npm run dev
```
Open the printed localhost URL (usually http://localhost:5173).

## 3. What each requirement maps to

| Requirement                          | Where                                      |
|---------------------------------------|---------------------------------------------|
| Frontend → backend requests           | `frontend/src/api.js` (fetch calls)        |
| Dynamic UI                            | `App.jsx` state updates after each request |
| Error handling                        | try/catch + `response.ok` checks both sides|
| Full CRUD / REST                      | `backend/routes/interns.js`                |
| Async requests                        | async/await throughout                     |

## 4. Next steps / bonus
- Add Socket.io so the list updates live across open tabs when
  someone adds/deletes an intern (same pattern as your Smart Cafe
  FYP).
- Deploy backend (Railway/Render) + frontend (Vercel/Netlify) so you
  have a live link to submit.

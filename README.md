# Business Location Analyzer

A simple full-stack app that scores how suitable a business type is for a given
pincode, using AI (Google Gemini) for the analysis.

Enter a pincode + business type (e.g. `641004` / `Coffee Shop`) and get back a
suitability score, recommendation, pros, cons, and a summary.

---

## Tech Stack

**Frontend:** React, Vite, React Router, Axios, Tailwind CSS
**Backend:** Node.js, Express, Mongoose, JWT, bcrypt
**Database:** MongoDB Atlas
**AI:** Google Gemini (`@google/genai`)

---

## Folder Structure

```
business-location-analyzer/
├── backend/
│   └── src/
│       ├── config/        # db.js - MongoDB connection
│       ├── controllers/   # request handlers
│       ├── middlewares/   # auth + error handling
│       ├── models/        # User, Analysis
│       ├── routes/        # auth + analysis routes
│       ├── services/      # ai.service.js - Gemini integration
│       ├── utils/         # response.js - standard API responses
│       ├── validations/   # express-validator rules
│       ├── app.js
│       └── server.js
└── frontend/
    └── src/
        ├── components/    # Navbar, Card, Loader, AnalysisResult, ProtectedRoute
        ├── pages/         # Landing, Login, Register, Dashboard, History
        ├── layouts/        # MainLayout
        ├── services/      # api.js, auth.service.js, analysis.service.js
        ├── hooks/         # useAuth.js
        ├── context/       # AuthContext.jsx
        ├── App.jsx
        └── main.jsx
```

---

## 1. Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env
# fill in the values in .env (see below)
npm run dev
```

Backend runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# VITE_API_URL=http://localhost:5000/api
npm run dev
```

Frontend runs on `http://localhost:5173`.

---

## 2. Environment Variables

### backend/.env

| Variable         | Description                                    |
|-------------------|-------------------------------------------------|
| `PORT`            | Port for the Express server (default `5000`)     |
| `MONGODB_URI`      | MongoDB Atlas connection string                  |
| `JWT_SECRET`       | Any long random string, used to sign JWTs        |
| `GEMINI_API_KEY`   | Your Google Gemini API key                       |
| `CLIENT_URL`       | Frontend origin, used for CORS (e.g. your Vercel URL) |

### frontend/.env

| Variable         | Description                              |
|-------------------|--------------------------------------------|
| `VITE_API_URL`     | Base URL of the backend API, e.g. `https://your-backend.onrender.com/api` |

---

## 3. Fixing the "MongoDB Connection Error" (ECONNREFUSED / SRV lookup failed)

This is almost always one of these, **not a code bug**:

1. **IP not whitelisted** — In MongoDB Atlas: Network Access → Add IP Address →
   `0.0.0.0/0` (allow from anywhere) for development, or your Render's
   outbound IPs for production.
2. **Wrong username/password** in the connection string — check for special
   characters in the password; they must be URL-encoded (e.g. `@` becomes `%40`).
3. **Cluster paused** — free-tier Atlas clusters pause after inactivity; resume
   it from the Atlas dashboard.
4. **Copy-pasted placeholder** — make sure `<username>`, `<password>`, and the
   cluster URL in `MONGODB_URI` are replaced with real values, and the database
   name (`business-location-analyzer`) is included before the `?`.

---

## 4. API Documentation

All responses follow this shape:

```json
// success
{ "success": true, "message": "...", "data": {} }

// failure
{ "success": false, "message": "...", "error": {} }
```

| Method | Endpoint              | Auth required | Description                     |
|--------|------------------------|----------------|----------------------------------|
| POST   | `/api/auth/register`   | No             | Create an account               |
| POST   | `/api/auth/login`      | No             | Log in, returns a JWT           |
| GET    | `/api/auth/me`         | Yes            | Get the logged-in user          |
| POST   | `/api/analyze`         | Yes            | Analyze a pincode + business    |
| GET    | `/api/history`         | Yes            | List past analyses (supports `?search=`) |
| DELETE | `/api/history/:id`     | Yes            | Delete an analysis              |

Auth routes expect a `Authorization: Bearer <token>` header once logged in.

---

## 5. Deployment

### Backend → Render

1. Push this repo to GitHub.
2. On Render: New → Web Service → connect the repo → set **Root Directory** to `backend`.
3. Build command: `npm install`
4. Start command: `npm start`
5. Add the environment variables from `backend/.env.example` in Render's dashboard.
6. Deploy. Copy the resulting URL (e.g. `https://blocan-api.onrender.com`).

### Frontend → Vercel

1. On Vercel: New Project → import the same repo → set **Root Directory** to `frontend`.
2. Framework preset: Vite.
3. Add environment variable `VITE_API_URL` = `https://your-render-url.onrender.com/api`.
4. Deploy.
5. Go back to Render and set `CLIENT_URL` to your Vercel URL, then redeploy the backend
   (needed for CORS to allow the frontend's origin).

No code changes are required for either step — everything is driven by env vars.

---

## 6. Screenshots

_Add screenshots here after deploying:_

- Landing page: `screenshots/landing.png`
- Dashboard with a result: `screenshots/dashboard.png`
- History page: `screenshots/history.png`

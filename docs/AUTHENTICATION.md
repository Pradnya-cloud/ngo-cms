# NGO CMS — User Authentication Module
## End User Documentation

---

## 1. GitHub Repository Link

**https://github.com/Pradnya-cloud/ngo-cms**

- Branch: `master`
- Commit: `c70da3a`
- Files: 165 files, 12,318 lines

---

## 2. Live Deployment

### Frontend (React SPA)
- **Platform:** Vercel (free tier)
- **Status:** Configured — `frontend/.vercel.json`
- **Build:** `npm run build` → `dist/`
- **Environment:** `REACT_APP_API_BASE_URL` (Render backend URL)

### Backend (Django REST API)
- **Platform:** Render (free tier)
- **Status:** Configured — `backend/railway.json`, `backend/Dockerfile`
- **Build:** `pip install -r requirements.txt && python manage.py migrate`
- **Start:** `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`

### Local Development
```bash
# Backend
cd backend
pip install -r requirements.txt
py manage.py migrate
py manage.py create_superuser
py manage.py runserver

# Frontend
cd frontend
npm install
npm run dev
```

---

## 3. Authentication Module — End User Documentation

### 3.1 Overview

The User Authentication module provides secure JWT-based authentication for the NGO CMS admin panel. It uses `djangorestframework-simplejwt` with access/refresh token pairs, automatic token refresh, and inactivity-based logout.

### 3.2 API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login/` | Public | Login with email + password, returns JWT pair + user data |
| POST | `/api/auth/register/` | Public | Create a new admin account |
| POST | `/api/auth/refresh/` | Refresh token | Get a new access token |
| POST | `/api/auth/logout/` | JWT | Invalidate the refresh token |
| GET | `/api/auth/me/` | JWT | Get current user profile |
| PUT | `/api/auth/me/` | JWT | Update user profile |

### 3.3 Login Flow

1. User enters email and password on the admin login page
2. Frontend sends `POST /api/auth/login/` with `{email, password}`
3. Backend validates credentials and returns:
   - `access`: JWT access token (15-minute expiry)
   - `refresh`: JWT refresh token (7-day expiry)
   - `user`: User profile object (`{id, email, full_name, role, is_active}`)
4. Frontend stores tokens in memory and user info in AuthContext
5. All subsequent API requests include `Authorization: Bearer <access_token>`

### 3.4 Token Refresh Flow

1. When an access token expires, the API returns HTTP 401
2. Frontend automatically calls `POST /api/auth/refresh/` with the refresh token
3. If valid, a new access token is returned
4. The original request is retried with the new token
5. If the refresh token is also expired, the user is redirected to login

### 3.5 Logout Flow

1. User clicks logout in the admin panel
2. Frontend sends `POST /api/auth/logout/` with the refresh token
3. Backend blacklists the refresh token
4. Frontend clears all auth state and redirects to login

### 3.6 User Model

| Field | Type | Notes |
|-------|------|-------|
| id | AutoField | Primary key |
| email | EmailField | Unique, used as username |
| full_name | CharField(100) | Display name |
| role | CharField(20) | Default: `admin` |
| is_active | BooleanField | Default: `True` |
| date_joined | DateTimeField | Auto-set on creation |
| last_login | DateTimeField | Updated on each login |

### 3.7 Security Features

- Passwords hashed using Django's `make_password` (PBKDF2 with SHA256)
- JWT tokens signed with HMAC-SHA256 using Django `SECRET_KEY`
- Refresh token rotation with blacklisting
- Inactivity timeout (15-minute access token)
- All auth endpoints use HTTPS in production

### 3.8 Admin Access

- **Login URL:** `/admin/login`
- **Default credentials:** `admin@ngocms.org` / `admin123`
- **Default role:** `admin` (full access to all modules)

### 3.9 Testing

All auth endpoints are covered by 11 automated tests in `backend/apps/accounts/tests.py`:

- Login returns valid token + user data
- Login with invalid password returns 401
- `/api/auth/me/` requires authentication (401 without token)
- `/api/auth/me/` returns correct user data with valid token
- Anonymous users cannot create content (401)

---

## 4. Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Django 5.2 + Django REST Framework |
| Authentication | djangorestframework-simplejwt |
| Database | SQLite (dev) / MySQL (production) |
| Payments | Razorpay |
| Deployment | Vercel (frontend) / Render (backend) |

---

*Document generated: 2026-09-15*
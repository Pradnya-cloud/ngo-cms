# NGO CMS — Umang Foundation

Full-stack Content Management System with a React SPA frontend and Django REST API backend.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite + Tailwind CSS |
| Backend | Django REST Framework + JWT auth |
| Database | SQLite (dev) / MySQL (production) |
| Payments | Razorpay (with signature verification) |
| Deployment | Vercel (frontend) / Render (backend) |

## Project Structure

```
ngo-cms/
├── backend/           # Django project
│   ├── config/        # Settings, URLs, WSGI
│   ├── apps/          # 10 Django apps
│   │   ├── accounts/  # User model + JWT auth
│   │   ├── content/   # Page content CMS
│   │   ├── projects/  # Projects + campaigns
│   │   ├── donations/ # Donations + Razorpay
│   │   ├── media_gallery/ # Photos, videos, press
│   │   ├── events/    # Events + registrations
│   │   ├── volunteers/    # Volunteer applications
│   │   ├── blog/      # Blog posts
│   │   ├── enquiries/ # Contact/partnership forms
│   │   └── dashboard/ # Aggregated stats
│   └── manage.py
├── frontend/          # React SPA
│   ├── src/
│   │   ├── components/    # Layout, admin, UI, forms
│   │   ├── pages/         # 13 public + 4 auth + 10 admin
│   │   ├── context/       # AuthContext
│   │   ├── hooks/         # usePageContent
│   │   └── utils/         # apiClient, authApi
│   └── public/            # sitemap.xml, robots.txt
├── docs/               # PHASE1.md, API.md
└── README.md
```

## Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env    # Edit with your settings
py manage.py migrate
py manage.py create_superuser    # admin@ngocms.org / admin123
py manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm run dev    # Proxies /api to localhost:8000
```

## API Endpoints

Base URL: `/api/`

| App | Endpoints |
|-----|-----------|
| Auth | `POST /auth/login/`, `POST /auth/register/`, `POST /auth/refresh/`, `GET /auth/me/` |
| Content | `GET/POST/PUT/DELETE /content/?page_type=` |
| Projects | `GET/POST/PUT/DELETE /projects/?type=&status=` |
| Donations | `GET /donations/`, `POST /donations/order/`, `POST /donations/verify/`, `POST /donations/webhook/` |
| Media | `GET/POST/PUT/DELETE /media/` |
| Events | `GET/POST/PUT/DELETE /events/`, `POST /events/<id>/register/` |
| Volunteers | `GET/POST/PUT/DELETE /volunteers/` |
| Blog | `GET/POST/PUT/DELETE /blog/` |
| Enquiries | `GET/POST/PUT/DELETE /enquiries/` |
| Dashboard | `GET /dashboard/stats/`, `GET /dashboard/recent/` |

## Razorpay Integration

- `POST /donations/order/` creates a Razorpay order (real API if keys set, mock otherwise)
- `POST /donations/verify/` verifies HMAC-SHA256 signature before marking donation success
- `POST /donations/webhook/` handles async payment status updates
- Set `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in environment for production

## Deployment

### Backend (Render)
- Build: `pip install -r requirements.txt && python manage.py migrate`
- Start: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
- See `backend/railway.json` and `backend/Dockerfile`

### Frontend (Vercel)
- Build: `npm run build`
- Output: `dist/`
- See `frontend/.vercel.json`

## Admin Access
- URL: `/admin/login`
- Default credentials: `admin@ngocms.org` / `admin123`
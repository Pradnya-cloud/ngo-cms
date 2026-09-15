# NGO CMS Backend - Django Project

## Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Set up environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

3. **Run migrations:**
   ```bash
   python manage.py migrate
   ```

4. **Create superuser:**
   ```bash
   python manage.py createsuperuser
   ```

5. **Run development server:**
   ```bash
   python manage.py runserver
   ```

> **Note:** The `.env` file uses SQLite (`db.sqlite3`) for local development by default. For production, configure `DATABASE_URL` to use MySQL or PostgreSQL.

## Environment Variables

| Variable | Description | Default (Local) |
|----------|-------------|-----------------|
| `DEBUG` | Enable debug mode | `True` |
| `SECRET_KEY` | Django secret key | (generated) |
| `DATABASE_URL` | Database connection string | `sqlite:///db.sqlite3` |
| `ALLOWED_HOSTS` | Comma-separated allowed hosts | `localhost,127.0.0.1` |
| `CORS_ALLOWED_ORIGINS` | Comma-separated CORS origins | `http://localhost:5173` |
| `CLOUDINARY_URL` | Cloudinary media storage URL | (optional) |
| `RAZORPAY_KEY_ID` | Razorpay public key | (optional) |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | (optional) |
| `DJANGO_SETTINGS_MODULE` | Settings module to use | `config.settings.development` |

## Project Structure

```
backend/
├── config/           # Django project config
│   ├── settings/     # Settings (base, development, production)
│   ├── urls.py       # Root URL routing
│   ├── wsgi.py       # WSGI entry point
│   └── asgi.py       # ASGI entry point
├── apps/
│   ├── accounts/     # User management + JWT auth
│   └── content/      # Page content CMS
├── manage.py
├── requirements.txt
├── requirements-dev.txt
├── .env.example
├── railway.json      # Render/Railway deployment config
└── Dockerfile        # Container deployment
```

## API Endpoints

### Auth (`/api/auth/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login (returns JWT access + refresh tokens) |
| POST | `/api/auth/refresh/` | Refresh access token |
| POST | `/api/auth/logout/` | Logout (blacklists refresh token) |
| GET | `/api/auth/me/` | Get current user profile |

### Content CMS (`/api/content/`)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/content/?page=home` | List content (filter by page, section) |
| POST | `/api/content/` | Create content block (admin only) |
| GET | `/api/content/{id}/` | Retrieve single content item |
| PUT | `/api/content/{id}/` | Full update content block (admin only) |
| PATCH | `/api/content/{id}/` | Partial update content block (admin only) |
| DELETE | `/api/content/{id}/` | Delete content block (admin only) |

### Admin
- `/admin/login/` - Admin login
- `/admin/content/` - PageContent management
- `/admin/auth/user/` - User management

## Authentication

All protected endpoints require JWT Bearer token:
```
Authorization: Bearer <access_token>
```

- Access token: 15 minutes
- Refresh token: 7 days (rotated on use)

## Development Commands

```bash
# Run tests
python manage.py test

# Create migration files
python manage.py makemigrations

# Collect static files (production)
python manage.py collectstatic --noinput

# Check for deployment issues
python manage.py check --deploy

# Shell access
python manage.py shell
```

## Deployment

### Render (via railway.json)
1. Connect repository to Render
2. Build command: `pip install -r requirements.txt && python manage.py migrate --noinput`
3. Start command: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
4. Set environment variables in Render dashboard

### Docker
```bash
docker build -t ngo-cms-backend .
docker run -p 8000:8000 --env-file .env ngo-cms-backend
```

## Testing

```bash
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test apps.accounts apps.content

# With coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
```
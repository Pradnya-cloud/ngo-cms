# Phase 1 Documentation - NGO CMS

## Overview

Phase 1 establishes the foundational infrastructure for the Umang Foundation NGO CMS, delivering a complete authentication system, a dynamic home page, and a content management system for managing site content through an admin interface.

---

## What Was Built in Phase 1

### 1. Authentication System (`/api/auth/`)

**Features:**
- User registration with email, password, and profile details
- JWT-based authentication using `djangorestframework-simplejwt`
- Access tokens (short-lived) and refresh tokens (long-lived)
- Secure logout with token blacklisting
- Protected API endpoints requiring Bearer token
- Current user profile endpoint (`/api/auth/me/`)

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login and receive tokens |
| POST | `/api/auth/refresh/` | Refresh access token |
| POST | `/api/auth/logout/` | Logout and blacklist token |
| GET | `/api/auth/me/` | Get current user profile |

### 2. Home Page (Frontend)

**Sections:**
- **Hero Section** - Headline, subtext, CTA buttons, background image
- **About Section** - Mission statement, vision, core values
- **Programs/Services** - Grid of program cards with icons, descriptions
- **Testimonials** - Carousel of beneficiary/partner testimonials
- **Contact/Donate CTA** - Call-to-action with donation link

**Technical Details:**
- Built with React 18 + Vite
- Styled with Tailwind CSS
- Fully responsive (mobile-first)
- Content fetched from `/api/content/` endpoint
- Fallback to default content if API unavailable

### 3. Content Management System (CMS)

**PageContent Model:**
```python
class PageContent(models.Model):
    page = models.CharField(max_length=50)      # e.g., 'home'
    section = models.CharField(max_length=50)   # e.g., 'hero', 'about'
    key = models.CharField(max_length=100)      # e.g., 'headline', 'cta_text'
    value = models.TextField()                  # Content value (JSON/HTML/text)
    content_type = models.CharField(max_length=20)  # 'text', 'richtext', 'image', 'json'
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
```

**Admin Interface:**
- Accessible at `/admin/content/` (requires superuser login)
- Manage content by page, section, and key
- Support for rich text, images, and structured JSON content
- Drag-and-drop ordering within sections

**API Endpoint:**
- `GET /api/content/?page=home` - Returns structured content for frontend rendering

---

## How to Access the Admin Panel

1. **Start the backend server:**
   ```bash
   cd backend
   python manage.py runserver
   ```

2. **Navigate to admin login:**
   - URL: `http://localhost:8000/admin/login/`
   - Use superuser credentials created during setup:
     ```bash
     python manage.py createsuperuser
     ```

3. **Manage content:**
   - After login, go to `http://localhost:8000/admin/content/`
   - Add/edit PageContent entries for each page section
   - Changes reflect immediately on the home page via API

---

## How Home Page Content Is Managed

### Content Structure
The home page consumes content from the `PageContent` model filtered by `page='home'`. Content is organized by `section` and `key`:

```
page='home'
├── section='hero'
│   ├── key='headline' (text)
│   ├── key='subtext' (richtext)
│   ├── key='cta_primary_text' (text)
│   ├── key='cta_primary_url' (text)
│   ├── key='cta_secondary_text' (text)
│   ├── key='cta_secondary_url' (text)
│   └── key='background_image' (image - Cloudinary URL)
├── section='about'
│   ├── key='mission' (richtext)
│   ├── key='vision' (richtext)
│   └── key='values' (json - array of {title, description, icon})
├── section='programs'
│   └── key='items' (json - array of {title, description, icon, image})
├── section='testimonials'
│   └── key='items' (json - array of {quote, author, role, image})
└── section='cta'
    ├── key='headline' (text)
    ├── key='description' (richtext)
    ├── key='button_text' (text)
    └── key='button_url' (text)
```

### Managing Content
1. Log into `/admin/login/`
2. Navigate to **Content → Page Contents**
3. Filter by `page = home`
4. Edit existing entries or add new ones
5. Set `is_active = True` to publish
6. Use `order` field to control display sequence
7. Frontend automatically fetches and renders updates

---

## API Endpoints Available in Phase 1

### Authentication (`/api/auth/`)
```
POST   /api/auth/register/     # Register new user
POST   /api/auth/login/        # Login (returns access + refresh tokens)
POST   /api/auth/refresh/      # Refresh access token
POST   /api/auth/logout/       # Logout (blacklist refresh token)
GET    /api/auth/me/           # Get authenticated user profile
```

### Content (`/api/content/`)
```
GET    /api/content/           # List content (query: ?page=home)
POST   /api/content/           # Create content (admin only)
GET    /api/content/{id}/      # Retrieve single content item
PUT    /api/content/{id}/      # Update content (admin only)
PATCH  /api/content/{id}/      # Partial update (admin only)
DELETE /api/content/{id}/      # Delete content (admin only)
```

### Admin (`/admin/`)
```
GET    /admin/login/           # Admin login page
GET    /admin/content/         # PageContent management
GET    /admin/auth/user/       # User management
```

---

## Testing the Implementation

### Backend API Tests
```bash
cd backend
python manage.py test apps.accounts apps.content
```

### Frontend Development
```bash
cd frontend
npm run dev
# Visit http://localhost:5173
```

### Manual API Testing (curl)
```bash
# Register
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securepass123","name":"Test User"}'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"securepass123"}'

# Get home content
curl http://localhost:8000/api/content/?page=home

# Access protected endpoint
curl -H "Authorization: Bearer <access_token>" \
  http://localhost:8000/api/auth/me/
```

---

## Next Steps (Phase 2+)

- Donation integration with Razorpay
- Blog/News management system
- Event management and registration
- Volunteer management
- Gallery/media library
- Email notifications
- Multi-language support
- Analytics dashboard
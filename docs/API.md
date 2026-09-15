# API Documentation - NGO CMS

## Base URL

```
Local:    http://localhost:8000/api/
Production: https://<your-render-domain>.onrender.com/api/
```

All endpoints are prefixed with `/api/`.

---

## Authentication

### Header Format

All protected endpoints require the Authorization header:

```
Authorization: Bearer <access_token>
```

### Token Lifecycle

- **Access Token**: 15 minutes (configurable in settings)
- **Refresh Token**: 7 days (configurable in settings)
- Refresh tokens are rotated on use (old token blacklisted)

---

## Auth Endpoints

### Register User

**POST** `/auth/register/`

Register a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "password_confirm": "securePassword123",
  "name": "John Doe",
  "phone": "+91-9876543210"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+91-9876543210",
    "is_active": true,
    "date_joined": "2026-01-15T10:30:00Z"
  },
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- 400: Validation errors (email exists, passwords don't match, weak password)

---

### Login

**POST** `/auth/login/`

Authenticate and receive JWT tokens.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "phone": "+91-9876543210"
  }
}
```

**Errors:**
- 401: Invalid credentials
- 400: Missing fields

---

### Refresh Access Token

**POST** `/auth/refresh/`

Exchange refresh token for new access token.

**Request:**
```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**
```json
{
  "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errors:**
- 401: Token expired, blacklisted, or invalid

---

### Logout

**POST** `/auth/logout/`

Blacklist the refresh token.

**Request:**
```json
{
  "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (205 Reset Content):** Empty body

**Errors:**
- 401: Invalid access token
- 400: Missing refresh token

---

### Get Current User

**GET** `/auth/me/`

Retrieve authenticated user's profile.

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response (200 OK):**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "phone": "+91-9876543210",
  "is_active": true,
  "date_joined": "2026-01-15T10:30:00Z"
}
```

**Errors:**
- 401: Invalid or missing token

---

## Content Endpoints

### List Content

**GET** `/content/`

Retrieve content items, optionally filtered by page.

**Query Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `page` | string | Filter by page slug (e.g., `home`) |
| `section` | string | Filter by section (e.g., `hero`) |
| `is_active` | boolean | Filter by active status |

**Headers:**
```
Authorization: Bearer <access_token>  # Optional for public content
```

**Response (200 OK):**
```json
{
  "count": 8,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "page": "home",
      "section": "hero",
      "key": "headline",
      "value": "Empowering Communities, Transforming Lives",
      "content_type": "text",
      "order": 0,
      "is_active": true,
      "created_at": "2026-01-15T10:30:00Z",
      "updated_at": "2026-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "page": "home",
      "section": "hero",
      "key": "subtext",
      "value": "<p>We work tirelessly to create lasting change...</p>",
      "content_type": "richtext",
      "order": 1,
      "is_active": true,
      "created_at": "2026-01-15T10:30:00Z",
      "updated_at": "2026-01-15T10:30:00Z"
    }
  ]
}
```

---

### Create Content

**POST** `/content/`

Create a new content item (admin only).

**Headers:**
```
Authorization: Bearer <admin_access_token>
Content-Type: application/json
```

**Request:**
```json
{
  "page": "home",
  "section": "hero",
  "key": "cta_primary_text",
  "value": "Donate Now",
  "content_type": "text",
  "order": 5,
  "is_active": true
}
```

**Response (201 Created):**
```json
{
  "id": 10,
  "page": "home",
  "section": "hero",
  "key": "cta_primary_text",
  "value": "Donate Now",
  "content_type": "text",
  "order": 5,
  "is_active": true,
  "created_at": "2026-01-15T11:00:00Z",
  "updated_at": "2026-01-15T11:00:00Z"
}
```

**Errors:**
- 401: Not authenticated
- 403: Not admin user
- 400: Validation errors

---

### Retrieve Content

**GET** `/content/{id}/`

Get a single content item by ID.

**Headers:**
```
Authorization: Bearer <access_token>  # Optional for public content
```

**Response (200 OK):**
```json
{
  "id": 1,
  "page": "home",
  "section": "hero",
  "key": "headline",
  "value": "Empowering Communities, Transforming Lives",
  "content_type": "text",
  "order": 0,
  "is_active": true,
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-01-15T10:30:00Z"
}
```

**Errors:**
- 404: Not found

---

### Update Content

**PUT** `/content/{id}/`

Full update of a content item (admin only).

**Headers:**
```
Authorization: Bearer <admin_access_token>
Content-Type: application/json
```

**Request:**
```json
{
  "page": "home",
  "section": "hero",
  "key": "headline",
  "value": "New Headline Here",
  "content_type": "text",
  "order": 0,
  "is_active": true
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "page": "home",
  "section": "hero",
  "key": "headline",
  "value": "New Headline Here",
  "content_type": "text",
  "order": 0,
  "is_active": true,
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-01-15T11:30:00Z"
}
```

---

### Partial Update Content

**PATCH** `/content/{id}/`

Partial update of a content item (admin only).

**Headers:**
```
Authorization: Bearer <admin_access_token>
Content-Type: application/json
```

**Request:**
```json
{
  "value": "Updated Headline Only",
  "is_active": false
}
```

**Response (200 OK):**
```json
{
  "id": 1,
  "page": "home",
  "section": "hero",
  "key": "headline",
  "value": "Updated Headline Only",
  "content_type": "text",
  "order": 0,
  "is_active": false,
  "created_at": "2026-01-15T10:30:00Z",
  "updated_at": "2026-01-15T11:35:00Z"
}
```

---

### Delete Content

**DELETE** `/content/{id}/`

Delete a content item (admin only).

**Headers:**
```
Authorization: Bearer <admin_access_token>
```

**Response (204 No Content):** Empty body

**Errors:**
- 401: Not authenticated
- 403: Not admin user
- 404: Not found

---

## Content Types

| Type | Description | Example Value |
|------|-------------|---------------|
| `text` | Plain text | `"Donate Now"` |
| `richtext` | HTML content | `"<p>Welcome to <strong>Umang Foundation</strong></p>"` |
| `image` | Cloudinary image URL | `"https://res.cloudinary.com/.../image.jpg"` |
| `json` | Structured JSON data | `"[{\"title\":\"Education\",\"icon\":\"book\"}]"` |

---

## Error Response Format

All error responses follow this structure:

```json
{
  "detail": "Error description",
  "code": "error_code",
  "fields": {
    "field_name": ["Error message"]
  }
}
```

### Common HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (invalid/missing token) |
| 403 | Forbidden (insufficient permissions) |
| 404 | Not Found |
| 500 | Server Error |

---

## Pagination

List endpoints use cursor pagination:

```json
{
  "count": 100,
  "next": "http://localhost:8000/api/content/?page=home&cursor=cD0yMDI2...",
  "previous": null,
  "results": [...]
}
```

---

## Rate Limiting

- Auth endpoints: 10 requests/minute per IP
- Content endpoints: 100 requests/minute per user
- Configurable in `config/settings/base.py` via `REST_FRAMEWORK['DEFAULT_THROTTLE_RATES']`

---

## CORS

Configured for frontend origins:
- Local: `http://localhost:5173`
- Production: Vercel deployment URL

Set via `CORS_ALLOWED_ORIGINS` in environment variables.

---

## Example: Complete Auth Flow

```bash
# 1. Register
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{"email":"donor@example.com","password":"SecurePass123","password_confirm":"SecurePass123","name":"Jane Donor"}'

# 2. Login (save access & refresh tokens)
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"email":"donor@example.com","password":"SecurePass123"}'

# 3. Use access token for protected requests
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  http://localhost:8000/api/auth/me/

# 4. Refresh when access token expires
curl -X POST http://localhost:8000/api/auth/refresh/ \
  -H "Content-Type: application/json" \
  -d '{"refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'

# 5. Logout
curl -X POST http://localhost:8000/api/auth/logout/ \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"refresh":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
```

---

## Admin-Only Endpoints Summary

| Endpoint | Method | Permission |
|----------|--------|------------|
| `/content/` | POST | IsAdminUser |
| `/content/{id}/` | PUT, PATCH, DELETE | IsAdminUser |
| `/admin/` | All | IsAdminUser (Django admin) |

---
*Generated for NGO CMS Phase 1*
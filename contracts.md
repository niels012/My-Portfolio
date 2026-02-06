# API Contracts - Nilo Urmeneta Portfolio

## Overview
Backend API for storing contact form submissions while keeping EmailJS for email delivery.

## Data Models

### Contact Submission
```json
{
  "id": "string (uuid)",
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string",
  "created_at": "datetime",
  "is_read": "boolean (default: false)"
}
```

## API Endpoints

### POST /api/contact
Create a new contact submission.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Response (201):**
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project...",
  "created_at": "2025-02-06T12:00:00Z",
  "is_read": false
}
```

### GET /api/contact
Get all contact submissions (for admin purposes).

**Response (200):**
```json
[
  {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I'd like to discuss...",
    "created_at": "2025-02-06T12:00:00Z",
    "is_read": false
  }
]
```

## Frontend Integration

### Current Mock State
- Contact form uses EmailJS directly (client-side)
- No backend storage

### Integration Plan
1. Keep EmailJS for immediate email delivery
2. Add backend API call to store submission in MongoDB
3. Both happen in parallel - if one fails, the other still works

### ContactSection.jsx Changes
```javascript
// After EmailJS send succeeds, also save to backend
const response = await axios.post(`${API}/contact`, {
  name: formData.name,
  email: formData.email,
  subject: formData.subject,
  message: formData.message
});
```

## Files to Modify
- `/app/backend/server.py` - Add Contact model and endpoints
- `/app/frontend/src/components/ContactSection.jsx` - Add backend API call

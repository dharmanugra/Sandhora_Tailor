# Sandhora Tailor - Backend Implementation Contracts

## Overview
This document outlines the API contracts and implementation strategy for the Sandhora Tailor website backend.

## Current Frontend State (Mock Data)
- **Location**: `/app/frontend/src/mock.js`
- **Mock Functions**:
  - `mockLogin()` - Simulates Google Auth login
  - `mockCheckAuth()` - Checks localStorage for user
  - `mockLogout()` - Clears localStorage
  - `mockGetGallery()` - Returns gallery images from localStorage or default mock data
  - `mockAddGalleryImage()` - Adds image to localStorage
  - `mockDeleteGalleryImage()` - Removes image from localStorage
  - `mockSubmitContact()` - Logs contact form data

## Backend Implementation Plan

### 1. Authentication (Emergent Google OAuth)

#### API Endpoints

**POST /api/auth/callback**
- Process session_id from Emergent Auth
- Exchange for session_token
- Create/update user in MongoDB
- Set httpOnly cookie
- Return user data
```json
Request: { "session_id": "string" }
Response: {
  "user_id": "string",
  "email": "string",
  "name": "string",
  "picture": "string"
}
```

**GET /api/auth/me**
- Verify session_token from cookie
- Return current user data
```json
Response: {
  "user_id": "string",
  "email": "string",
  "name": "string",
  "picture": "string"
}
```

**POST /api/auth/logout**
- Delete session from MongoDB
- Clear httpOnly cookie
```json
Response: { "success": true }
```

#### MongoDB Collections

**users**
```javascript
{
  user_id: "user_abc123",  // Custom UUID, not MongoDB _id
  email: "admin@sandhoratailor.com",
  name: "Admin User",
  picture: "https://...",
  created_at: ISODate("2025-01-14T...")
}
```

**user_sessions**
```javascript
{
  user_id: "user_abc123",
  session_token: "session_xyz789",
  expires_at: ISODate("2025-01-21T..."),  // 7 days from creation
  created_at: ISODate("2025-01-14T...")
}
```

### 2. Gallery Management

#### API Endpoints

**GET /api/gallery**
- Public endpoint - no auth required
- Returns all gallery images
```json
Response: [
  {
    "image_id": "string",
    "title": "string",
    "description": "string",
    "category": "suits|formal|traditional|business|casual",
    "image_path": "string",
    "created_at": "ISO date string"
  }
]
```

**POST /api/gallery**
- Protected endpoint - requires authentication
- Upload image file with metadata
- Store image in `/app/backend/uploads/gallery/`
- Save metadata to MongoDB
```json
Request (multipart/form-data): {
  "file": File,
  "title": "string",
  "description": "string",
  "category": "string"
}
Response: {
  "image_id": "string",
  "title": "string",
  "description": "string",
  "category": "string",
  "image_path": "string",
  "created_at": "ISO date string"
}
```

**DELETE /api/gallery/:image_id**
- Protected endpoint - requires authentication
- Delete image file from disk
- Remove metadata from MongoDB
```json
Response: { "success": true }
```

**GET /api/uploads/gallery/:filename**
- Public endpoint - serves static image files
- Returns image file

#### MongoDB Collections

**gallery_images**
```javascript
{
  image_id: "img_abc123",  // Custom UUID
  title: "Custom Tailored Suit",
  description: "Premium wool suit with perfect fit",
  category: "suits",
  image_path: "/uploads/gallery/img_abc123.jpg",
  created_at: ISODate("2025-01-14T...")
}
```

### 3. Contact Form

#### API Endpoints

**POST /api/contact**
- Public endpoint - no auth required
- Store contact submission
- Optional: Send email notification (future enhancement)
```json
Request: {
  "name": "string",
  "email": "string",
  "phone": "string",
  "message": "string"
}
Response: {
  "success": true,
  "message": "Message received successfully"
}
```

**GET /api/contact**
- Protected endpoint - requires authentication
- Returns all contact submissions for admin
```json
Response: [
  {
    "contact_id": "string",
    "name": "string",
    "email": "string",
    "phone": "string",
    "message": "string",
    "created_at": "ISO date string"
  }
]
```

#### MongoDB Collections

**contact_submissions**
```javascript
{
  contact_id: "contact_abc123",  // Custom UUID
  name: "John Doe",
  email: "john@example.com",
  phone: "+6282147068677",
  message: "I would like to inquire about...",
  created_at: ISODate("2025-01-14T...")
}
```

## File Upload Strategy

### Image Storage
- **Location**: `/app/backend/uploads/gallery/`
- **Naming**: `{image_id}.{extension}` (e.g., `img_abc123.jpg`)
- **Max Size**: 10MB per image
- **Allowed Types**: `.jpg`, `.jpeg`, `.png`, `.webp`

### Static File Serving
- FastAPI will serve static files from `/app/backend/uploads/`
- Configure: `app.mount("/uploads", StaticFiles(directory="/app/backend/uploads"), name="uploads")`

## Frontend Integration Changes

### 1. Replace Mock Auth
**File**: `/app/frontend/src/pages/AdminLoginPage.jsx`
- Remove `mockLogin()` call
- Implement actual Emergent Google Auth redirect
- Add AuthCallback component to handle session_id

**File**: `/app/frontend/src/pages/AdminDashboard.jsx`
- Replace `mockCheckAuth()` with API call to `/api/auth/me`
- Replace `mockLogout()` with API call to `/api/auth/logout`

### 2. Replace Mock Gallery
**File**: `/app/frontend/src/pages/GalleryPage.jsx`
- Replace `mockGetGallery()` with `fetch('/api/gallery')`

**File**: `/app/frontend/src/pages/AdminDashboard.jsx`
- Replace `mockAddGalleryImage()` with multipart form POST to `/api/gallery`
- Replace `mockDeleteGalleryImage()` with DELETE to `/api/gallery/:id`
- Replace localStorage usage with actual backend calls

### 3. Replace Mock Contact
**File**: `/app/frontend/src/pages/ContactPage.jsx`
- Replace `mockSubmitContact()` with POST to `/api/contact`

## Security Considerations

1. **Authentication**
   - Use httpOnly cookies for session_token
   - Secure flag enabled in production
   - SameSite=None for cross-origin requests

2. **File Uploads**
   - Validate file types (image only)
   - Validate file size (max 10MB)
   - Generate unique filenames to prevent overwrites
   - Sanitize filenames

3. **Rate Limiting**
   - Implement rate limiting for contact form (future enhancement)
   - Implement rate limiting for image uploads (future enhancement)

4. **CORS**
   - Already configured to allow frontend origin
   - Ensure credentials are allowed

## Testing Checklist

### Authentication
- [ ] Google OAuth login redirects properly
- [ ] Session cookie is set after successful login
- [ ] `/api/auth/me` returns user data with valid session
- [ ] `/api/auth/me` returns 401 with invalid/expired session
- [ ] Logout clears cookie and session

### Gallery
- [ ] Public can view gallery images
- [ ] Admin can upload images with all fields
- [ ] Images are properly stored on disk
- [ ] Image metadata is saved to MongoDB
- [ ] Admin can delete images
- [ ] Deleted images are removed from disk and MongoDB
- [ ] Images are served correctly via static endpoint

### Contact
- [ ] Contact form submissions are saved
- [ ] Form validation works
- [ ] Admin can view all submissions

## Next Steps

1. Install required Python packages:
   - `python-multipart` (for file uploads)
   
2. Create backend routes:
   - `/app/backend/routes/auth.py`
   - `/app/backend/routes/gallery.py`
   - `/app/backend/routes/contact.py`

3. Create backend models:
   - `/app/backend/models/user.py`
   - `/app/backend/models/gallery.py`
   - `/app/backend/models/contact.py`

4. Update server.py to include new routes and static file serving

5. Create uploads directory structure

6. Update frontend to use real APIs instead of mock functions

7. Test all endpoints with manual testing or automated tests

## Notes

- The zipper animation currently runs on every page navigation - consider storing a flag in sessionStorage to only show once per session (already implemented)
- Mock data in localStorage will be preserved until backend is integrated
- After backend integration, remove `mock.js` file

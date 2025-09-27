# Aether Project API & Database Documentation

This document describes the REST API endpoints and the database schema used by the Aether application.

Base URL: `http://localhost:5000`
API Prefix: `/api/auth`

Note: Protected routes require a JWT sent via the `Authorization: Bearer <token>` header.

## Endpoints Overview

| Method | Path                   | Auth        | Description                                  |
|-------:|------------------------|-------------|----------------------------------------------|
| POST   | /api/auth/signup       | No          | Register a new user                           |
| POST   | /api/auth/login        | No          | Log in and receive a JWT                      |
| POST   | /api/auth/logout       | Bearer JWT  | Log out the current user (requires token)     |
| GET    | /api/auth/profile      | Bearer JWT  | Get the authenticated user's profile          |
| GET    | /api/auth/admin/users  | Admin JWT   | List all users (admin-only)                   |

---

## Authentication

- Scheme: Bearer token (JWT)
- Header: `Authorization: Bearer <JWT>`
- Token creation: 7 day expiry, signed with `JWT_SECRET_KEY`.

```json
// JWT payload structure
{ "_id": "<userId>", "iat": 173... , "exp": 173... }
```

Environment variables required:
- `JWT_SECRET_KEY`: Secret used to sign and verify JWTs.
- MongoDB connection vars (see backend/db.js if applicable).

---

## Endpoint Details and Examples

### 1) Signup
- Path: `POST /api/auth/signup`
- Auth: None
- Body (JSON):
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```
- Success Response (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { "id": "6650...", "name": "John Doe", "email": "john@example.com" },
    "token": "<JWT>"
  }
}
```
- Error Responses:
  - 400: `{ "error": "All fields are required" }`
  - 400: `{ "error": "Email already registered" }`
  - 500: `{ "success": false, "message": "Server error" }`

Curl:
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

---

### 2) Login
- Path: `POST /api/auth/login`
- Auth: None
- Body (JSON):
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
- Success Response (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { "id": "6650...", "name": "John Doe", "email": "john@example.com" },
    "token": "<JWT>"
  }
}
```
- Error Responses:
  - 400: `{ "success": false, "message": "Invalid email or password" }`

Curl:
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

---

### 3) Logout
- Path: `POST /api/auth/logout`
- Auth: Bearer JWT
- Note: Controller expects a valid authenticated user and token; ensure you include the `Authorization` header.
- Success Response (200):
```json
{
  "success": true,
  "message": "Logout successful"
}
```
- Error Responses:
  - 401: `{ "message": "Authorization token missing" }`
  - 401: `{ "message": "Invalid token" }`
  - 500: `{ "success": false, "message": "Server error" }`

Curl:
```bash
curl -X POST http://localhost:5000/api/auth/logout \
  -H "Authorization: Bearer <JWT>"
```

---

### 4) Profile
- Path: `GET /api/auth/profile`
- Auth: Bearer JWT
- Success Response (200):
```json
{
  "success": true,
  "message": "User profile fetched successfully",
  "data": {
    "user": { "id": "6650...", "name": "John Doe", "email": "john@example.com" }
  }
}
```
- Error Responses:
  - 401: `{ "message": "Authorization token missing" }`
  - 401: `{ "message": "user not found" }`
  - 401: `{ "message": "Invalid token" }`

Curl:
```bash
curl http://localhost:5000/api/auth/profile \
  -H "Authorization: Bearer <JWT>"
```

---

### 5) Admin: List Users
- Path: `GET /api/auth/admin/users`
- Auth: Bearer JWT with role `admin`
- Success Response (200):
```json
{
  "users": [
    { "_id": "6650...", "name": "John Doe", "email": "john@example.com", "role": "user", ... },
    { "_id": "6651...", "name": "Admin", "email": "admin@example.com", "role": "admin", ... }
  ]
}
```
- Error Responses:
  - 401: `{ "message": "Authorization token missing" }`
  - 401: `{ "message": "Invalid token" }`
  - 403: `{ "message": "Access denied: insufficient role" }` (from role middleware)
  - 500: `{ "message": "Error fetching users" }`

Curl:
```bash
curl http://localhost:5000/api/auth/admin/users \
  -H "Authorization: Bearer <ADMIN_JWT>"
```

---

## Database Schema

### Collections

#### users

| Field                | Type      | Required | Unique | Default   | Notes                                      |
|----------------------|-----------|----------|--------|-----------|--------------------------------------------|
| _id                  | ObjectId  | Yes      | Yes    |           | MongoDB document ID                        |
| name                 | String    | Yes      | No     |           | Trimmed                                    |
| email                | String    | Yes      | Yes    |           | Lowercased, validated via `validator`      |
| password             | String    | Yes      | N/A    |           | Min length 6, `select: false`, bcrypt hash |
| role                 | String    | No       | No     | "user"    | Enum: `user`, `admin`                      |
| isVerified           | Boolean   | No       | No     | false     | Email verification flag                    |
| mfaEnabled           | Boolean   | No       | No     | false     | Multi-factor auth enabled                  |
| failedLoginAttempts  | Number    | No       | No     | 0         | Incremented on failed login attempts       |
| createdAt            | Date      | Yes      | No     | now       | From `timestamps: true`                    |
| updatedAt            | Date      | Yes      | No     | now       | From `timestamps: true`                    |

Indexes:
- `email` unique index.

Model Hooks and Methods:
- `pre('save')`: Hash `password` with bcrypt if modified.
- `findByCredentials(email, password)`: Validates credentials; throws on failure.
- `generateAuthToken()`: Returns JWT signed with `JWT_SECRET_KEY`, expires in 7 days.
- `toJSON()`: Removes `password` from serialized output.

---

## Request Headers

| Header         | Example                         | Required | Notes                          |
|----------------|----------------------------------|----------|--------------------------------|
| Content-Type   | application/json                 | Yes      | For JSON request bodies        |
| Authorization  | Bearer eyJhbGciOiJI...          | For auth | Required on protected routes   |

---

## Error Handling

Common error responses from middleware and controllers:

| HTTP | Body Example                                         | Cause                                  |
|-----:|-------------------------------------------------------|----------------------------------------|
| 400  | `{ "success": false, "message": "Invalid email or password" }` | Bad credentials                        |
| 401  | `{ "message": "Authorization token missing" }`               | Missing Bearer token                   |
| 401  | `{ "message": "Invalid token" }`                             | Token invalid or expired               |
| 401  | `{ "message": "user not found" }`                           | Authenticated user not found           |
| 403  | `{ "message": "Access denied: insufficient role" }`         | Lacking required admin role            |
| 500  | `{ "success": false, "message": "Server error" }`          | Unhandled server error                 |

---

## Notes

- The frontend points to `http://localhost:5000/api/auth` (see `frontend/src/api/axios.js`).
- Ensure `JWT_SECRET_KEY` is set before running the server.
- Admin-only route requires the user document to have `role: 'admin'`.

# DroneTV API Documentation

Base URL: `/api` (Vite dev server proxies `/api` to `http://localhost:5000`)

Admin endpoints require `Authorization: Bearer <accessToken>` (obtained via `POST /api/auth/login`).

---

## 1. Authentication Endpoints

| Method | Endpoint | Access | Body | Success |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/auth/login` | Public | `{ email, password }` | `200` : sets refresh cookie, returns `{ accessToken, user }` |
| POST | `/auth/refresh` | Public | None (cookie-based) | `200` : returns new access token |
| POST | `/auth/logout` | Public | None | `200` : clears refresh token cookie |
| GET | `/auth/me` | Admin | None | `200` : returns current authenticated admin |

---

## 2. Enquiries Endpoints

| Method | Endpoint | Access | Body / Query | Success |
| :--- | :--- | :--- | :--- | :--- |
| POST | `/enquiries` | Public | Enquiry fields (below) | `201` : `{ enquiry }` |
| GET | `/enquiries` | Admin | `?page=1&limit=20&status=&userType=&search=&sortBy=createdAt&sortOrder=desc&strategy=offset` | `200` : `{ enquiries, total, page, limit, totalPages, hasMore, nextCursor, strategy, stats }` |
| GET | `/enquiries/:id` | Admin | None | `200` : `{ enquiry }` |
| PUT / PATCH | `/enquiries/:id` | Admin | `{ status, name?, email?, phone?, userType?, interest?, message? }` | `200` : `{ enquiry }` |
| PATCH | `/enquiries/:id/status` | Admin | `{ status }` | `200` : `{ enquiry }` (alias used by client) |
| DELETE | `/enquiries/:id` | Admin | None | `200` : `{ message: "Enquiry deleted" }` |

---

## 3. Enquiry Model Fields

| Field | Type | Validation Rules |
| :--- | :--- | :--- |
| `name` | string | required, 2 to 100 characters, trimmed |
| `email` | string | required, valid email, lowercased |
| `phone` | string | required, `/^\+?[0-9\s-]{7,15}$/` |
| `userType` | enum | `Student` \| `Customer` \| `Other` |
| `interest` | string | required, 1 to 150 characters |
| `message` | string | required, 5 to 2000 characters |
| `status` | enum | `New` \| `Contacted` \| `In Progress` \| `Closed` (default: `New`) |

---

## 4. Query Parameters for GET /enquiries

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | integer | `1` | Page number for offset pagination |
| `limit` | integer | `20` | Records per page (`10`, `20`, `50`, `100`, max 100) |
| `strategy` | string | `offset` | Pagination strategy: `offset` or `cursor` |
| `cursor` | string | - | MongoDB ObjectId for cursor pagination |
| `status` | string | - | Filter by status (`New`, `Contacted`, `In Progress`, `Closed`) |
| `userType` | string | - | Filter by user type (`Student`, `Customer`, `Other`) |
| `search` | string | - | Search keyword across name, email, phone, interest, message |
| `sortBy` | string | `createdAt` | Sort column: `createdAt`, `name`, `status`, `userType` |
| `sortOrder` | string | `desc` | Sort direction: `asc` or `desc` |

---

## 5. Response Codes

- `200` / `201`: Success with JSON payload.
- `400` `{ message: "Validation failed", errors: [{ field, message }] }`: Zod schema validation rejection.
- `401` `{ message: "Not authorized" }`: Missing or invalid JWT token.
- `403` `{ message: "Forbidden" }`: Authenticated user lacks admin role.
- `404` `{ message: "Enquiry not found" }`: Unknown or invalid ObjectId.
- `500` `{ message: "Server error" }`: Unhandled server exception.

Rate Limit: 100 requests per 15 minutes per IP address on `/api` routes.

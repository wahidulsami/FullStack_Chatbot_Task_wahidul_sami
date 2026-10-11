# API

Base URL: `/api` (Vite dev server proxies `/api` → `http://localhost:5000`)

Admin endpoints require `Authorization: Bearer <accessToken>` (from `POST /api/auth/login`).

## Auth

| Method | Endpoint        | Access | Body                          | Success |
| ------ | --------------- | ------ | ----------------------------- | ------- |
| POST   | `/auth/login`   | Public | `{ email, password }`         | `200` — sets refresh cookie, returns `{ accessToken, user }` |
| POST   | `/auth/refresh` | Public | — (cookie based)              | `200` — new access token |
| POST   | `/auth/logout`  | Public | —                             | `200` — clears cookie |
| GET    | `/auth/me`      | Admin  | —                             | `200` — current admin |

## Enquiries

| Method | Endpoint            | Access | Body / Query | Success |
| ------ | ------------------- | ------ | ------------ | ------- |
| POST   | `/enquiries`        | Public | enquiry fields (below) | `201` — `{ enquiry }` |
| GET    | `/enquiries`        | Admin  | `?status=&userType=`   | `200` — `{ enquiries, count }` |
| GET    | `/enquiries/:id`    | Admin  | —            | `200` — `{ enquiry }` |
| PATCH  | `/enquiries/:id`    | Admin  | `{ status }` | `200` — `{ enquiry }` |
| PATCH  | `/enquiries/:id/status` | Admin | `{ status }` | `200` — `{ enquiry }` (alias used by the client) |
| DELETE | `/enquiries/:id`    | Admin  | —            | `200` — `{ message }` |

### Enquiry fields

| Field     | Type | Rules |
| --------- | ---- | ----- |
| `name`    | string | required, 2–100 chars, trimmed |
| `email`   | string | required, valid email, lowercased |
| `phone`   | string | required, `/^\+?[0-9\s-]{7,15}$/` |
| `userType`| enum | `Student` \| `Customer` \| `Other` |
| `interest`| string | required, ≤ 150 chars |
| `message` | string | required, 5–5000 chars |
| `status`  | enum | `New` \| `Contacted` \| `In Progress` \| `Closed` — settable by admin only, defaults to `New` |

### Responses

- `400` `{ message: "Validation failed", errors: [{ field, message }] }` — Zod rejection
- `401` `{ message: "Not authorized" }` — missing/invalid token
- `403` `{ message: "Forbidden" }` — authenticated but not an admin
- `404` `{ message: "Enquiry not found" }` — unknown or invalid ObjectId
- `500` `{ message: "Server error" }`

Rate limit: 100 requests / 15 min per IP on all `/api` routes.

# Database Setup & Schema Documentation

This project uses **MongoDB** (via **Mongoose ODM**) to store visitor enquiries and authenticated admin credentials.

---

## 1. Connection Configuration

The database connection is managed in [`server/src/config/db.ts`](file:///home/sami/FullStack_Chatbot_Task_Wahidul_sami/FullStack_Chatbot_Task_wahidul_sami/server/src/config/db.ts).

### Environment Variables (`server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xdpsgfn.mongodb.net/?appName=Cluster0
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Admin credentials for seeding
ADMIN_NAME=Site Admin
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_strong_password_here
```

The database name is set to `chatbot_wahidul_sami` with `authSource="admin"`.

---

## 2. Collections & Schemas

### `enquiries` Collection

Stores visitor enquiries submitted through the rule-based Chatbot assistant and the Contact page form.

| Field | Type | Required | Constraints / Validation |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | 2 to 100 characters, trimmed |
| `email` | String | Yes | Lowercased, valid email regex |
| `phone` | String | Yes | Standard phone regex (`/^\+?[0-9\s-]{7,15}$/`) |
| `userType` | String | Yes | Enum: `Student`, `Customer`, `Other` |
| `interest` | String | Yes | Topic or service of interest (up to 150 chars) |
| `message` | String | Yes | 5 to 2000 characters |
| `status` | String | Default: `New` | Enum: `New`, `Contacted`, `In Progress`, `Closed` |
| `createdAt` | Date | Auto | Timestamps enabled |
| `updatedAt` | Date | Auto | Timestamps enabled |

**Indexes:**
- `{ status: 1, userType: 1 }`: Fast compound filtering on admin dashboard.
- `{ status: 1, createdAt: -1 }`: Rapid status filtering with reverse-chronological sorting.
- `{ userType: 1, createdAt: -1 }`: Fast user type filtering with reverse-chronological sorting.
- `{ name: 1, createdAt: -1 }`: Optimized sorting by name with secondary timestamp sort.
- `{ createdAt: -1 }`: Rapid default reverse-chronological sorting.

---

### `users` Collection

Stores administrative accounts authorized to manage enquiries in the Admin Dashboard.

| Field | Type | Required | Constraints / Validation |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | Admin full name |
| `email` | String | Yes | Unique, lowercased, valid email |
| `password` | String | Yes | Bcrypt hash (salted, `select: false` by default) |
| `role` | String | Default: `admin` | Enum: `admin` |

---

## 3. Seed Scripts & Demo Fixture Policy

### Data Isolation Policy
Per project compliance, test fixtures must never appear to be real customer submissions or official DroneTV records. All demo fixtures are explicitly tagged with `[DEMO]` in the name and message fields.

### Commands

| Command | Purpose |
| :--- | :--- |
| `npm run seed:admin` | One-time admin user creation using `ADMIN_*` variables in `server/.env`. Passwords are encrypted using bcrypt before storage. |
| `npm run seed:demo` | Inserts or updates 55 verified, isolated demo enquiries tagged with `[DEMO]` spanning across 45 days. |
| `npm run seed:demo -- --clean` | Clears all prior test/junk records and seeds fresh, clearly labeled demo fixtures. |

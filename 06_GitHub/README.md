# DroneTV - Full Stack AI Support & Lead Assistant

A Full Stack AI Support and Lead Assistant web application developed for the IPAGE Group internship assignment, built with React, TypeScript, Vite, Tailwind CSS v4, Redux Toolkit, Express, MongoDB, and Mongoose.

Audited and aligned with real, publicly verifiable business information from [DroneTV](https://www.dronetv.in/) (Voice of Drone Technology, GIS, and AI Technologies).

---

## 1. Project Overview & Business Audit

DroneTV (`dronetv.in`) is India's dedicated digital media platform and industry marketplace aggregator uniting drone manufacturers, commercial pilots, GIS and AI specialists, buyers, and policymakers.

### Verified Facts Implemented
- **Leadership & Ecosystem:** Founded by Dev R (Founder of Drone TV, India Drone Academy, and IPAGE UM Services).
- **Core Headquarters:** DroneTv 5A/6B, White Waters, Timber Lake Colony, Shaikpet, Hyderabad, Telangana, India.
- **Official Inquiries Email:** `bd@dronetv.in`
- **Helplines:** +91 8882210038 / +91 9354688923 (including Drone Doctor Technical Support Help Line).
- **Official Social Channels:** YouTube (`@indiadronetv`), Instagram (`@dronetv.in`), Facebook (`dronetv.in`), X (`@indiadronetv`).
- **Events & Media Partnerships:** Official Media Partner for **Drone Expo 2025 (Hyderabad)**; Official portal launch at Drone Expo Curtain Raiser (Goregaon, Mumbai); coverage of Drone Expo Mumbai Edition.
- **Featured Coverage:** Interviews with CropWings (Gowrav Reddy), Corteva (Teja), Carbon Light (Rini Bansal), XBOOM underwater drones (Kalyan), RPTO Association (Dr. Pranay Kumar), IlaAgri.
- **Ecosystem Collaborators:** Telangana Govt, Andhra Govt, Odisha Govt, Corteva, Aparna, APGENCO, NCC Urban, Pioneer, IPAGE UMS, Dev AI Labs.

### Handling Unverified Data
- **Course Fees & Timelines:** DroneTV collaborates with DGCA-authorized Remote Pilot Training Organizations (RPTOs) and universities rather than publishing fixed proprietary tuition rates.
- The assistant and web pages transparently state that course fees and batch schedules require partner confirmation, offering a built-in enquiry form to collect visitor requests without inventing unverified claims.

---

## 2. Tech Stack

### Frontend (`client/`)
- **React 19** with **TypeScript** and **Vite**
- **Tailwind CSS v4** with shadcn/ui base tokens
- **Redux Toolkit** for centralized enquiry and authentication state management
- **React Hook Form** + **Zod** schema resolver for strictly typed form validation
- **Lucide React** iconography
- **Web Audio API** feedback (subtle chimes on initial page landing, message arrival, and successful submission)

### Backend (`server/`)
- **Node.js** + **Express** + **TypeScript**
- **MongoDB** + **Mongoose** (Connection to `chatbot_wahidul_sami`)
- **JWT Authentication** (Short-lived access token + httpOnly refresh cookie)
- **Bcrypt** password hashing with salted rounds
- **Zod** request validation middleware
- **Helmet**, **CORS**, and **express-rate-limit** security protection

---

## 3. Key Features

1. **Rule-Based Chatbot Assistant:**
   - 7 vertical quick question buttons supporting core visitor queries.
   - Natural keyword stemming in English and Bengali.
   - Real-time 500ms typing indicator and interactive audio feedback.
   - Intelligent unverified enquiry routing with direct in-chat lead capture form.
   - Session conversation history reset and clear options.

2. **Double-Bezel Hardware Architecture:**
   - Physical hardware enclosure framing (`p-1.5` outer shell, concentric inner card surface).
   - Yellow action buttons with nested directional pills.
   - Floating fluid island navigation with responsive mobile/tablet drawer.
   - Light, Dark, and System theme dropdown switching.

3. **Lead & Enquiry Management:**
   - Public enquiry submission via Chatbot or Contact page.
   - Dual-layer frontend and backend input validation (Zod schemas).
   - Strict message length controls with keyboard and clipboard guards.
   - Stored in MongoDB with status tracking (`New`, `Contacted`, `In Progress`, `Closed`).
   - Compound indexes for sub-millisecond filtering and reverse-chronological sorting.

4. **Authenticated Admin Portal & Server-Side Pagination:**
   - Secure login with bcrypt authentication and JWT tokens.
   - Production server-side pagination with configurable page sizes (10, 20, 50, 100 records).
   - Real-time debounced keyword search, status filtering, and userType segmentation.
   - Bi-directional column sorting (Date, Name, Status, User Type) across the full dataset.
   - Status updates, detailed inspection drawer, and deletion controls.

---

## 4. Project Structure

```
FullStack_Chatbot_Task_wahidul_sami/
├── 06_GitHub/                   # Submission package folder for GitHub link & README
│   ├── GitHub_Repository_Link.txt
│   └── README.md
├── client/                     # React 19 + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/         # UI components & Double-Bezel layout
│   │   │   ├── Chatbot/        # Rule-based chatbot & audio chimes
│   │   │   ├── admin/          # Admin table, status dropdowns, details drawer
│   │   │   └── ui/             # shadcn/ui primitives
│   │   ├── data/               # Verified chatbot knowledge base
│   │   ├── pages/              # Home, Services, Courses, Contact, Admin Login, Dashboard
│   │   ├── services/           # Axios API services (auth, enquiries)
│   │   ├── store/              # Redux Toolkit slices (authSlice, enquiriesSlice)
│   │   └── validation/         # Zod schemas (mirrors server validation)
├── server/                     # Express + TypeScript backend
│   ├── src/
│   │   ├── config/             # MongoDB connection configuration
│   │   ├── controllers/        # Enquiry & Auth route handlers
│   │   ├── middleware/         # JWT auth guard, role check, validation
│   │   ├── models/             # Mongoose schemas (Enquiry, Admin User)
│   │   ├── routes/             # REST endpoints (/api/auth, /api/enquiries)
│   │   └── scripts/            # Admin seed & demo fixture scripts
├── database/                   # Database schema and setup documentation
├── docs/                       # REST API endpoint specification and video script
└── screenshots/                # 11 high-resolution application screenshots
```

---

## 5. Setup & Installation Instructions

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB**: Local MongoDB instance or MongoDB Atlas connection string

### Step-by-Step Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/wahidulsami/FullStack_Chatbot_Task_wahidul_sami.git
   cd FullStack_Chatbot_Task_wahidul_sami
   ```

2. **Install dependencies:**
   ```bash
   # Install backend dependencies
   npm --prefix server install

   # Install frontend dependencies
   npm --prefix client install
   ```

3. **Configure Environment Variables:**
   Create `.env` inside the `server/` directory:
   ```bash
   cp .env.example server/.env
   ```
   Or create `server/.env` manually with the following values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xdpsgfn.mongodb.net/chatbot_wahidul_sami?retryWrites=true&w=majority
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173

   JWT_ACCESS_SECRET=your_32_character_random_access_secret_here
   JWT_REFRESH_SECRET=your_32_character_random_refresh_secret_here
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d

   ADMIN_NAME=Wahidul Sami
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_secure_password_here
   ```

4. **Seed Database:**
   ```bash
   cd server

   # Seed default admin user (reads ADMIN_* from server/.env)
   npm run seed:admin

   # Seed isolated demo records tagged with [DEMO] (optional)
   npm run seed:demo -- --clean
   ```

5. **Run Development Servers:**
   - **Backend API Server (Port 5000):**
     ```bash
     cd server
     npm run dev
     ```
   - **Frontend Vite Client (Port 5173):**
     ```bash
     # Open a separate terminal
     cd client
     npm run dev
     ```
   - Access the application at `http://localhost:5173`.
   - Access the Admin Portal by clicking the top right **Admin Login** button.

---

## 6. Environment Variables Reference

| Variable | Scope | Required | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | Backend | Yes | Port on which the Express server listens (default: `5000`) |
| `MONGODB_URI` | Backend | Yes | MongoDB connection URI string including database name |
| `NODE_ENV` | Backend | Yes | Runtime environment (`development` or `production`) |
| `CLIENT_URL` | Backend | Yes | Allowed frontend origin for CORS (default: `http://localhost:5173`) |
| `JWT_ACCESS_SECRET` | Backend | Yes | Secret key used to sign access JWT tokens |
| `JWT_REFRESH_SECRET` | Backend | Yes | Secret key used to sign refresh JWT tokens |
| `JWT_ACCESS_EXPIRES_IN` | Backend | Yes | Expiration duration for access tokens (e.g. `15m`) |
| `JWT_REFRESH_EXPIRES_IN`| Backend | Yes | Expiration duration for refresh tokens (e.g. `7d`) |
| `ADMIN_NAME` | Backend | Yes | Full name used when seeding the initial administrator |
| `ADMIN_EMAIL` | Backend | Yes | Email address for initial admin login credentials |
| `ADMIN_PASSWORD` | Backend | Yes | Plaintext password hashed via bcrypt during seeding |

---

## 7. Database Setup & Architecture

This application uses **MongoDB** connected through **Mongoose ODM**.

### Database Name
- Default database: `chatbot_wahidul_sami`

### 1. `enquiries` Collection
Stores enquiries submitted via the rule-based Chatbot assistant and the Contact page form.

| Field | Type | Required | Constraints & Validation |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | 2 to 100 characters, trimmed |
| `email` | String | Yes | Valid email format, normalized to lowercase |
| `phone` | String | Yes | Standard phone pattern `/^\+?[0-9\s-]{7,15}$/` |
| `userType` | String | Yes | Enum: `Student`, `Customer`, `Other` |
| `interest` | String | Yes | Topic or service of interest (up to 150 chars) |
| `message` | String | Yes | 5 to 2000 characters, trimmed |
| `status` | String | Default `New` | Enum: `New`, `Contacted`, `In Progress`, `Closed` |
| `createdAt` | Date | Auto | Timestamps enabled |
| `updatedAt` | Date | Auto | Timestamps enabled |

**Optimized Indexes:**
- `{ status: 1, userType: 1 }`: Fast compound filtering on the admin dashboard.
- `{ status: 1, createdAt: -1 }`: Status filtering with reverse-chronological sorting.
- `{ userType: 1, createdAt: -1 }`: User type filtering with reverse-chronological sorting.
- `{ name: 1, createdAt: -1 }`: Name sorting with secondary timestamp sort.
- `{ createdAt: -1 }`: Fast default reverse-chronological sorting.

### 2. `users` Collection
Stores administrative accounts authorized to manage enquiries in the Admin Dashboard.

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | Yes | Administrator full name |
| `email` | String | Yes | Unique, lowercased, valid email format |
| `password` | String | Yes | Salted bcrypt hash (`select: false` by default) |
| `role` | String | Default `admin` | Enum: `admin` |

### Database Seeding Commands
```bash
# In server/ directory:
npm run seed:admin           # Creates initial admin user
npm run seed:demo            # Inserts 55 demo records tagged with [DEMO]
npm run seed:demo -- --clean # Purges prior fixtures and reseeds cleanly
```

---

## 8. REST API Endpoints

Base URL: `/api` (Vite dev server proxies `/api` to `http://localhost:5000`)

### Authentication Endpoints

| Method | Endpoint | Access | Request Body | Response | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Public | `{ email, password }` | `200 OK` + HTTP-only refresh cookie | Authenticates admin and returns access token |
| `POST` | `/api/auth/refresh` | Public | Cookie-based | `200 OK` | Refreshes expired access token |
| `POST` | `/api/auth/logout` | Public | None | `200 OK` | Clears refresh token cookie |
| `GET` | `/api/auth/me` | Protected | Bearer Token | `200 OK` | Returns current authenticated admin profile |

### Enquiries Endpoints

| Method | Endpoint | Access | Request Body / Query Params | Response | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/enquiries` | Public | `{ name, email, phone, userType, interest, message }` | `201 Created` | Submits a new lead enquiry |
| `GET` | `/api/enquiries` | Protected | `?page=1&limit=20&status=&userType=&search=&sortBy=createdAt&sortOrder=desc` | `200 OK` | Retrieves paginated enquiries with stats and filtering |
| `GET` | `/api/enquiries/:id` | Protected | None | `200 OK` | Retrieves single enquiry by ID |
| `PUT / PATCH` | `/api/enquiries/:id` | Protected | `{ status, name?, email?, phone?, userType?, interest?, message? }` | `200 OK` | Updates enquiry details or status |
| `PATCH` | `/api/enquiries/:id/status`| Protected | `{ status }` | `200 OK` | Dedicated status update endpoint |
| `DELETE` | `/api/enquiries/:id` | Protected | None | `200 OK` | Deletes an enquiry permanently |

### GET /api/enquiries Query Parameters

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `page` | Integer | `1` | Page number for offset pagination |
| `limit` | Integer | `20` | Items per page (options: `10`, `20`, `50`, `100`, max 100) |
| `strategy` | String | `offset` | Pagination strategy (`offset` or `cursor`) |
| `cursor` | String | None | Cursor identifier for cursor-based pagination |
| `status` | String | None | Filter by status (`New`, `Contacted`, `In Progress`, `Closed`) |
| `userType` | String | None | Filter by user type (`Student`, `Customer`, `Other`) |
| `search` | String | None | Debounced search term across name, email, phone, interest, and message |
| `sortBy` | String | `createdAt` | Sort field (`createdAt`, `name`, `status`, `userType`) |
| `sortOrder` | String | `desc` | Sort direction (`asc` or `desc`) |

### Standard Response Codes
- `200 OK`: Request succeeded with JSON response payload.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Input validation failed (returns structured field-level Zod error messages).
- `401 Unauthorized`: Missing or expired access token.
- `403 Forbidden`: User lacks necessary role permissions.
- `404 Not Found`: Requested enquiry or route does not exist.
- `429 Too Many Requests`: Rate limit threshold exceeded (100 requests per 15 minutes per IP).
- `500 Internal Server Error`: Unhandled server exception with sensitive details masked.

---

## 9. Application Screenshots

### 1. Landing & Home Page
Double-bezel hardware architecture, real DroneTV ecosystem stats, verified partners, and quick CTA actions.

![Landing Page](screenshots/01_hero_landing_page.png)

### 2. Interactive Chat Launcher
Floating bottom-right assistant trigger with attention badge and prompt tooltip.

![Chat Launcher Tooltip](screenshots/02_chat_launcher_tooltip.png)

### 3. Rule-Based Chatbot Assistant
Clean floating chat window with 7 vertical quick question options and 500ms typing indicator.

![Chatbot Interface](screenshots/03_chatbot_interface.png)

### 4. In-Chat Lead Enquiry Form
Direct lead capture embedded inside the chat conversation for seamless visitor conversion.

![Chatbot Enquiry Form](screenshots/04_chatbot_enquiry_form.png)

### 5. Courses & Training Section
DGCA Remote Pilot Certification, GIS Photogrammetry, Precision Agriculture, and Infrastructure Inspection pathways with clear partner policy notice.

![Courses and Training](screenshots/05_courses_training_page.png)

### 6. Services Section
Digital Media & Video Broadcast, Drone & GIS Marketplace, Drone Doctor Helpline, and Advertising & Brand Sponsorship.

![Services Page](screenshots/06_services_page.png)

### 7. Contact Page & Real-Time Validation
Official DroneTV headquarters address, helplines, operating hours, and live Zod validation feedback.

![Contact Form Validation](screenshots/07_contact_page_validation.png)

### 8. Admin Login Portal (Light Mode)
Clean double-bezel card enclosure with interactive theme switcher.

![Admin Login Light](screenshots/08_admin_login_light.png)

### 9. Admin Login Portal (Dark Mode)
Dark mode login interface with secure password mask and input validation.

![Admin Login Dark](screenshots/09_admin_login_dark.png)

### 10. Admin Dashboard Overview
Metrics counter cards (Total, New, Active, Closed), status indicators, and responsive data table.

![Admin Dashboard Overview](screenshots/10_admin_dashboard_overview.png)

### 11. Admin Search, Filtering & Pagination
Debounced keyword search, category dropdown filters, and server-side pagination controls.

![Admin Dashboard Search & Filter](screenshots/11_admin_dashboard_search_filter.png)

---

## 10. Git Workflow & Clean Commit History

The repository strictly follows conventional commits with clear, atomic, and descriptive commit messages documenting feature implementation, refactoring, and UI improvements.

Full commit history can be viewed on GitHub:
[https://github.com/wahidulsami/FullStack_Chatbot_Task_wahidul_sami/commits/main](https://github.com/wahidulsami/FullStack_Chatbot_Task_wahidul_sami/commits/main)

### Sample Commit History
```
87d7620 feat: improve keyboard accessibility in ChatLauncher and enhance z-index for Select component
6ea490d feat: enhance enquiry management with input validation, pagination, and updated API endpoints
2258030 feat: enhance enquiry management with pagination, filtering, and statistics
8092a49 feat: update validation rules for enquiry form and improve error handling
0e8ab32 feat: update input validation and UI components for improved user experience
2a0e2b2 feat: enhance layout and add new components for home page
a2e66df refactor: layout and navbar components for improved responsiveness and styling
9c9f1b2 feat: enhance Chatbot UI with improved layout, add streaming text effect, and update footer
ab9e924 feat: revamp Home and Services pages with updated content and structure
b047ffd refactor: update component styles to use rounded-xl for consistency across UI elements
97c559b feat: update UI components for consistency and enhance theme provider default to dark mode
4c0a8df feat: add no-scrollbar utility and apply scrollbar styles globally
8f6e457 feat: enhance admin dashboard and login UI, improve enquiry handling, and update contact page layout
```

---

## 11. Verification & Testing

Verify system stability across both frontend and backend using standard build and test commands:

```bash
# Server TypeScript type check:
cd server && npx tsc --noEmit

# Client Linting:
cd client && npm run lint

# Client Production Build:
cd client && npm run build
```

---

## 12. Submission Details

- **Candidate Name:** Wahidul Islam Sami
- **GitHub Repository:** [FullStack_Chatbot_Task_wahidul_sami](https://github.com/wahidulsami/FullStack_Chatbot_Task_wahidul_sami)
- **Primary Branch:** `main`
- **Submission Folder:** `06_GitHub`

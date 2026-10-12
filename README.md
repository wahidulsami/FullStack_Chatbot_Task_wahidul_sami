# DroneTV - Full Stack AI Support & Lead Assistant

A Full Stack AI Support and Lead Assistant application developed for the IPAGE Group internship assignment, built with React, TypeScript, Vite, Tailwind CSS v4, Redux Toolkit, Express, MongoDB, and Mongoose.

Audited and aligned with real, publicly verifiable business information from [DroneTV](https://www.dronetv.in/) (Voice of Drone Technology, GIS, and AI Technologies).

---

## 1. Project Overview & Business Audit

DroneTV (`dronetv.in`) is India's dedicated digital media platform and industry marketplace aggregator uniting drone manufacturers, commercial pilots, GIS & AI specialists, buyers, and policymakers.

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
- **React Hook Form** + **Zod** schema resolver
- **Lucide React** iconography
- Web Audio feedback (chimes for message arrivals and submissions)

### Backend (`server/`)
- **Node.js** + **Express** + **TypeScript**
- **MongoDB** + **Mongoose** (Connection to `chatbot_wahidul_sami`)
- **JWT Authentication** (Short-lived access token + httpOnly refresh cookie)
- **Bcrypt** password hashing with salted rounds
- **Zod** request validation middleware
- **Helmet**, **CORS**, and **express-rate-limit** security protection

---

## 3. Key Features

1. **Rule-Based Assistant Knowledge Base:**
   - 7 vertical quick question buttons.
   - Natural keyword stemming in English and Bengali.
   - Real-time 500ms typing indicator and interactive chime feedback.
   - Intelligent unverified enquiry routing with direct in-chat lead form.
2. **Double-Bezel Hardware Architecture:**
   - Physical hardware enclosure framing (`p-1.5` outer shell, concentric inner card surface).
   - Yellow action buttons with nested directional pills.
   - Floating fluid island navigation with responsive mobile/tablet drawer.
3. **Lead & Enquiry Management:**
   - Public enquiry submission via Chatbot or Contact page.
   - Strict validation capping message length to 2000 characters with keyboard and clipboard guards.
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
├── client/                     # React 19 + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/         # UI components & Double-Bezel layout
│   │   │   ├── Chatbot/        # Rule-based chatbot & audio chimes
│   │   │   └── admin/          # Admin table, status dropdowns, details
│   │   ├── data/               # Verified chatbot knowledge base
│   │   ├── pages/              # Home, Services, Courses, Contact, Admin
│   │   ├── services/           # Axios API services
│   │   ├── store/              # Redux slices (auth, enquiries)
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
├── docs/                       # REST API endpoint documentation
└── screenshots/                # Application screenshots
```

---

## 5. Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm
- MongoDB Atlas cluster or local MongoDB instance

### Installation

1. **Clone the repository and install dependencies:**
   ```bash
   cd FullStack_Chatbot_Task_wahidul_sami
   npm --prefix server install
   npm --prefix client install
   ```

2. **Configure Environment Variables:**
   Create `.env` in `server/`:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173

   JWT_ACCESS_SECRET=your_32_character_random_access_secret
   JWT_REFRESH_SECRET=your_32_character_random_refresh_secret
   JWT_ACCESS_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=7d

   ADMIN_NAME=Site Admin
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_strong_password
   ```

3. **Database Seeding:**
   ```bash
   cd server
   # Create admin account
   npm run seed:admin

   # Seed clearly tagged demo fixtures (optional)
   npm run seed:demo -- --clean
   ```

4. **Run the Development Servers:**
   - **Backend:**
     ```bash
     cd server
     npm run dev
     ```
   - **Frontend (in a separate terminal):**
     ```bash
     cd client
     npm run dev
     ```
   - Open `http://localhost:5173` in your browser.

---

## 6. Seed Data & Demo Isolation Policy

Test fixtures are strictly tagged with `[DEMO]` in the name and message fields to prevent confusion with genuine visitor enquiries. Demo records can be reset or purged at any time using `npm run seed:demo -- --clean`.

---

## 7. Verification & Testing

- Server TypeScript Typecheck: `npx tsc --noEmit`
- Client Linter: `npm run lint`
- Client Production Build: `npm run build`
- Endpoints verified: Public enquiry submission, JWT login, admin token refresh, enquiry filtering, status patch, and deletion.

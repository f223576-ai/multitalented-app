# 🧩 Multitalented App

A full-stack **MERN** (MongoDB, Express, React, Node) productivity platform that combines multiple everyday tools — task management, note-taking, a personal dashboard, and profile management — into a single, unified application.

Built with a modular, feature-based architecture so new capabilities (chat, file storage, admin panel) can be added without touching existing code.

---

## ✨ Features

| Module | Description |
|---|---|
| 🔐 **Authentication** | JWT-based register/login, secure password hashing with bcrypt |
| 📊 **Dashboard** | Real-time aggregated stats (tasks, notes) and recent activity feed |
| ✅ **Tasks** | Create, update status (pending → in-progress → completed), and delete tasks |
| 📝 **Notes** | Create, pin/unpin, and delete notes with tags support |
| 👤 **Profile** | Update name and change password securely |
| 📱 **Responsive UI** | Collapsible sidebar navigation with mobile-friendly hamburger menu |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- React Router v6 (client-side routing & protected routes)
- Axios (API communication with auto token injection)
- Context API (authentication state management)

**Backend**
- Node.js + Express.js
- MongoDB + Mongoose (ODM)
- JWT (`jsonwebtoken`) for stateless authentication
- bcrypt for password hashing
- CORS-enabled REST API

---

## 📁 Project Structure
---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/try/download/community) running locally, or a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd multitalented-app
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in `server/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/multitalented
JWT_SECRET=your_super_secret_key_change_this
CLIENT_URL=http://localhost:5173
```

Start the server:
```bash
npx nodemon server.js
```
Server runs on **http://localhost:5000**

### 3. Frontend Setup
```bash
cd ../client
npm install
npm run dev
```
App runs on **http://localhost:5173**

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login and receive JWT | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Tasks
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/tasks` | Get all user's tasks | Yes |
| POST | `/api/tasks` | Create a task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

### Notes
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/notes` | Get all user's notes | Yes |
| POST | `/api/notes` | Create a note | Yes |
| PUT | `/api/notes/:id` | Update a note | Yes |
| DELETE | `/api/notes/:id` | Delete a note | Yes |

### Dashboard
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/dashboard` | Get aggregated stats + recent activity | Yes |

### Profile
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| GET | `/api/profile` | Get current profile | Yes |
| PUT | `/api/profile` | Update name/avatar/settings | Yes |
| PUT | `/api/profile/password` | Change password | Yes |

> All protected routes require an `Authorization: Bearer <token>` header.

---

## 🔒 Authentication Flow

1. User registers or logs in → server returns a signed JWT
2. Token is stored in `localStorage` on the client
3. Axios interceptor automatically attaches `Authorization: Bearer <token>` to every request
4. Backend `protect` middleware verifies the token and attaches the authenticated user to `req.user`
5. Every Task/Note query is scoped to `req.user._id`, ensuring users only ever see their own data

---

## 🎨 Design System

The UI uses a custom maroon–blush color palette applied consistently across every page:

| Color | Hex | Usage |
|---|---|---|
| Darkest | `#481E28` | Headings, primary text |
| Dark | `#733040` | Secondary text |
| Primary | `#BD6077` | Buttons, active states, links |
| Medium | `#CF8B9C` | Muted accents |
| Light | `#E1B6C1` | Borders, input outlines |
| Lightest | `#F3E1E6` | Page background |
| Accent | `#752300` | Error/destructive actions |
| Gold | `#B79C2E` | Success/completed states |

---

## 🗺️ Roadmap (v2 Ideas)

- [ ] Real-time chat/messaging (Socket.io)
- [ ] File manager with cloud storage (Cloudinary/S3)
- [ ] Admin panel with user management
- [ ] Dockerized deployment with CI/CD (GitHub Actions)
- [ ] Automated testing (Jest, Supertest, Cypress)

---

## 📄 License

This project is open for educational and portfolio use.

---

## 👤 Author

**Hafsa** — Final-year Computer Science student, QA Automation & MERN Developer

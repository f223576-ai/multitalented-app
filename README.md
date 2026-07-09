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

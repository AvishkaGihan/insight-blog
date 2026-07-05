<div align="center">

# 🔍 Insight

### A modern, full-stack developer blogging platform

![Cover](/assets/cover.png)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg)](https://www.mongodb.com/)

**Insight** is a premium MERN-stack blogging platform crafted for developers. Write, publish and discuss technical articles on JavaScript, React, Next.js, and beyond — with a clean dark-mode UI, rich commenting, and a full-featured admin dashboard.

[Live Demo](#) · [Report a Bug](https://github.com/AvishkaGihan/insight-blog/issues) · [Request a Feature](https://github.com/AvishkaGihan/insight-blog/issues)

</div>

---

## 📸 Screenshots

### 🏠 Home Page
![Home Page](/assets/home.png)

### 📄 Post Page
![Post Page](/assets/post.png)

### 🔎 Search & Explore
![Search Page](/assets/search.png)

### 🛠️ Projects
![Projects Page](/assets/projects.png)

### 🔐 Sign In
![Sign In Page](/assets/sign-in.png)

### ✍️ Sign Up
![Sign Up Page](/assets/sign-up.png)

### 📊 Admin Dashboard
![Admin Dashboard](/assets/dashboard-main.png)

### 👤 Profile Management
![Profile Page](/assets/dashboard-profile.png)

### 📝 Manage Posts
![Dashboard Posts](/assets/dashboard-posts.png)

### 👥 Manage Users
![Dashboard Users](/assets/dashboard-users.png)

### 💬 Manage Comments
![Dashboard Comments](/assets/dashboard-comments.png)

### ✏️ Create Post
![Create Post](/assets/create-post.png)

### 🔄 Update Post
![Update Post](/assets/update-post.png)

---

## ✨ Features

### For Readers
- 📖 Browse and read rich-text technical articles across JavaScript, React, Next.js, and more
- 🔎 Full-text search and category filtering to find the exact content you need
- 💬 Comment on posts and engage with the author community
- 👍 Like / 👎 dislike comments to surface the best discussions
- 🌗 Seamless dark / light mode toggle

### For Authors
- ✍️ Rich text post editor with image upload support
- 🏷️ Categorise posts by technology (JavaScript, React, Next.js…)
- 🔗 Auto-generated URL slugs from post titles
- 📷 Custom cover image per post

### For Admins
- 📊 Overview dashboard with user, post, and comment stats
- 👥 Full user management (view, delete)
- 📝 Full post management (view, edit, delete)
- 💬 Full comment moderation (view, delete)

### General
- 🔐 Secure JWT-based authentication with HTTP-only cookies
- 🔑 Google OAuth sign-in via Firebase
- 📱 Fully responsive design (mobile, tablet, desktop)
- ⚡ Fast, optimised Vite build pipeline

---

## 🏗️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| [React 18](https://reactjs.org/) | UI component library |
| [React Router v6](https://reactrouter.com/) | Client-side routing |
| [Redux Toolkit](https://redux-toolkit.js.org/) | Global state management |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Flowbite React](https://flowbite-react.com/) | Pre-built UI components |
| [Firebase Auth](https://firebase.google.com/products/auth) | Google OAuth |
| [Vite](https://vitejs.dev/) | Build tool & dev server |

### Backend
| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime |
| [Express.js](https://expressjs.com/) | REST API framework |
| [MongoDB](https://www.mongodb.com/) | Document database |
| [Mongoose](https://mongoosejs.com/) | MongoDB ODM |
| [JSON Web Tokens](https://jwt.io/) | Stateless authentication |
| [bcryptjs](https://www.npmjs.com/package/bcryptjs) | Password hashing |
| [cookie-parser](https://www.npmjs.com/package/cookie-parser) | HTTP cookie middleware |

---

## 📁 Project Structure

```
insight-blog/
├── api/                        # Express.js backend
│   ├── controllers/            # Route handler logic
│   ├── models/                 # Mongoose schemas (User, Post, Comment)
│   ├── routes/                 # API route definitions
│   ├── utils/                  # Middleware (auth, error handling)
│   ├── seed.js                 # Database seeder script
│   └── index.js                # Express app entry point
│
├── client/                     # React frontend (Vite)
│   ├── public/
│   └── src/
│       ├── components/         # Reusable UI components
│       ├── pages/              # Route-level page components
│       ├── redux/              # Redux store, slices
│       ├── firebase.js         # Firebase config
│       ├── App.jsx             # Root component with route definitions
│       └── main.jsx            # Vite entry point
│
├── assets/                     # Project screenshots & media
├── .env                        # Environment variables (not committed)
├── package.json                # Root package (backend)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) **v18 or higher**
- [npm](https://www.npmjs.com/) v9+
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account **or** a local MongoDB instance
- A [Firebase](https://firebase.google.com/) project (for Google OAuth)

### 1. Clone the Repository

```bash
git clone https://github.com/AvishkaGihan/insight-blog.git
cd insight-blog
```

### 2. Configure Environment Variables

Create a `.env` file in the **root** of the project:

```env
# MongoDB connection URI
MONGO=mongodb+srv://<username>:<password>@cluster.mongodb.net/insight-blog

# Secret used to sign JWTs — use a long, random string
JWT_SECRET=your_super_secret_jwt_key

# Firebase config (from your Firebase project settings)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
```

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

### 3. Install Dependencies

**Backend** (from the project root):
```bash
npm install
```

**Frontend** (from the `client/` directory):
```bash
cd client
npm install
```

### 4. Seed the Database (Optional)

Populate the database with sample users, posts, and comments:

```bash
npm run seed
```

This creates:
- 5 users (1 admin + 4 regular), all with password `password123`
- 12 sample blog posts across JavaScript, React, and Next.js categories
- 20 sample comments

To **reset** the database (clear all data):
```bash
npm run seed:reset
```

Seed credentials:
| Role | Email | Password |
|---|---|---|
| Admin | `admin@insight.com` | `password123` |
| User | `john@example.com` | `password123` |
| User | `jane@example.com` | `password123` |

### 5. Run the Application

In **two separate terminals**:

**Terminal 1 — Backend API** (runs on `http://localhost:3000`):
```bash
npm run dev
```

**Terminal 2 — Frontend Dev Server** (runs on `http://localhost:5173`):
```bash
cd client
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔌 API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user | Public |
| `POST` | `/api/auth/signin` | Sign in and receive a JWT cookie | Public |
| `POST` | `/api/auth/google` | Sign in with Google | Public |
| `POST` | `/api/auth/signout` | Clear auth cookie | Private |
| `GET` | `/api/user/getusers` | Get all users (paginated) | Admin |
| `PUT` | `/api/user/update/:userId` | Update user profile | Private |
| `DELETE` | `/api/user/delete/:userId` | Delete a user | Admin |
| `GET` | `/api/post/getposts` | Get posts (with search & filter) | Public |
| `POST` | `/api/post/create` | Create a new post | Admin |
| `PUT` | `/api/post/updatepost/:postId/:userId` | Update a post | Admin |
| `DELETE` | `/api/post/deletepost/:postId/:userId` | Delete a post | Admin |
| `GET` | `/api/comment/getPostComments/:postId` | Get comments for a post | Public |
| `POST` | `/api/comment/create` | Create a comment | Private |
| `PUT` | `/api/comment/likeComment/:commentId` | Like a comment | Private |
| `DELETE` | `/api/comment/deleteComment/:commentId` | Delete a comment | Private/Admin |

---

## 🤝 Contributing

Contributions are what make open source such a powerful place to learn and collaborate. Please read our [Contributing Guide](./CONTRIBUTING.md) before submitting a pull request.

---

## 📄 License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Avishka Gihan](https://github.com/AvishkaGihan)

</div>

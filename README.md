# Movies & TV Shows Full Stack Application

A modern full-stack application for managing your favorite movies and TV shows with user authentication, advanced filtering, and statistics dashboard.

## ✨ Features

- **🔐 User Authentication** - Secure JWT-based authentication
- **📽️ Movie & TV Show Management** - Add, edit, delete, and organize your collection
- **🔍 Advanced Filtering** - Search by title, director, genre, and more
- **📊 Statistics Dashboard** - Visual insights into your collection
- **📱 Responsive Design** - Works seamlessly on all devices
- **⚡ Real-time Updates** - Instant feedback with React Query

## 🛠️ Tech Stack

### Backend

- **Node.js** with Express.js
- **MySQL** database with Sequelize ORM
- **JWT** authentication with bcrypt password hashing
- **Zod** for request validation
- **CORS** enabled for frontend communication

### Frontend

- **React 19** with TypeScript
- **Ant Design** for UI components
- **React Query** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling

## 🚀 Quick Setup

### Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### 1. Clone & Install

```bash
git clone https://github.com/habeeb-nasr-12/fullStack-movie-app.git
cd fullStack-movie-app

```

### 2. Backend Setup

```bash
cd backend
npm install
```

**Create `.env` file:** in backend folder 

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=securePassword12
DB_NAME=movies_db
DB_PORT=3306
DB_DIALECT=mysql
JWT_SECRET='pD$3!r7XZ#vHq9B&fJ1@LuZ5K*mG8tXcV0+eNhY5$sAaWzRbCiUjEY3oTgM6QnLd'
FRONTEND_URL=http://localhost:3000 
```

**Run Migrations & Seed:**

```bash
npm run migrate
npm run seed
```

**Start Backend:**

```bash
npm run dev
```

API available at: `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App available at: `http://localhost:3000`

## 🔐 Demo Credentials

Email:habeebnasr4@gmail.com  
Password:secureHabeeb1

## 📊 Database Schema

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create account
- `POST /api/auth/signin` - Login
- `GET /api/auth/me` - Get user info

### Movies/TV Shows (Protected)

- `GET /api/movies` - Get all with pagination/filtering
- `GET /api/movies/:id` - Get single item
- `POST /api/movies` - Create new item
- `PUT /api/movies/:id` - Update item
- `DELETE /api/movies/:id` - Delete item
- `GET /api/movies/stats` - Get statistics

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)
- `search` - Search in title, director, genre, description
- `type` - Filter by Movie or TV Show
- `status` - Filter by Watched, Want to Watch, Currently Watching
- `rating` - Filter by rating (0-10, ranges like "8-10")
- `sort_by` - Sort by title, year, rating, created_at
- `sort_order` - ASC or DESC

### Backend

```bash
cd backend
npm run dev          # Start with nodemon
npm run migrate      # Run migrations
npm run seed         # Seed with sample data
```

### Frontend

```bash
cd frontend
npm run dev          # Start Vite dev server
npm run build        # Build for production
```

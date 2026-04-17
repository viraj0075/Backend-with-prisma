# Backend with Prisma ORM 🚀

A full-featured Node.js backend application designed to manage movies and user watchlists. This project demonstrates the usage of the modern Express 5 framework alongside the next-generation **Prisma ORM** coupled with a native PostgreSQL driver (`@prisma/adapter-pg`).

## 🛠️ Technology Stack

- **[Node.js](https://nodejs.org/en/)** - JavaScript runtime environment.
- **[Express.js](https://expressjs.com/)** - Lightweight backend web framework.
- **[Prisma ORM v7](https://www.prisma.io/)** - Type-safe database client and schema modeling.
- **[PostgreSQL](https://www.postgresql.org/)** - Relational database (setup using a Neon DB connection string).
- **Authentication**: JWT (`jsonwebtoken`) and password hashing (`bcryptjs`).

## ✨ Features

- **User Authentication**: Secure Registration, Login, and Logout functionality using JWT. Bearer tokens mapped directly against the user model.
- **Unified Global Error Handler**: Utilizes a centralized custom `ApiError` class structure. Converts all underlying DB crashes or logical app exceptions into graceful JSON responses.
- **Movie Management**: Database seeding script and endpoints to store, read, and create new movies.
- **Personal Watchlists**: Users can safely add movies to their personal profile, modify their ratings/status (`PLANNED`, `WATCHED`, `DROPPED`), or remove them—monumented securely by relation-level Foreign Key validations.

---

## 💻 Getting Started

### Prerequisites
- Node.js (v20+ recommended for native `--env-file` integration)
- A PostgreSQL database string (e.g. via [Neon Database](https://neon.tech))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/viraj0075/Backend-with-prisma.git
   cd Backend-with-prisma
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env` file at the root of the project with the following variables:
   ```env
   PORT=5001
   NODE_ENV=development
   DATABASE_URL="postgresql://username:password@your-host/.../neondb?sslmode=require"
   JWT_SECRET="generate-a-strong-secret-key-here"
   JWT_EXPIRES_IIN="7d"
   ```

4. **Initialize Database:**
   Push your Prisma Schema to the PostgreSQL database to configure all constraints and relations. 
   *(Note: This application has been configured to build the Prisma client directly into `src/generated/prisma/index.js`)*
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Seed Movies (Optional):**
   Seed the database with starting movie data:
   ```bash
   npm run seed:movies
   ```

6. **Start the Development Server:**
   ```bash
   npm run dev
   ```

---

## 🗂 Project Structure

```text
.
├── prisma/
│   ├── schema.prisma        # Database Schema Models (User, Movie, WatchlistItem)
│   └── seed.js              # Database movie seeder script
├── src/
│   ├── config/              # Prisma instantiation and connection scripts
│   ├── controllers/         # Application logic per route branch
│   ├── generated/prisma/    # Custom compilation folder of the Prisma Client
│   ├── middleware/          # authMiddleware and errorMiddleware logic
│   ├── routes/              # Express API Routes
│   ├── utils/               # ApiError, ApiResponse, validation tooling
│   └── server.js            # Entry Point, Middleware Hookups, and Global Error handlers
└── package.json
```

## 📡 Essential Endpoints

- **Auth**
  - `POST /auth/register`
  - `POST /auth/login`
  - `POST /auth/logout`

- **Movies**
  - `POST /movies/createMovie` (Assumes `routes/movie.route.js` structure)
  - `GET /movies/` 

- **Watchlists (Requires Bearer Token)**
  - `POST /watchlist` -> Add a movie
  - `PUT /watchlist/:movieId` -> Update rating or status
  - `DELETE /watchlist/:movieId` -> Remove from watchlist

---
*Created with Viraj ❤️ powered by Node + Prisma*

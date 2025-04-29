# Code Comparison

Code Comparison is a full-stack web application similar to DiffChecker, designed for comparing code snippets side-by-side. It supports various formats including JavaScript, JSON, and Markdown. Users can register, log in, paste two snippets of code, view inline differences, and save/load snippets for future reference.

The application was built using the MERN stack and is deployed on Render.

---

## 🚀 Live Demo

- [https://code-comparison-frontend.onrender.com](https://code-comparison-frontend.onrender.com)
> ⚠️ This app is hosted on Render's free tier, so it may take a few seconds to wake up on first load.

---

## 🧱 Tech Stack

### 🖥️ Frontend (in `/client`)
- **React + Vite**: Fast and modern frontend setup
- **shadcn/ui + Tailwind CSS**: Component styling and theming
- **React Router**: Client-side routing
- **Axios**: For HTTP requests
- **Monaco Editor**: Code editing experience
- **Zod + React Hook Form**: Input validation

### 🛠️ Backend (in `/server`)
- **Express.js**: RESTful API
- **MongoDB + Mongoose**: Database for users and snippets
- **JWT Auth**: Secure login and token-based authentication

---

## 📁 Project Structure

```
code_comparison/
├── client/              # React frontend
│   ├── src/
│   │   ├── api/         # Axios requests
│   │   ├── components/  # Reusable UI
│   │   ├── pages/       # Route-based views
│   │   └── ...          # Context, hooks, etc.
├── server/              # Express backend
│   ├── routes/          # API routes
│   ├── models/          # Mongoose schemas
│   └── ...              # Config, utils, server.js
```

---

## ✨ Features

- 🧠 **Code Diff**: Compare original vs modified code visually
- 💾 **Save Snippets**: Name and persist snippets to MongoDB
- 📂 **Load Snippets**: Quickly re-apply saved code for new comparisons
- 🔐 **Authentication**: Register/login with secure JWT tokens

---

## 🧪 Getting Started (Local Dev)

### ✅ Requirements

- Node.js (v16+ recommended)
- npm
- MongoDB (local or MongoDB Atlas)

### 📦 Setup

1. **Clone the repo**:
   ```sh
   git clone https://github.com/your-username/code-comparison.git
   cd code-comparison
   ```

2. **Set up backend environment**:
   Create a `.env` file inside the `server/` directory:

   ```env
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/code_comparison
   JWT_ACCESS_SECRET=your-access-secret-key
   JWT_REFRESH_SECRET=your-refresh-secret-key
   ```

3. **Install dependencies**:

   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

4. **Start MongoDB** (if using local):

   ```sh
   mongod
   ```

5. **Run app locally**:

   From project root:

   ```bash
   npm run start
   ```

   This uses `concurrently` to run both frontend and backend.

6. **Access app locally**:

   Visit: [http://localhost:5173](http://localhost:5173)

---

## 🌐 Deploying to Production

This app is deployed to **Render**. You’ll need:

- A Render Web Service for `/server`
- A Render Static Site for `/client`
- A cloud MongoDB cluster (MongoDB Atlas)
- Environment variables for both services (e.g. `VITE_API_URL` in frontend)

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

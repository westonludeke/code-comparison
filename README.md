# Code Comparison

A web app akin to DiffChecker designed for examining differences in various code types, such as JavaScript, JSON, and Markdown. Users can input two code snippets, compare them side-by-side, save and load snippets, and name them for easy reference in future comparisons.

## Overview

The Code Comparison app is divided into two main parts: the frontend and the backend:

### Architecture and Technologies

**Frontend:**
- **ReactJS:** Highly responsive user interface within the `client/` folder.
- **Vite:** Modern tool for faster development in the `client/` folder.
- **shadcn-ui & Tailwind CSS:** For consistent and stylish UI components.
- **React Router:** Client-side routing with components in `client/src/pages/` & `client/src/components/`.
- **Mock Data:** All API requests are mocked during frontend development.

**Backend:**
- **ExpressJS:** Provides REST API endpoints within the `server/` folder.
- **MongoDB & Mongoose:** Used for data storage and management.
- **JWT Authentication:** Secure token-based user authentication using bearer tokens.

### Project Structure

```
code_comparison/
├── client/                # Frontend source files
│   ├── public/            # Static assets
│   ├── src/               # Source code
│   │   ├── api/           # API requests handling
│   │   ├── components/    # React components
│   │   ├── contexts/      # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main App component
│   │   ├── main.tsx       # Entry point
├── server/                # Backend source files
│   ├── config/            # Database configurations
│   ├── models/            # Mongoose models
│   ├── routes/            # API endpoints
│   ├── services/          # Service layers
│   ├── utils/             # Utility functions
│   ├── server.js          # Server entry point
└── README.md              # Project documentation
```

## Features

### Text Comparison
- **Input Areas:** Two text boxes for Original Code and Changed Code.
- **Comparison Button:** Highlights differences inline when clicked.

### Save and Load Snippets
- **Save Button:** Saves the Original Code; users can name the snippet.
- **Load Button:** Retrieves saved snippets for future comparisons.

### Database
- **MongoDB & Mongoose:** Snippets and user data are saved and managed in MongoDB.

## Getting Started

### Requirements
Ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **MongoDB** (local instance or cloud)

### Quickstart

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-repo/code_comparison.git
   cd code_comparison
   ```

2. **Setup environment variables**:
   Create a `.env` file in the `server/` folder and add the following:
   ```env
   PORT=3000
   DATABASE_URL=mongodb://localhost:27017/code_comparison
   JWT_ACCESS_SECRET=your-access-secret-key
   JWT_REFRESH_SECRET=your-refresh-secret-key
   ```

3. **Install dependencies**:
   ```sh
   # For the backend
   cd server
   npm install
   # For the frontend
   cd ../client
   npm install
   ```

4. **Start the MongoDB server** (if using a local instance):
   ```sh
   mongod
   ```

5. **Run both backend and frontend with a single command**:
   ```sh
   npm run start
   ```

6. **Visit the app**:
   Open your browser and go to `http://localhost:5173`.

### License

The project is proprietary. Copyright (c) 2024.

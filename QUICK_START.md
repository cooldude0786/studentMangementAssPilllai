# Quick Start Guide

## 🎯 Get the App Running Locally in 5 Minutes

### Prerequisites
- Node.js installed
- PostgreSQL running
- Your database connection string ready

### Step 1: Backend Setup (2 minutes)

```bash
cd backend

# Install dependencies
npm install

# Create .env file with your database
echo 'DATABASE_URL="postgres://user:password@localhost:5432/StudentPillaiDB"' > .env

# Run migrations
npx prisma migrate dev

# Start server
npm run dev
```

✅ Backend running at `http://localhost:5000`

### Step 2: Frontend Setup (2 minutes)

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo 'VITE_API_URL=http://localhost:5000/api' > .env.local

# Start frontend
npm run dev
```

✅ Frontend running at `http://localhost:5173`

### Step 3: Test the App (1 minute)

1. Open browser to `http://localhost:5173`
2. You should see "Student Management" page
3. Click "+ Add New Student"
4. Fill in the form and click "Add Student"
5. Student appears in the table
6. Try Edit and Delete buttons

## 🚀 Deploy to Vercel

### Quick Deployment Checklist

- [ ] Code is on GitHub
- [ ] Backend has `vercel.json` file
- [ ] Create Vercel project for backend
  - Root directory: `backend`
  - Environment: `DATABASE_URL=<your-db-url>`
  - Deploy ✅
- [ ] Copy backend URL
- [ ] Create Vercel project for frontend
  - Root directory: `frontend`
  - Environment: `VITE_API_URL=https://<backend-url>/api`
  - Deploy ✅
- [ ] Test the live app

## 📝 Environment Variables

### Backend (.env file)
```
DATABASE_URL=postgres://user:password@host:5432/database
```

### Frontend (in Vercel dashboard)
```
VITE_API_URL=https://your-backend.vercel.app/api
```

## 🔍 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Cannot connect to database" | Check DATABASE_URL in .env |
| "API calls return 404" | Verify backend URL and VITE_API_URL |
| "Port 5000 already in use" | Kill process or use different port |
| "Cannot find module" | Run `npm install` in that directory |
| "Build fails on Vercel" | Check environment variables are set |

## 📚 Full Documentation

- **Deployment Guide:** See `DEPLOYMENT.md`
- **Project Details:** See `README.md`
- **What Was Built:** See `COMPLETION_SUMMARY.md`

## ✨ Features

✅ Add students with validation
✅ View all students in responsive table
✅ Edit any student
✅ Delete students
✅ Works on mobile, tablet, desktop
✅ Photo upload support
✅ Error handling and loading states

---

**That's it! Your app is production-ready.** 🎉

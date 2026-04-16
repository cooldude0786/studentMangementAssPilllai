# Deployment Guide - Student Management System

This guide will help you deploy both the frontend and backend to production using Vercel.

## Prerequisites

1. GitHub account with your code pushed to a repository
2. Vercel account (https://vercel.com) - sign up with GitHub
3. PostgreSQL database (can use Vercel Postgres or any hosted provider)

## Step 1: Set Up Database

### Option A: Using Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Create a new project
3. Add "Vercel Postgres" from the integrations
4. Note down your `DATABASE_URL` connection string

### Option B: Using External PostgreSQL

- Use services like:
  - AWS RDS
  - Railway.app
  - Render.com
  - Neon.tech
  
- Get your `DATABASE_URL` in format: `postgres://user:password@host:port/database`

## Step 2: Deploy Backend

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Add student management system"
   git push origin main
   ```

2. **Create a Vercel project for backend:**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Set as root directory: `backend`

3. **Configure environment variables:**
   - In Vercel project settings, go to "Environment Variables"
   - Add `DATABASE_URL` with your PostgreSQL connection string
   - Add `NODE_ENV=production`

4. **Override build and start commands (optional):**
   - Build Command: `npm install && npx prisma generate && npx prisma migrate deploy`
   - Start Command: `node src/server.js`

5. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Copy your backend URL (e.g., `https://your-backend.vercel.app`)

## Step 3: Deploy Frontend

1. **Create a Vercel project for frontend:**
   - Go to https://vercel.com
   - Click "New Project"
   - Select your GitHub repository
   - Set as root directory: `frontend`

2. **Configure environment variables:**
   - In Vercel project settings, go to "Environment Variables"
   - Add: `VITE_API_URL=https://your-backend.vercel.app/api` (use your actual backend URL)

3. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your frontend URL will be displayed

## Step 4: Test the Deployment

1. Visit your frontend URL
2. Try adding a new student
3. Test editing and deleting students
4. Verify all functionality works

## Troubleshooting

### Backend Issues

**Issue: "DATABASE_URL not found"**
- Check environment variables in Vercel dashboard
- Ensure `DATABASE_URL` is set correctly

**Issue: "Prisma migration failed"**
- Run manually: `vercel env pull` then `npx prisma migrate deploy`
- Or redeploy after ensuring `.env` is properly configured

**Issue: CORS errors**
```javascript
// Your backend should have CORS enabled:
app.use(cors());
```

### Frontend Issues

**Issue: API calls fail**
- Check `VITE_API_URL` in Vercel environment variables
- Ensure backend URL is correct (must end with `/api`)
- Verify backend is running and accessible

**Issue: Builds fail**
- Clear Vercel cache: Project Settings → Git → Clear cache
- Redeploy

**Issue: 404 on routes**
- Add `vercel.json` in frontend root:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

## Continuous Deployment

After initial setup, every time you push to GitHub:
1. Vercel automatically detects changes
2. Runs build commands
3. Deploys automatically if build succeeds

## Environment Variables Reference

### Backend `.env`
```
DATABASE_URL=postgres://user:password@host:port/database
NODE_ENV=production
PORT=5000
```

### Frontend `.env.local` (for local development)
```
VITE_API_URL=http://localhost:5000/api
```

### Frontend Vercel environment variable
```
VITE_API_URL=https://your-backend.vercel.app/api
```

## Database Migrations in Production

When you update the Prisma schema:

1. **Locally:**
   ```bash
   npx prisma migrate dev --name your_migration_name
   ```

2. **Commit changes:**
   ```bash
   git add prisma/migrations/
   git commit -m "Add migration"
   git push
   ```

3. **In Vercel:**
   - The migration will run automatically during build
   - Or manually run: `vercel env pull && npx prisma migrate deploy`

## Monitoring and Logs

1. **Backend logs:**
   - Vercel Dashboard → Deployments → Your deployment → Logs

2. **Frontend logs:**
   - Vercel Dashboard → Deployments → Your deployment → Logs

3. **Database queries:**
   - Check your database provider's logs

## Performance Tips

1. **Enable image optimization** in `vite.config.ts`
2. **Use CDN** for static assets (Vercel does this automatically)
3. **Database indexing:**
   ```prisma
   model Student {
     id String @id
     email String @unique @@index
     admissionNumber String @unique @@index
   }
   ```

## Security Checklist

- [ ] Environment variables are set (not in code)
- [ ] Database URL is secure and not exposed
- [ ] HTTPS is enabled (Vercel does this automatically)
- [ ] Input validation is in place
- [ ] CORS is properly configured
- [ ] No sensitive data in logs

## Next Steps

1. Set up monitoring (e.g., Sentry for error tracking)
2. Add authentication if needed
3. Set up automated backups for database
4. Configure custom domain
5. Set up analytics

For more help, visit:
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs

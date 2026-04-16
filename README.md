# Student Management System

A full-stack web application for managing student records with a modern, responsive interface.

## Features

- ✅ Add, view, edit, and delete student records
- ✅ Responsive design (works on desktop, tablet, and mobile)
- ✅ Student photo upload support
- ✅ Form validation and error handling
- ✅ PostgreSQL database support
- ✅ RESTful API backend

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- Axios (HTTP client)
- React Router (navigation)

### Backend
- Node.js with Express
- Prisma ORM
- PostgreSQL database
- Multer (file uploads)

## Project Structure

```
.
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── types/         # TypeScript types
│   └── vite.config.ts
├── backend/           # Node.js backend server
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Custom middleware
│   │   └── config/        # Configuration files
│   ├── prisma/
│   │   ├── schema.prisma  # Database schema
│   │   └── migrations/    # Database migrations
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory:
   ```
   DATABASE_URL="postgres://username:password@localhost:5432/StudentPillaiDB"
   ```

4. Run migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will run at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run at `http://localhost:5173`

## Deployment

### Deploy Backend to Vercel

1. Create a `vercel.json` in the backend root:
   ```json
   {
     "version": 2,
     "builds": [
       { "src": "src/server.js", "use": "@vercel/node" }
     ],
     "routes": [
       { "src": "/(.*)", "dest": "src/server.js" }
     ],
     "env": {
       "DATABASE_URL": "@database_url"
     }
   }
   ```

2. Deploy using Vercel CLI:
   ```bash
   vercel --prod
   ```

3. Set the `DATABASE_URL` environment variable in Vercel dashboard

### Deploy Frontend to Vercel

1. Connect your GitHub repository to Vercel

2. Set the build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. Add environment variable in Vercel dashboard:
   ```
   VITE_API_URL=https://your-backend-url.vercel.app/api
   ```

## API Endpoints

### Students

- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

## Database Schema

### Student Model
- `id` (String, UUID primary key)
- `admissionNumber` (String, unique)
- `name` (String)
- `course` (String)
- `year` (Int)
- `dob` (DateTime)
- `email` (String)
- `mobile` (String)
- `gender` (String)
- `address` (String)
- `photoUrl` (String, optional)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

## Development

### Running Tests
```bash
npm test
```

### Building for Production

**Frontend:**
```bash
npm run build
```

**Backend:**
```bash
npm run build
```

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

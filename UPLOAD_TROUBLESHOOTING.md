# Upload Troubleshooting Guide

## Upload Feature Overview

The student photo upload feature allows users to attach a photo when creating or editing a student record.

## How It Works

1. **Frontend**: User selects a photo file in the form
2. **FormData**: File is sent as `multipart/form-data`
3. **Multer Middleware**: Backend receives and stores file in `uploads/` folder
4. **Database**: Relative path is saved in the `photoUrl` field
5. **Serving**: Photos are served statically from `http://localhost:5000/uploads/`

## File Structure
```
backend/
├── uploads/           # Photos stored here
│   ├── photo1.jpg
│   ├── photo2.png
│   └── ...
├── src/
│   ├── middleware/
│   │   └── upload.js  # Multer configuration (5MB limit)
│   ├── controllers/
│   │   └── studentController.js  # Handles file path
│   ├── routes/
│   │   └── studentRoutes.js  # Applies upload middleware
│   └── app.js  # Serves /uploads folder statically
```

## Troubleshooting

### Problem: Windows path issues (backslashes in URLs)
**Status**: ✅ FIXED
- Changed `req.file.path` to `req.file.filename` 
- Now always uses forward slashes: `uploads/filename.jpg`

### Problem: Filename conflicts
**Status**: ✅ FIXED
- Changed filename format from `timestamp.ext` to `originalname_timestamp.ext`
- Example: `photo_1713287645123.jpg`

### Problem: No file validation
**Status**: ✅ FIXED
- Added file type validation (only images)
- Added 5MB file size limit
- Error handling for invalid files

### Problem: Uploads folder doesn't exist
**Status**: ✅ FIXED
- Added auto-creation of uploads folder with `fs.mkdirSync()`
- Added `.gitkeep` file to ensure folder exists in repo

## Testing Upload

### Local Testing

1. **Start backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **In another terminal, start frontend**:
   ```bash
   cd frontend
   npm run dev
   ```

3. **Add a student with photo**:
   - Go to http://localhost:5173
   - Click "+ Add New Student"
   - Fill form and select a photo
   - Click "Add Student"

4. **Check if upload worked**:
   - Look in `backend/uploads/` folder for the file
   - Check backend console for log: `File uploaded: uploads/filename.jpg`
   - Check if image displays in student list

### Verify File in Database

```bash
# In backend directory
npx prisma studio

# Go to Student table and check if photoUrl is populated
# Should look like: uploads/photo_1713287645123.jpg
```

### Direct API Test

```bash
# Test file upload directly
curl -F "name=John Doe" \
     -F "course=Computer Science" \
     -F "year=2" \
     -F "dob=2000-01-15" \
     -F "email=john@example.com" \
     -F "mobile=9876543210" \
     -F "gender=Male" \
     -F "address=123 Street" \
     -F "photo=@/path/to/photo.jpg" \
     http://localhost:5000/api/students
```

## Common Issues & Solutions

### 1. Upload page shows "No file selected"
- **Cause**: No file was picked
- **Solution**: Click the file input and select an image

### 2. "Only image files are allowed" error
- **Cause**: Selected file is not an image
- **Solution**: Choose JPG, PNG, GIF, or WebP file

### 3. "File is too large" error  
- **Cause**: File exceeds 5MB limit
- **Solution**: Compress image before uploading

### 4. Photo uploaded but shows broken image
- **Causes**:
  - File path format incorrect
  - Backend not serving uploads folder
  - Wrong API URL in frontend
  
- **Solutions**:
  - Check `backend/uploads/` folder exists with files
  - Verify app.js has: `app.use("/uploads", express.static("uploads"));`
  - Verify `VITE_API_URL` is correct

### 5. "No file received" in console logs
- **Cause**: FormData not being sent correctly
- **Solution**: Check:
  - Form has `enctype="multipart/form-data"` (automatic with FormData)
  - Multer is applied to route: `upload.single("photo")`
  - Frontend sends file as "photo" field

## Upload Configuration

### Current Settings (in `backend/src/middleware/upload.js`)
```javascript
- Max file size: 5MB
- Allowed types: JPEG, PNG, GIF, WebP
- Storage location: /backend/uploads/
- Filename format: originalname_timestamp.ext
```

### To Change Settings:

**Increase file size limit**:
```javascript
limits: {
  fileSize: 10 * 1024 * 1024, // 10MB
}
```

**Allow more file types**:
```javascript
const allowedMimes = [
  "image/jpeg",
  "image/png", 
  "image/gif",
  "image/webp",
  "image/svg+xml",  // Add this
];
```

## Backend Logs

When uploading a file, you should see in the server console:
```
File uploaded: uploads/photo_1713287645123.jpg
```

If you see an error instead, that's where the problem is.

## Database

After successful upload, the database will have:
```
Student {
  id: "uuid-string"
  photoUrl: "uploads/photo_1713287645123.jpg"
  ...other fields...
}
```

## Image Display in Frontend

The StudentForm shows "Photo" label with file input.
After uploading, check:
1. Server logs for "File uploaded:" message
2. Browser Network tab to see if POST succeeded
3. `backend/uploads/` folder for the actual file

## Production Deployment

For Vercel deployment, local uploads won't persist. Consider:

1. **Use cloud storage** (AWS S3, Cloudinary, etc.):
   ```javascript
   // Instead of local storage
   const s3Upload = multer({ storage: s3Storage });
   ```

2. **Or use a Database**: Store file as blob in PostgreSQL

3. **Or use Vercel Blob**: Store in Vercel's blob storage

For now, uploads work fine for development and testing!

## Need Help?

Check these in order:
1. ☑️ Is `backend/uploads/` folder created?
2. ☑️ Are there files in `backend/uploads/`?
3. ☑️ Does server console show "File uploaded:" message?
4. ☑️ Is `VITE_API_URL` correct in `.env.local`?
5. ☑️ Check browser Network tab for failed requests
6. ☑️ Check browser Console for errors
7. ☑️ Check server logs for errors

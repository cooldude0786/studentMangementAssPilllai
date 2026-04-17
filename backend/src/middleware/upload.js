import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists (skip on Vercel/serverless)
if (process.env.NODE_ENV !== "production") {
  if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads", { recursive: true });
  }
}

// Use memory storage for production (Vercel) or disk storage for local
const storage =
  process.env.NODE_ENV === "production"
    ? multer.memoryStorage() // Don't save to disk on Vercel
    : multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, "uploads/");
        },
        filename: (req, file, cb) => {
          // Get original filename without extension
          const originalName = path.parse(file.originalname).name;
          // Get file extension
          const ext = path.extname(file.originalname);
          // Create unique filename: originalname_timestamp.ext
          const uniqueName = `${originalName}_${Date.now()}${ext}`;
          cb(null, uniqueName);
        },
      });

const fileFilter = (req, file, cb) => {
  // Only allow image files
  const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});
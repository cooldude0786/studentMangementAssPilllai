import express from "express";
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from "../controllers/studentController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/", upload.single("photo"), createStudent);
router.get("/", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", upload.single("photo"), updateStudent);
router.delete("/:id", deleteStudent);

export default router;
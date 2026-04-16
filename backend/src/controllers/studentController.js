import prisma from "../config/prisma.js";
import { generateAdmissionNumber } from "../utils/generateAdmissionNumber.js";

// CREATE STUDENT
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      course,
      year,
      dob,
      email,
      mobile,
      gender,
      address,
    } = req.body;

    if (!name || !email || !course || !year) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const admissionNumber = generateAdmissionNumber();
    
    // Normalize file path for consistent URL format (use forward slashes)
    let photoUrl = null;
    if (req.file) {
      photoUrl = `uploads/${req.file.filename}`;
      console.log(`File uploaded: ${photoUrl}`);
    }

    const student = await prisma.student.create({
      data: {
        admissionNumber,
        name,
        course,
        year: Number(year),
        dob: new Date(dob),
        email,
        mobile,
        gender,
        address,
        photoUrl,
      },
    });

    res.json({ success: true, data: student });
  } catch (error) {
    console.error("Create Student Error:", error);
    res.status(500).json({ error: error.message });
  }
};

// GET ALL
export const getStudents = async (req, res) => {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ONE
export const getStudentById = async (req, res) => {
  try {
    const student = await prisma.student.findUnique({
      where: { id: req.params.id },
    });

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE STUDENT
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Build update data
    const updateData = {
      name: req.body.name,
      course: req.body.course,
      year: req.body.year ? Number(req.body.year) : undefined,
      dob: req.body.dob ? new Date(req.body.dob) : undefined,
      email: req.body.email,
      mobile: req.body.mobile,
      gender: req.body.gender,
      address: req.body.address,
    };
    
    // Add photo URL if file was uploaded
    if (req.file) {
      updateData.photoUrl = `uploads/${req.file.filename}`;
    }

    const updated = await prisma.student.update({
      where: { id },
      data: updateData,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE STUDENT
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.student.delete({
      where: { id },
    });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
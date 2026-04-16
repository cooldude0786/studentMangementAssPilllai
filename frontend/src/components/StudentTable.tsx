import { useEffect, useState } from "react";
import type { Student } from "../types/student";
import { useNavigate } from "react-router-dom";
import { deleteStudent, getStudents } from "../services/studentService";

export default function StudentTable() {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this student?");
    if (!confirmDelete) return;

    try {
      await deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete student");
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/students/edit/${id}`);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const data = await getStudents();
        setStudents(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) return <div className="loading">Loading students...</div>;
  if (error) return <div className="error" style={{ color: "red" }}>{error}</div>;

  return (
    <div>
      {students.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Admission No</th>
              <th>Name</th>
              <th>Course</th>
              <th>Year</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td data-label="Admission No">{student.admissionNumber}</td>
                <td data-label="Name">{student.name}</td>
                <td data-label="Course">{student.course}</td>
                <td data-label="Year">{student.year}</td>
                <td data-label="Email">{student.email}</td>
                <td data-label="Mobile">{student.mobile}</td>
                <td data-label="Gender">{student.gender}</td>
                <td data-label="Actions">
                  <div className="actions">
                    <button
                      className="btn-edit"
                      onClick={() => handleEdit(student.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty">No students found. Add your first student!</div>
      )}
    </div>
  );
}
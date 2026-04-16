import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { getStudentById, updateStudent } from "../services/studentService";
import { type Student } from "../types/student";

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudent = async () => {
      if (!id) return;
      try {
        const data = await getStudentById(id);
        setStudent(data);
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("Failed to load student. Please try again.");
      }
    };

    fetchStudent();
  }, [id]);

  const handleSubmit = async (data: FormData) => {
    if (!id) return;

    try {
      await updateStudent(id, data);
      navigate("/students");
    } catch (err) {
      console.error(err);
      alert("Failed to update student. Please try again.");
    }
  };

  if (error) {
    return (
      <section>
        <div className="error" style={{ color: "red", padding: "20px" }}>
          {error}
        </div>
      </section>
    );
  }

  if (!student)
    return (
      <section>
        <div className="loading">Loading student details...</div>
      </section>
    );

  return (
    <section>
      <div style={{ marginBottom: "24px" }}>
        <h2>Edit Student</h2>
        <p style={{ color: "var(--text)", marginTop: "8px" }}>
          Update student information below.
        </p>
      </div>
      <StudentForm initialData={student} onSubmit={handleSubmit} />
    </section>
  );
};

export default EditStudent;
import { useNavigate } from "react-router-dom";
import StudentForm from "../components/StudentForm";
import { createStudent } from "../services/studentService";

const AddStudent = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: FormData) => {
    try {
      await createStudent(data);
      navigate("/students");
    } catch (err) {
      console.error(err);
      alert("Failed to add student. Please try again.");
    }
  };

  return (
    <section>
      <div style={{ marginBottom: "24px" }}>
        <h2>Add New Student</h2>
        <p style={{ color: "var(--text)", marginTop: "8px" }}>
          Fill in the form below to add a new student to the system.
        </p>
      </div>
      <StudentForm onSubmit={handleSubmit} />
    </section>
  );
};

export default AddStudent;
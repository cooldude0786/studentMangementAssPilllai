import { useNavigate } from "react-router-dom";
import StudentTable from "../components/StudentTable";

export default function StudentList() {
  const navigate = useNavigate();

  return (
    <section>
      <div style={{ marginBottom: "24px" }}>
        <h1>Student Management</h1>
        <nav>
          <button onClick={() => navigate("/students/add")} className="btn-primary">
            + Add New Student
          </button>
        </nav>
      </div>
      <StudentTable />
    </section>
  );
}

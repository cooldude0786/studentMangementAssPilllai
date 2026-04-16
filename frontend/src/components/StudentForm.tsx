import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Student } from "../types/student";

type Props = {
  initialData?: Student;
  onSubmit: (data: FormData) => void;
};

const StudentForm = ({ initialData, onSubmit }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    year: 0,
    dob: "",
    email: "",
    mobile: "",
    gender: "",
    address: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pre-fill for edit
  useEffect(() => {
    if (initialData) {
      try {
        setFormData({
          name: initialData.name || "",
          course: initialData.course || "",
          year: initialData.year || 0,
          dob: initialData.dob ? initialData.dob.split("T")[0] : "",
          email: initialData.email || "",
          mobile: initialData.mobile || "",
          gender: initialData.gender || "",
          address: initialData.address || "",
        });
      } catch (err) {
        console.error("Error loading form data:", err);
        setError("Failed to load student data");
      }
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "year" ? parseInt(value) || 0 : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validation
      if (!formData.name || !formData.email || !formData.course || !formData.year) {
        setError("Please fill in all required fields");
        setLoading(false);
        return;
      }

      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value.toString());
      });

      if (file) {
        data.append("photo", file);
      }

      await onSubmit(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: "#ef4444", padding: "12px", backgroundColor: "rgba(239, 68, 68, 0.1)", borderRadius: "6px" }}>{error}</div>}

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="name" style={{ fontWeight: 600 }}>Name *</label>
        <input
          id="name"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="course" style={{ fontWeight: 600 }}>Course *</label>
        <input
          id="course"
          name="course"
          placeholder="Course Name"
          value={formData.course}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "160px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="year" style={{ fontWeight: 600 }}>Year *</label>
          <input
            id="year"
            name="year"
            type="number"
            value={formData.year}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ flex: 1, minWidth: "160px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="dob" style={{ fontWeight: 600 }}>Date of Birth *</label>
          <input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="email" style={{ fontWeight: 600 }}>Email *</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="student@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "160px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="mobile" style={{ fontWeight: 600 }}>Mobile</label>
          <input
            id="mobile"
            name="mobile"
            placeholder="10 digit number"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>

        <div style={{ flex: 1, minWidth: "160px", display: "flex", flexDirection: "column", gap: "4px" }}>
          <label htmlFor="gender" style={{ fontWeight: 600 }}>Gender</label>
          <select name="gender" id="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="address" style={{ fontWeight: 600 }}>Address</label>
        <textarea
          id="address"
          name="address"
          placeholder="Full Address"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <label htmlFor="photo" style={{ fontWeight: 600 }}>Photo</label>
        
        {/* Display existing photo if editing */}
        {initialData?.photoUrl && (
          <div
            style={{
              marginBottom: "12px",
              padding: "12px",
              backgroundColor: "var(--accent-bg)",
              borderRadius: "6px",
              border: "1px solid var(--accent-border)",
            }}
          >
            <p style={{ marginBottom: "8px", fontSize: "14px", fontWeight: "500" }}>
              Current Photo:
            </p>
            <img
              src={`${import.meta.env.VITE_API_URL?.split('/api')[0] || 'http://localhost:5000'}/${initialData.photoUrl}`}
              alt="current student photo"
              style={{
                maxWidth: "150px",
                maxHeight: "150px",
                borderRadius: "6px",
                objectFit: "cover",
              }}
            />
            <p style={{ marginTop: "8px", fontSize: "12px", color: "var(--text)" }}>
              Upload a new photo to replace it
            </p>
          </div>
        )}
        
        {/* Show message if no previous photo */}
        {initialData && !initialData?.photoUrl && (
          <div
            style={{
              marginBottom: "12px",
              padding: "12px",
              backgroundColor: "rgba(156, 163, 175, 0.1)",
              borderRadius: "6px",
              border: "1px solid var(--border)",
            }}
          >
            <p style={{ fontSize: "14px", color: "var(--text)" }}>
              No previous photo
            </p>
          </div>
        )}
        
        <input
          id="photo"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData ? "Update Student" : "Add Student"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/students")}
          style={{
            background: "var(--border)",
            color: "var(--text-h)",
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default StudentForm;
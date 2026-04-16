import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const createStudent = async (data: FormData) => {
  return axios.post(`${API}/students`, data);
};

export const getStudentById = async (id: string) => {
  const res = await axios.get(`${API}/students/${id}`);
  return res.data.data || res.data;
};

export const getStudents = async () => {
  const res = await axios.get(`${API}/students`);
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

export const updateStudent = async (id: string, data: FormData) => {
  return axios.put(`${API}/students/${id}`, data);
};

export const deleteStudent = async (id: string) => {
  return axios.delete(`${API}/students/${id}`);
};
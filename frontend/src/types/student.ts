export interface Student {
  id: string;
  admissionNumber: string;

  name: string;
  course: string;
  year: number;
  dob: string;

  email: string;
  mobile: string;
  gender: string;
  address: string;

  photoUrl?: string;

  createdAt: string;
  updatedAt: string;
}
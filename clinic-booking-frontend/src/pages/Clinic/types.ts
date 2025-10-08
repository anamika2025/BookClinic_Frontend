export interface Clinic {
  clinicID: number;
  name: string;
  city: string;
  address?: string;
   phone: string;
}

export interface Doctor {
  doctorID: number;
  clinicID: number;
  name: string;
  specialty?: string;
  phone?: string;
}
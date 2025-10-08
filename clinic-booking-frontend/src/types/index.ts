// src/types/index.ts

export interface Clinic {
  clinicID: number;
  name: string;
  address: string;
  city: string;
  phoneNumber: string;
}

export interface Doctor {
  doctorID: number;
  name: string;
  specialty: string;
  clinicID: number;
}

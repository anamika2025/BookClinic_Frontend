// src/types/index.ts

export interface Clinic {
  clinicID: number;
  name: string;
  address: string;
  city: string;
  phoneNumber: string;
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  city: string;
}


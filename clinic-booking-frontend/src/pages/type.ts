export interface State {
  stateId: number;
  stateName: string;
  cities: string[];
}

export interface City {
  cityId: number;
  cityName: string;
  stateId: number;
  state: State;
  clinics: string[];
}

export interface User {
  id: string;
  userName: string;
  email: string;
  // ...other user fields
}

export interface Appointment {
  appointmentId: number;
  doctorId: number;
  doctor: string;
  clinicId: number;
  clinic: string;
  userId: string;
  user: User;
  startTime: string;
  endTime: string;
  status: string;
}

export interface WorkingSlot {
  slotId: number;
  doctorId: number;
  doctor: string;
  dayOfWeek: number;
  fromTime: string;
  toTime: string;
}

export interface Doctor {
  doctorId: number;
  doctorName: string;
  careSpecialization: string;
  status: string;
  clinicId: number;
  cityId: number;
  clinic: string;
  appointments: Appointment[];
  workingSlots: WorkingSlot[];
}

export interface Clinic {
  clinicId: number;
  clinicName: string;
  clinicAddress: string;
  cityId: number;
  city: City;
  stateId: number;
  state: State;
  contactNumber: number;
  status: string;
  doctors: Doctor[];
  appointments: Appointment[];
  timings: string[];
}

export interface ClinicTiming {
  clinicTimingId: number;
  clinicId: number;
  clinic: Clinic;
  dayOfWeek: number;
  openingTime: string;
  closingTime: string;
}

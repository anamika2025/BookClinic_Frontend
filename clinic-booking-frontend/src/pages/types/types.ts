export interface City {
  cityId: number;
  cityName: string;
  stateId: number;
  state: State;
  clinics: Clinic[];
}

export interface Clinic {
  clinicId?: number;
  clinicName: string;
  clinicAddress: string;
  cityId: number | null;
  contactNumber: number | null;
  status: "Active" | "Inactive";
}

export interface ClinicFormProps {
  clinic?: Omit<Clinic, "clinicId"> & { clinicId: number };
  onClose?: () => void;
}

export interface State {
  stateId: number;
  stateName: string;
}

export interface Doctor {
  doctorId?: number;
  doctorName: string;
  careSpecialization: string;
  cityId: number | null;
  clinicId: number | null;
  status: "Active" | "Inactive";
}
export interface DoctorFormProps {
  doctor?: Omit<Doctor, "doctorId"> & { doctorId: number };
  onClose?: () => void;
}

export interface ClinicTiming {
  clinicTimingId: number;
  clinicId: number;
  dayOfWeek: number;
  openingTime: string;
  closingTime: string;
}

export interface ClinicTimingFormProps {
  clinicTiming?: Omit<ClinicTiming, "clinicTimingId"> & { clinicTimingId: number };
  onClose?: () => void;
}

export interface City {
  cityId: number;
  cityName: string;
  stateId: number;
  state: State;
  clinics: Clinic[];
}

export interface Clinic {
  clinicId: number;
  clinicName: string;
  clinicAddress: string;
  cityId: number;
  stateId: number;
  contactNumber: number;
  status: string;
}

export interface ClinicFormProps {
  clinic?: Omit<Clinic, "clinicId"> & { clinicId: number };
  onClose?: () => void;
}

export interface State {
  stateId: number;
  stateName: string;
}

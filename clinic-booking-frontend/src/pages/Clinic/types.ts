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


export const emptyCity = {
  cityId: 0,
  cityName: '',
  stateId: 0,
  state: {
    stateId: 0,
    stateName: '',
    cities: []
  },
  clinics: []
};

export const emptyState = {
  stateId: 0,
  stateName: '',
  cities: []
};

export const emptyClinic = {
  clinicId: 0,
  clinicName: '',
  clinicAddress: '',
  cityId: 0,
  city: emptyCity,
  stateId: 0,
  state: emptyState,
  contactNumber: 0,
  status: '',
  doctors: [],
  appointments: [],
  timings: [],
};


export type State = {
  stateId: number;
  stateName: string;
  cities: string[];
};

export type City = {
  cityId: number;
  cityName: string;
  stateId: number;
  state: State;
  clinics: string[];
};

import type { AppointmentRequest } from "@/pages/types/types";
import type { Clinic, Doctor } from "@/types";

// // Fetch appointments
// export const fetchAppointments = async (filters: { city?: string }) => {
//   const response = await fetch(`/api/appointments?city=${filters.city}`);
//   if (!response.ok) {
//     throw new Error("Failed to fetch appointments");
//   }
//   return response.json();
// };

// Fetch available slots
export const fetchAvailableSlots = async (filters: { city?: string }) => {
  const response = await fetch(`/api/slots?city=${filters.city}`);
  if (!response.ok) {
    throw new Error("Failed to fetch available slots");
  }
  return response.json();
};


export const createAppointment = async (appointment: AppointmentRequest) => {
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });

  if (!response.ok) {
    throw new Error("Failed to create appointment");
  }

  return response.json();
};


export const fetchAppointments = async ({
  clinicId,
  doctorId,
}: {
  clinicId: number;
  doctorId: number;
}) => {
  const response = await fetch(`/api/appointments/${clinicId}/${doctorId}`);
  if (!response.ok) throw new Error("Failed to fetch appointments");
  return response.json();
};

export const fetchDoctors = async (): Promise<Doctor[]> => {
  const response = await fetch("/api/doctors");
  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }
  return await response.json();
};

export const fetchClinics = async (): Promise<Clinic[]> => {
  const response = await fetch("/api/clinics");
  if (!response.ok) {
    throw new Error("Failed to fetch clinics");
  }
  return await response.json();
};




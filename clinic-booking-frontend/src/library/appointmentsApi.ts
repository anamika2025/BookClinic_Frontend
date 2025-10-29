import type { AppointmentRequest, Clinic, Doctor } from "@/pages/types/types";

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

export async function createAppointment(appointmentData: AppointmentRequest) {
  const res = await fetch(`/api/Appointments/CreateAppointment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(appointmentData),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json(); // ✅ returns { message: "Appointment Booked Successfully" }
}

export const fetchAppointments = async ({ clinicId, doctorId }: { clinicId: number; doctorId: number }) => {
  const response = await fetch(`/api/appointments/${clinicId}/${doctorId}`);
  if (!response.ok) throw new Error("Failed to fetch appointments");
  return response.json();
};

export const fetchDoctors = async (): Promise<Doctor[]> => {
  const res = await fetch("/api/Doctors");
  const data: Doctor[] = await res.json();

  return data.map((d) => ({
    doctorId: d.doctorId,
    doctorName: d.doctorName,
    clinicId: d.clinicId,
    careSpecialization: d.careSpecialization,
    cityId: d.cityId,
    status: d.status,
  }));
};

export const fetchClinics = async (): Promise<Clinic[]> => {
  const res = await fetch("/api/Clinics");
  const data: Clinic[] = await res.json();

  return data.map((c) => ({
    clinicId: c.clinicId,
    clinicName: c.clinicName,
    clinicAddress: c.clinicAddress,
    cityId: c.cityId,
    contactNumber: c.contactNumber,
    status: c.status,
  }));
};

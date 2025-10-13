import { apiGet, apiDelete } from "@/utils/apiInstance";
import type { City, Clinic } from "@/pages/types/types";
import type { ClinicTiming } from "@/pages/types/types";

export const getClinics = async (): Promise<Clinic[]> => {
  return apiGet("/Clinics");
};

// Example of clinicApi.ts
export const addClinic = async (clinic: Omit<Clinic, "clinicId">) => {
  const response = await fetch("/api/clinics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clinic),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to add clinic");
  }
  return response.json();
};

export const updateClinic = async (id: number, clinic: Clinic) => {
  const response = await fetch(`/api/clinics/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(clinic),
  });

  if (!response.ok) {
    let errorMessage = "Failed to update clinic";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch {
      // No JSON body — keep default message
    }
    throw new Error(errorMessage);
  }

  if (response.status !== 204) {
    return await response.json();
  }

  return null;
};

// export const addClinic = async (clinic: Omit<Clinic, "clinicId">) => {
//   return apiPost("/Clinics", clinic);
// };

// export const updateClinic = async (id: number, clinic: Omit<Clinic, "clinicId">) => {
//   return apiPut(`/Clinics/${id}`, clinic);
// };

export const deleteClinic = async (id: number) => {
  return apiDelete(`/Clinics/${id}`);
};

export const getCities = async (): Promise<City[]> => {
  return apiGet("/Cities");
};

export const getClinicById = async (id: number) => {
  return apiGet<Clinic>(`/clinics/${id}`);
};

const API_BASE = "/api/clinicTimings";

export async function getClinicTimings(): Promise<ClinicTiming[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch clinic timings");
  return res.json();
}

export async function getClinicTimingsByClinic(clinicId: number): Promise<ClinicTiming[]> {
  const res = await fetch(`${API_BASE}/byClinic/${clinicId}`);
  if (!res.ok) throw new Error("Failed to fetch timings for clinic");
  return res.json();
}

export async function getClinicTimingById(id: number): Promise<ClinicTiming> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch clinic timing");
  return res.json();
}

export async function addClinicTiming(data: ClinicTiming): Promise<void> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.text(); // helpful to debug
    throw new Error(error || "Failed to add clinic timing");
  }
}

export async function updateClinicTiming(id: number, payload: ClinicTiming): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Failed to update clinic timing");
  }
}

export async function deleteClinicTiming(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Failed to delete clinic timing");
  }
}

import type { Doctor, DoctorSlot } from "@/pages/types/types";

const API_BASE_URL = "/api/doctors"; 

export async function getDoctors(): Promise<Doctor[]> {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch doctors");
  return res.json();
}

export async function getDoctorById(id: number): Promise<Doctor | null> {
  const res = await fetch(`${API_BASE_URL}/${id}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch doctor");
  return res.json();
}

export async function addDoctor(payload: Doctor): Promise<Doctor> {
  const res = await fetch(`${API_BASE_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to add doctor: ${errorText}`);
  }

  return res.json(); // Must match backend return
}

export async function updateDoctor(id: number, payload: Doctor): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to update doctor: ${errorText}`);
  }
}

export async function deleteDoctor(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete doctor");
}


const API_BASE = "/api/doctorSlots";

export async function getDoctorSlots(): Promise<DoctorSlot[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error("Failed to fetch doctor slots");
  return res.json();
}

export async function getDoctorSlotById(id: number): Promise<DoctorSlot> {
  const res = await fetch(`${API_BASE}/${id}`);
  if (!res.ok) throw new Error("Failed to fetch doctor slot");
  return res.json();
}

export async function addDoctorSlot(data: DoctorSlot): Promise<void> {
  const res = await fetch(API_BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "Failed to add doctor slot");
  }
}

export async function updateDoctorSlot(id: number, payload: DoctorSlot): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Failed to update doctor slot");
  }
}

export async function deleteDoctorSlot(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Failed to delete doctor slot");
  }
}

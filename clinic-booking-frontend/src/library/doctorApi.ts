import type { Doctor } from "@/pages/types/types";

const API_BASE_URL = "/api/doctors"; // change this to your actual API base URL

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

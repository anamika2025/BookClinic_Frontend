import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/apiInstance";
import type { City, Clinic } from "@/pages/types/types";

export const getClinics = async (): Promise<Clinic[]> => {
  return apiGet("/Clinics");
};

export const addClinic = async (clinic: Omit<Clinic, "clinicId">) => {
  return apiPost("/Clinics", clinic);
};

export const updateClinic = async (id: number, clinic: Omit<Clinic, "clinicId">) => {
  return apiPut(`/Clinics/${id}`, clinic);
};

export const deleteClinic = async (id: number) => {
  return apiDelete(`/Clinics/${id}`);
};

export const getCities = async (): Promise<City[]> => {
  return apiGet("/Cities");
};

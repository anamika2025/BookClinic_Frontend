import { apiGet, apiPost, apiPut, apiDelete } from "@/utils/apiInstance";
import { MASTER_API_KEY } from "@/utils/globalConfig";
import type { Clinic } from "@/types";


const CLINIC_API = MASTER_API_KEY + '/Clinic';



export const getClinics = () => apiGet<Clinic[]>(`${CLINIC_API}/GetAll`);
export const addClinic = (payload: Omit<Clinic, "clinicID">) => apiPost<Clinic>(`${CLINIC_API}/Add`, payload);
export const updateClinic = (id: number, payload: Omit<Clinic, "clinicID">) => apiPut<Clinic>(`${CLINIC_API}/Update/${id}`, payload);
export const deleteClinic = (id: number) => apiDelete<boolean>(`${CLINIC_API}/Delete/${id}`);


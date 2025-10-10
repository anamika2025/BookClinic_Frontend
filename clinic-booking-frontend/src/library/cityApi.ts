import { apiGet } from "@/utils/apiInstance";
import type { City } from "@/pages/types/types";

export const getCities = async (): Promise<City[]> => {
  return apiGet("/Cities");
};

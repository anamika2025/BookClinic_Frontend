import type { Doctor } from "@/types";

// searchApi.ts
const API_BASE_URL = "/api/doctors";

export const fetchSearchResults = async (city: string, query: string) => {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch doctors");
    }
    const doctors: Doctor[] = await response.json();

    // Filter doctors based on city and query
    const filteredDoctors = doctors.filter((doctor) => {
      const matchesCity = doctor.city?.toLowerCase() === city.toLowerCase();
      const matchesQuery =
        doctor.name.toLowerCase().includes(query.toLowerCase()) ||
        doctor.specialty?.toLowerCase().includes(query.toLowerCase());
      return matchesCity && matchesQuery;
    });

    return filteredDoctors;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error;
  }
};

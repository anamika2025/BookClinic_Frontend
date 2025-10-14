// Fetch appointments
export const fetchAppointments = async (filters: { city?: string }) => {
  const response = await fetch(`/api/appointments?city=${filters.city}`);
  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }
  return response.json();
};

// Fetch available slots
export const fetchAvailableSlots = async (filters: { city?: string }) => {
  const response = await fetch(`/api/slots?city=${filters.city}`);
  if (!response.ok) {
    throw new Error("Failed to fetch available slots");
  }
  return response.json();
};

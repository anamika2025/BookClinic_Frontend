export async function fetchCities() {
  return fetch("/api/cities").then(res => res.json());
}

export async function fetchClinics(cityId?: string) {
  return fetch(`/api/clinics${cityId ? `?city=${cityId}` : ""}`).then(res => res.json());
}

export async function fetchDoctors(clinicId?: string) {
  return fetch(`/api/doctors${clinicId ? `?clinic=${clinicId}` : ""}`).then(res => res.json());
}

export async function fetchAppointments(filters: any) {
  const params = new URLSearchParams(filters as any);
  const res = await fetch(`/api/appointments?${params}`);
  return res.json();
}


export async function createAppointment(data: any) {
  return fetch("/api/appointments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

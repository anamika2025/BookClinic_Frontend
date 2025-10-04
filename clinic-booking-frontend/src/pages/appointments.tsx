// appointments.tsx
import MainLayout from "../shared/layouts/MainLayout";
import AppointmentCalendar  from "../shared/components/AppointmentCalendar";
import CityDropdown from "../shared/components/CityDropdown";
import { useState, useEffect } from "react";
import { fetchCities } from "../library/api";

interface City {
  id: string;
  name: string;
}

interface Filter {
  city?: string;
  // other filter fields
}

export default function Appointments() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [filters, setFilters] = useState<Filter>({});

  useEffect(() => {
    fetchCities().then(setCities).catch(console.error);
  }, []);

  useEffect(() => {
    setFilters((f) => ({ ...f, city: selectedCity }));
  }, [selectedCity]);

  return (
    <MainLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        <CityDropdown
          cities={cities}
          selectedCity={selectedCity}
          onChange={setSelectedCity}
        />
        <AppointmentCalendar filters={filters} />
      </div>
    </MainLayout>
  );
}

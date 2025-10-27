// appointments.tsx
import MainLayout from "../shared/layouts/MainLayout";
import AppointmentCalendar  from "../shared/components/AppointmentCalendar";
import { useState } from "react";



interface Filter {
  city?: string;
   clinicId: number;
  doctorId: number;
}

export default function Appointments() {
  const [filters] = useState<Filter>({
      city: "NYC",         // optional
  clinicId: 1,         // required
  doctorId: 42,  
  });


  return (
    <MainLayout>
      <div className="p-4 space-y-4">
        <h1 className="text-2xl font-semibold">Appointments</h1>
        {/* <CityDropdown
          cities={cities}
          selectedCity={selectedCity}
          onChange={setSelectedCity}
        /> */}
        <AppointmentCalendar filters={filters} />
      </div>
    </MainLayout>
  );
}

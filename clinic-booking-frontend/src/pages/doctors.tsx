"use client";

import MainLayout from "../shared/layouts/MainLayout";
import AppointmentCalendar from "@/shared/components/AppointmentCalendar";
import { useState } from "react";
import { Filters } from "@/shared/components/Filters";

export default function Doctors() {
  const [filters, setFilters] = useState<any>({});

  return (
    <MainLayout>
      <h1 className="text-xl font-bold mb-4">Doctor's Schedule</h1>

      {/* Filters: City → Clinic → Doctor */}
      <Filters onChange={setFilters} />

      {/* Calendar showing appointments */}
      <AppointmentCalendar filters={filters} />
    </MainLayout>
  );
}

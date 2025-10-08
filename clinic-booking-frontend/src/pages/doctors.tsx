"use client";

import AppointmentCalendar from "@/shared/components/AppointmentCalendar";
import { useState } from "react";
import { Filters } from "@/shared/components/Filters";

export default function Doctors() {
  const [filters, setFilters] = useState({});

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Doctor's Schedule</h1>

      <Filters onChange={setFilters} />

      {/* Calendar showing appointments */}
      <AppointmentCalendar filters={filters} />
    </div>
  );
}
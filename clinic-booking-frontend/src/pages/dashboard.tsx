// dashboard.tsx
import { Filters } from "@/shared/components/Filters";
import AppointmentCalendar  from "@/shared/components/AppointmentCalendar";
import { useState } from "react";

interface Filter {
  city?: string;
  // other filter fields
}

export default function Dashboard() {
  const [filters, setFilters] = useState<Filter>({});
  return (
    <div className="flex">
      <div className="flex-1">
        <div className="p-4">
          <Filters onChange={setFilters} />
          <AppointmentCalendar filters={filters} />
        </div>
      </div>
    </div>
  );
}

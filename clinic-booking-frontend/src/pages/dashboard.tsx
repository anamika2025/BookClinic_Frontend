import { useState, useEffect } from "react";

interface FilterProps {
  onChange: (filters: { city?: string; clinicId: number; doctorId: number }) => void;
}

export default function Filter({ onChange }: FilterProps) {
  const [city, setCity] = useState<string>("NYC");
  const [clinicId, setClinicId] = useState<number>(1);
  const [doctorId, setDoctorId] = useState<number>(42);

  useEffect(() => {
    onChange({ city, clinicId, doctorId });
  }, [city, clinicId, doctorId, onChange]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold">Filters</h2>

      {/* City Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">City</label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="NYC">New York City</option>
          <option value="LA">Los Angeles</option>
          <option value="CHI">Chicago</option>
        </select>
      </div>

      {/* Clinic Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Clinic</label>
        <select
          value={clinicId}
          onChange={(e) => setClinicId(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="1">Clinic A</option>
          <option value="2">Clinic B</option>
          <option value="3">Clinic C</option>
        </select>
      </div>

      {/* Doctor Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Doctor</label>
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(Number(e.target.value))}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="42">Dr. Smith</option>
          <option value="43">Dr. Johnson</option>
          <option value="44">Dr. Williams</option>
        </select>
      </div>
    </div>
  );
}

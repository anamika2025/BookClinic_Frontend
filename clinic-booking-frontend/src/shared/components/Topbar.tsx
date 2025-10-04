import { useState } from "react";

export default function Topbar() {
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");

  

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-sm">
      <div>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded px-3 py-1"
        >
          <option value="">Select City</option>
          <option value="new-york">New York</option>
          <option value="los-angeles">Los Angeles</option>
          <option value="chicago">Chicago</option>
          {/* Add more cities */}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="search"
          placeholder="Search Care Specialists..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-3 py-1 w-64"
        />
        <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
          Search
        </button>
      </div>
    </header>
  );
}

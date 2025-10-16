import { useState } from "react";
import { Link } from "react-router-dom";

type TopbarProps = {
  onSearch: (params: { city: string; query: string }) => void;
};

const cities = [
  { value: "", label: "Select City" },
  { value: "bhopal", label: "Bhopal" },
  { value: "indore", label: "Indore" },
  { value: "jabalpur", label: "Jabalpur" },
  { value: "ujjain", label: "Ujjain" },
  { value: "gwalior", label: "Gwalior" },
];

export default function Topbar({ onSearch }: TopbarProps) {
  const [city, setCity] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city) {
      alert("Please select a city");
      return;
    }
    onSearch({ city, query });
  };

  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-sm">
       <div className="flex items-center gap-4">
        <select
          value={city}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCity(e.target.value)}
          className="border rounded px-3 py-1"
        >
          {cities.map((cityOption) => (
            <option key={cityOption.value} value={cityOption.value}>
              {cityOption.label}
            </option>
          ))}
        </select>
     
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="search"
          placeholder="Search Care Specialists..."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="border rounded px-3 py-1 w-64"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
        >
          Search
        </button>

      </form>
       </div>
        <div className="flex items-center gap-3">
        <Link to="/login">
          <button className="text-blue-600 hover:underline">Login</button>
        </Link>
        <Link to="/register">
          <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
            Register
          </button>
        </Link>
      </div>
      
    </header>
  );
}

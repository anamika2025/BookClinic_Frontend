import { useState } from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
  onSearch: (params: { city: string; query: string }) => void;
};

const cities = ["Bhopal", "Indore", "Jabalpur", "Ujjain", "Gwalior"];

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [city, setCity] = useState<string>(cities[0]);
  const [query, setQuery] = useState<string>("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ city, query });
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-xl mx-auto p-2">
      {/* City dropdown */}
      <select
        value={city}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCity(e.target.value)}
        className="border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {cities.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Search input */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search doctors, clinics, hospitals, etc."
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
          className="w-full border-t border-b border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Search className="absolute right-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Search button */}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">
        Search
      </button>
    </form>
  );
}

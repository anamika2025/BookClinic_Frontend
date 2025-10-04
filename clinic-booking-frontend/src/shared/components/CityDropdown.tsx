

interface CityDropdownProps {
  cities: { id: string; name: string }[];
  selectedCity: string;
  onChange: (value: string) => void;
}

export default function CityDropdown({
  cities,
  selectedCity,
  onChange,
}: CityDropdownProps) {
  return (
    <select
      value={selectedCity}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2"
    >
      <option value="">Select City</option>
      {cities.map((city) => (
        <option key={city.id} value={city.id}>
          {city.name}
        </option>
      ))}
    </select>
  );
}

import { useState } from 'react'

const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston']

export default function CityDropdown() {
  const [city, setCity] = useState(cities[0])

  return (
    <select
      value={city}
      onChange={(e) => setCity(e.target.value)}
      className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      {cities.map((c) => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  )
}

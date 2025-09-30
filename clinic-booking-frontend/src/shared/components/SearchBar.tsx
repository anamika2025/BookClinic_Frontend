import { Search } from 'lucide-react'

export default function SearchBar() {
  return (
    <div className="relative w-64">
      <input
        type="text"
        placeholder="Search Care Specialists..."
        className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
    </div>
  )
}

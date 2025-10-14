import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { fetchSearchResults } from "@/library/searchApi";
import { type Doctor } from "@/types/index";

export default function Layout() {
  const [searchResults, setSearchResults] = useState<Doctor[]>([]);

  const handleSearch = async ({ city, query }: { city: string; query: string }) => {
    try {
      const data = await fetchSearchResults(city, query); // Use the API function
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Topbar onSearch={handleSearch} /> {/* Pass handleSearch to Topbar */}
        <div style={{ flex: 1, padding: "20px" }}>
          {searchResults.length > 0 ? (
            <div>
              <h2>Search Results:</h2>
              <ul>
                {searchResults.map((result) => (
                  <li key={result.id}>
                    {result.name} - {result.specialty} ({result.city})
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

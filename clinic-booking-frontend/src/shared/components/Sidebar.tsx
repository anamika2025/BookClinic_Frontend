import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Simple active class helper
  const isActive = (path: string) =>
    location.pathname === path ? "font-bold text-blue-600" : "text-gray-700";

  return (
    <aside className="w-64 bg-white shadow-md min-h-screen p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8">Clinic Admin</h2>
      <nav className="flex flex-col gap-4">
        <Link className={isActive("/")} to="/">
          Dashboard
        </Link>
        <Link className={isActive("/clinics")} to="/clinics">
          Clinics
        </Link>
        <Link className={isActive("/doctors")} to="/doctors">
          Doctors
        </Link>
        <Link className={isActive("/appointments")} to="/appointments">
          Appointments
        </Link>
      </nav>
    </aside>
  );
}

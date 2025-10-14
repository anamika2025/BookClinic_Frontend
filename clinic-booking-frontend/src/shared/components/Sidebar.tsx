import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  // Simple active class helper
  const isActive = (path: string) => (location.pathname === path ? "font-bold text-blue-600" : "text-gray-700");

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
        <Link className={isActive("/clinic-form")} to="/clinic-form">
          Clinic Registration
        </Link>
        <Link className={isActive("/clinic-list")} to="/clinic-list">
          Registered Clinic
        </Link>
        <Link className={isActive("/clinictiming-form")} to="/clinictiming-form">
          Set Clinic Timing
        </Link>
        <Link className={isActive("/clinictiming-list")} to="/clinictiming-list">
          Clinic Timing Details
        </Link>
        <Link className={isActive("/doctor-form")} to="/doctor-form">
          Doctor Registration
        </Link>
        <Link className={isActive("/doctor-list")} to="/doctor-list">
          Registered Doctors
        </Link>
        <Link className={isActive("/doctor-slot-form")} to="/doctor-slot-form">
          Doctor Slot Booking
        </Link>
        <Link className={isActive("/doctor-slot-list")} to="/doctor-slot-list">
          Booked Slots
        </Link>
      </nav>
    </aside>
  );
}

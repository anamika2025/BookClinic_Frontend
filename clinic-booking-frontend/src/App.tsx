import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/index";
import Home from "./pages/dashboard";
import Clinics from "./pages/clinics";
import Doctors from "./pages/doctors";
import Appointments from "./pages/appointments";
// import ClinicPage from "./pages/Clinic/clinic/ClinicPage";
import Layout from "./shared/layouts/Layout";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme
import "primereact/resources/primereact.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import "primeflex/primeflex.css"; // Utility classes
import ClinicForm from "./pages/pages/ClinicForm";
// import ClinicTimingsPage from "./pages/Clinic/clinic/ClinicTimingsPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/clinic-form" element={<ClinicForm />} />
        {/* <Route path="/clinic-registration" element={<ClinicPage />} />
         <Route path="/clinic-timings" element={<ClinicTimingsPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;

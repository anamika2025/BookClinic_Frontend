import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/index";
import Home from "./pages/dashboard";
import Clinics from "./pages/clinics";
import Doctors from "./pages/doctors";
import Appointments from "./pages/appointments";
import ClinicPage from "./pages/Clinic/clinic/ClinicPage";
import Layout from "./shared/layouts/Layout";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/clinic-registration" element={<ClinicPage />} />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/index";
// import Home from "./pages/dashboard";
import Clinics from "./pages/clinics";
import Doctors from "./pages/doctors";
import Appointments from "./pages/appointments";
// import ClinicPage from "./pages/Clinic/clinic/ClinicPage";
import Layout from "./shared/layouts/Layout";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // Theme
import "primereact/resources/primereact.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import "primeflex/primeflex.css"; // Utility classes
import ClinicList from "./pages/components/clinics/ClinicList";
import ClinicForm from "./pages/pages/ClinicForm";
import DoctorForm from "./pages/pages/DoctorForm";
import DoctorList from "./pages/components/doctors/DoctorList";
import ClinicTimingForm from "./pages/pages/ClinicTimingForm";
import ClinicTimingList from "./pages/components/clinics/ClinicTimingList";
import DoctorSlotForm from "./pages/pages/DoctorSlotBookingForm";
import DoctorSlotList from "./pages/components/doctors/DoctorSlotBookingList";
import LoginForm from "./pages/pages/LoginForm";
import RegisterForm from "./pages/pages/RegisterForm";
// import ClinicTimingsPage from "./pages/Clinic/clinic/ClinicTimingsPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/clinics" element={<Clinics />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/clinic-form" element={<ClinicForm />} />
        <Route path="/clinic-form/:clinicId" element={<ClinicForm />} />
        <Route path="/clinic-list" element={<ClinicList />} />
        <Route path="/doctor-form" element={<DoctorForm />} />
        <Route path="/doctor-form/:doctorId" element={<DoctorForm />} />
        <Route path="/doctor-list" element={<DoctorList />} />
        <Route path="/clinictiming-form" element={<ClinicTimingForm />} />
        <Route path="/clinic-timing-form/:id" element={<ClinicTimingForm />} />
        <Route path="/clinictiming-list" element={<ClinicTimingList />} />
        <Route path="/doctor-slot-form" element={<DoctorSlotForm />} />
        <Route path="/doctor-slot-form/:id" element={<DoctorSlotForm />} />
        <Route path="/doctor-slot-list" element={<DoctorSlotList />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

        {/* <Route path="/clinic-registration" element={<ClinicPage />} />
         <Route path="/clinic-timings" element={<ClinicTimingsPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;

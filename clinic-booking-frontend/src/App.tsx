import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/index";
import Home from "./pages/dashboard";
import Clinics from "./pages/clinics";
import Doctors from "./pages/doctors";
import Appointments from "./pages/appointments";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
       <Route path="/home" element={<Home />} />
      <Route path="/clinics" element={<Clinics />} />
      <Route path="/doctors" element={<Doctors />} />
      <Route path="/appointments" element={<Appointments />} />
    </Routes>
  );
}

export default App;

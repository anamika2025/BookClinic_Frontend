import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/index";
import Home from "./pages/home";
import Clinics from "./pages/Clinics";
import Doctors from "./pages/Doctors";
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

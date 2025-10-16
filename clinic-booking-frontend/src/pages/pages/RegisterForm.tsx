import { useState } from "react";
import type { RegisterRequest } from "@/pages/types/types";
import { registerUser } from "@/library/apiUser";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [form, setForm] = useState<RegisterRequest>({
    userName: "",
    email: "",
    password: "",
    role: "Patient",
    status: "Active",
    cityId: 1,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const { token, user } = await registerUser(form);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Registration successful!");
      navigate("/login");
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message || "Registration failed");
      } else {
        alert("An unknown error occurred during registration");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Register</h2>

        <input
          name="userName"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          onChange={handleChange}
        />

        <select name="role" value={form.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300">
          <option value="Patient">Patient</option>
          <option value="Clinic">Clinic</option>
          <option value="Doctor">Doctor</option>
        </select>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}

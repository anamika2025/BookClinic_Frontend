import { useState } from "react";
import { loginUser } from "@/library/apiUser";
import type { LoginRequest } from "@/pages/types/types";
import { useNavigate } from "react-router-dom"; // if you use React Router

export default function LoginForm() {
  const [form, setForm] = useState<LoginRequest>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { token, user } = await loginUser(form);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      alert("Login successful!");
      navigate("/"); // redirect after login
    } catch (e: unknown) {
      if (e instanceof Error) {
        alert(e.message || "Login failed");
      } else {
        alert("An unknown error occurred during Login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-blue-300"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}

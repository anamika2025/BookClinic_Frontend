import type { AuthResponse, LoginRequest, RegisterRequest } from "@/pages/types/types";

export async function registerUser(data: RegisterRequest): Promise<AuthResponse> {
  const res = await fetch(`/api/Authentication/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function loginUser(data: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`/api/Authentication/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

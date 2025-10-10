// src/library/apiInstance.ts

/**
 * Get authorization headers (if token exists)
 */
const getAuthHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

/**
 * Handle API responses
 */
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "API request failed");
  }
  return response.json() as Promise<T>;
};

const buildHeaders = (): Record<string, string> => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

/**
 * Generic GET
 */
export const apiGet = async <T>(url: string): Promise<T> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...getAuthHeaders(),
  };
  const response = await fetch(`/api${url}`, {
    // <-- Use the full backend URL
    method: "GET",
    headers,
  });
  return handleResponse(response);
};

/**
 * Generic PUT
 */
export const apiPut = async <T>(url: string, body: unknown): Promise<T> => {
  const response = await fetch(url, {
    method: "PUT",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
};

/**
 * Generic DELETE
 */
export const apiPost = async <T>(url: string, body: unknown): Promise<T> => {
  const response = await fetch(url, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify(body),
  });
  return handleResponse<T>(response);
};

export const apiDelete = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: buildHeaders(),
  });
  return handleResponse<T>(response);
};

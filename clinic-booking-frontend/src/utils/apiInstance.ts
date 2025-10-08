import axios, { type AxiosResponse } from 'axios';

/**
 * Wrapper for GET requests
 */
export const apiGet = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.get(url);
  return response.data;
};

/**
 * Wrapper for POST requests
 */
export const apiPost = async <T>(url: string, data: unknown): Promise<T> => {
  const response: AxiosResponse<T> = await axios.post(url, data);
  return response.data;
};

/**
 * Wrapper for PUT requests
 */
export const apiPut = async <T >(url: string, data: unknown): Promise<T> => {
  const response: AxiosResponse<T> = await axios.put(url, data);
  return response.data;
};

/**
 * (Optional) Wrapper for DELETE requests
 */
export const apiDelete = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axios.delete(url);
  return response.data;
};

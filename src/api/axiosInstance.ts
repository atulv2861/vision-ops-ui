import axios, { type AxiosError } from 'axios';
import { getToken, removeToken } from '../utils/token';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';
const REQUEST_TIMEOUT_MS = 15_000;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/** Clear auth and redirect to login. Call from 401 interceptor or logout flows. */
function handleUnauthorized(): void {
  removeToken();
  // Use window.location to force full reload and clear any in-memory state
  const loginPath = '/login';
  if (window.location.pathname !== loginPath) {
    window.location.href = loginPath;
  }
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Do not attach global filter params (date, location, cameraList) to requests;
    // APIs that need filters (e.g. overview-cards) send client_id, from, to, location_id, camera_id in their URL.

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      handleUnauthorized();
    }
    return Promise.reject(error);
  }
);

import axios, { type AxiosError } from 'axios';
import { getToken, removeToken } from '../utils/token';
import { getGlobalFilters } from '../utils/globalFilters';

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

/** Decide if global filters should be attached for this request. */
function shouldAttachFilters(url?: string): boolean {
  if (!url) return true;

  // If full URL, extract pathname; otherwise treat as relative path
  let path: string;
  try {
    path = url.startsWith('http') ? new URL(url).pathname : url;
  } catch {
    path = url;
  }

  // Do NOT send filters for auth/user related APIs like login, signup, logout, profile, update user
  if (path.startsWith('/auth') || path.startsWith('/user')) {
    return false;
  }

  return true;
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (shouldAttachFilters(config.url)) {
      const filters = getGlobalFilters();
      if (filters) {
        const existingParams = (config.params ?? {}) as Record<string, unknown>;
        config.params = {
          ...existingParams,
          location: filters.Location || existingParams.location,
          date: filters.Date || existingParams.date,
          cameraList:
            (filters.CameraList && filters.CameraList.length > 0
              ? filters.CameraList
              : existingParams.cameraList) ?? undefined,
        };
      }
    }

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

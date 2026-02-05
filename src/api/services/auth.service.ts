import { axiosInstance } from '../axiosInstance';
import { endpoints } from '../endpoints';
import { removeToken, setToken } from '../../utils/token';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
  };
}

export interface MeResponse {
  id: string;
  email: string;
  name?: string;
}

/** Pure API functions - no React, no UI logic. */
export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { data } = await axiosInstance.post<LoginResponse>(
      endpoints.auth.login(),
      payload
    );
    if (data.token) {
      setToken(data.token);
    }
    return data;
  },

  async getMe(): Promise<MeResponse> {
    const { data } = await axiosInstance.get<MeResponse>(endpoints.auth.me());
    return data;
  },

  async logout(): Promise<void> {
    try {
      await axiosInstance.post(endpoints.auth.logout());
    } finally {
      removeToken();
    }
  },
};

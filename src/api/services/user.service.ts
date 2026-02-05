import { axiosInstance } from '../axiosInstance';
import { endpoints } from '../endpoints';

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  phone?: string;
}

export interface UpdateProfilePayload {
  name?: string;
  avatar?: string;
  phone?: string;
}

/** Pure API functions - no React, no UI logic. */
export const userService = {
  async getProfile(): Promise<UserProfile> {
    const { data } = await axiosInstance.get<UserProfile>(
      endpoints.user.profile()
    );
    return data;
  },

  async updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
    const { data } = await axiosInstance.put<UserProfile>(
      endpoints.user.updateProfile(),
      payload
    );
    return data;
  },
};

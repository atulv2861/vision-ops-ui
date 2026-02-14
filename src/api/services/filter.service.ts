import { axiosInstance } from '../axiosInstance';
import { endpoints } from '../endpoints';

export interface LocationItem {
  id: string;
  location: string;
}

export interface LocationFilterResponse {
  client_id: string;
  location: LocationItem[];
}

export interface CameraItem {
  camera_id: string;
  name: string;
}

export const filterService = {
  async getLocations(clientId: string): Promise<LocationItem[]> {
    const { data } = await axiosInstance.get<LocationItem[] | LocationFilterResponse>(
      endpoints.filter.location(clientId)
    );
    if (Array.isArray(data)) return data;
    return Array.isArray(data?.location) ? data.location : [];
  },

  async getCameras(locationId: string): Promise<CameraItem[]> {
    const { data } = await axiosInstance.get<CameraItem[] | { camera: CameraItem[] }>(
      endpoints.filter.camera(locationId)
    );
    if (Array.isArray(data)) return data;
    return Array.isArray((data as { camera?: CameraItem[] })?.camera)
      ? (data as { camera: CameraItem[] }).camera
      : [];
  },
};

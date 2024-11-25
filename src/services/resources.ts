import { api } from "../util/api";
import { Resource } from "../util/types";

export async function getResources() {
  try {
    const response = await api.get(`/resources`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addResource(resource: Omit<Resource, "_id">) {
  try {
    const response = await api.post(`/resources`, resource);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function deleteResource(id: string) {
  try {
    const response = await api.delete(`/resources/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateResource(id: string, resource: Partial<Resource>) {
  try {
    const response = await api.patch(`/resources/${id}`, resource);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
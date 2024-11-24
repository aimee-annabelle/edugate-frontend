import { api } from "../util/api";

export type Resource = {
    title: string;
    description: string;
    type: string;
    subject: string;
    gradeLevel: string;
    fileUrl: string;
}

export default async function getResources() {
  try {
    const response = await api.get(`/resources`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addResource(resource: Resource) {
  try {
    const response = await api.post(`/resources`, resource);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

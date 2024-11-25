import { api } from "../util/api";
import { User } from "../util/types";

export async function getUsers() {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateUser(id: string, user: Partial<User>) {
  try {
    const response = await api.patch(`/users/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}


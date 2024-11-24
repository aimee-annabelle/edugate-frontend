import { api } from "../util/api";
import { useAuthStore } from "../util/authStore";

interface LoginData {
  email: string;
  password: string;
}

export const login = async (userData: LoginData) => {
  const { data } = await api.post('/auth/login', userData);
  useAuthStore.getState().setToken(data.token);
  useAuthStore.getState().setUser(data.user); 
  return data;
};

export const logout = async () => {
  useAuthStore.getState().logout();
};

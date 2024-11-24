import { api } from "../util/api";

interface LoginData {
  email: string;
  password: string;
}

export const login = async (userData: LoginData) => {
  const { data } = await api.post('/auth/login', userData);
  return data;
};

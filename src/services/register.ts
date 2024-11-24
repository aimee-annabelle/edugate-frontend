import { api } from "../util/api";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const register = async (userData: RegisterData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

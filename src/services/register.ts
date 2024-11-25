import { api } from "../util/api";
import { RegisterData } from "../util/types";

export const register = async (userData: RegisterData) => {
  const { data } = await api.post('/auth/register', userData);
  return data;
};

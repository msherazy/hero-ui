import api from '../services/api';
import { Endpoints } from '../utils/enpoints.ts';

const getUserInfo = async (token: string) => {
  const data = await api.get(Endpoints.profile, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data.data;
};

export const AuthApi = {
  getUserInfo,
};

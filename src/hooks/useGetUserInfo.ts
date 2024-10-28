import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { AuthApi } from '@/api';
import { useUserContext } from '@/hooks/useUserContext';

interface UserInfoResponse {
  name: string;
  email: string;
}

export const useGetUserInfo = () => {
  const { updateUserData } = useUserContext();
  const token = localStorage.getItem('token') ?? '';

  const { data, error, isLoading } = useQuery<UserInfoResponse, Error>({
    queryKey: ['get-profile', token],
    queryFn: () => AuthApi.getUserInfo(token),
    enabled: !!token,
  });

  useEffect(() => {
    if (!data || !data?.email) return;
    const { name, email } = data;
    updateUserData({ name, email });
  }, [data]);

  return { data: data, error, isLoading };
};

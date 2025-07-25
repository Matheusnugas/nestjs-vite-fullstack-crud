import { useMutation, useQuery } from '@tanstack/react-query';
import { login, register, getMe } from '../api/auth';

export function useLogin() {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.accessToken);
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.accessToken);
    },
  });
}

export function useMe(enabled = true) {
  return useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      const { data } = await getMe();
      return data;
    },
    enabled,
  });
} 
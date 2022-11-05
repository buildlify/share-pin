import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import http from '../libs/axios';

const sendUsername = (data: { userId: string; newUsername: string }) =>
  http.put('/user/update-username', data);

const useUpdateUsername = () => {
  const { mutate, isLoading, data } = useMutation(sendUsername, {
    onError: () => {
      toast.error('Error, Please Try Again');
    },
  });

  return { mutate, isLoading, data };
};

export { useUpdateUsername };

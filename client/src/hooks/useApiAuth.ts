import { useMutation, useQuery } from '@tanstack/react-query';
import http from '../libs/axios';
import { toast } from 'react-hot-toast';

const sendVerifyEmailData = (email: string) =>
  http.post('/auth/verify-email', { email });

const useVerifyEmail = () => {
  const { mutate, isLoading, data } = useMutation(sendVerifyEmailData, {
    onError: () => {
      toast.error('Error, Please Try Again');
    },
  });

  return { mutate, isLoading, data };
};

const validateRegisterToken = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const token = queryKey[1];
  try {
    const { data } = await http.get(`/auth/validate-register-token/${token}`);
    return data.email;
  } catch (error) {
    return false;
  }
};

const useValidateRegisterToken = (token: string) => {
  const { isLoading, data, error } = useQuery(
    ['validateRegisterToken', token],
    validateRegisterToken,
  );

  return { isLoading, data, error };
};

const sendUserInfo = (data: { email: string; username: string; password: string }) =>
  http.post('/auth/register', data);

const useRegisterUserInfo = () => {
  const { mutate, isLoading, data } = useMutation(sendUserInfo, {
    onError: () => {
      toast.error('Error, Please Try Again');
    },
  });

  return { mutate, isLoading, data };
};

const sendLoginInfo = (data: { email: string; password: string }) =>
  http.post('/auth/login', data);

const useLoginUser = () => {
  const { mutate, isLoading, data } = useMutation(sendLoginInfo, {
    onError: () => {
      toast.error('Invalid Credentials');
    },
  });

  return { mutate, isLoading, data };
};

export {
  useVerifyEmail,
  useValidateRegisterToken,
  useRegisterUserInfo,
  useLoginUser,
};

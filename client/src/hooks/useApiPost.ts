import { useMutation, useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import http from '../libs/axios';
import { IPost } from '../types';

const getUsersPosts = async ({ queryKey }: { queryKey: [string, string] }) => {
  const userId = queryKey[1];
  try {
    const { data } = await http.get<{ posts: IPost[] }>(`/post/user/${userId}`);
    return data.posts;
  } catch (error) {
    return undefined;
  }
};

const useGetUsersPosts = (userId: string) => {
  const { isLoading, data, error } = useQuery(
    ['validateRegisterToken', userId],
    getUsersPosts,
  );

  return { isLoading, data, error };
};
/* eslint-disable @typescript-eslint/no-explicit-any */
const sendPostData = (data: any) => http.post('/post/create', data); // todo any

const useCreatePost = () => {
  const { mutate, isLoading, data } = useMutation(sendPostData, {
    onError: () => {
      toast.error('Error, Please Try Again');
    },
  });

  return { mutate, isLoading, data };
};

const getSinglePost = async ({ queryKey }: { queryKey: [string, string] }) => {
  const postId = queryKey[1];
  try {
    const { data } = await http.get<{ post: IPost }>(`/post/${postId}`);
    return data.post;
  } catch (error) {
    return undefined;
  }
};

const useGetSinglePost = (postId: string) => {
  const { isLoading, data, error, refetch } = useQuery(
    ['getSinglePost', postId],
    getSinglePost,
  );

  return { isLoading, data, error, refetch };
};

const sendVoteData = (data: { userId: string; postId: string; agree: boolean }) =>
  http.post('/post/votes', data); // todo any

const useUpdateVotes = () => {
  const { mutate, isLoading, data } = useMutation(sendVoteData, {
    onError: () => {
      toast.error('Error, Please Try Again');
    },
  });

  return { mutate, isLoading, data };
};

export { useGetUsersPosts, useCreatePost, useGetSinglePost, useUpdateVotes };

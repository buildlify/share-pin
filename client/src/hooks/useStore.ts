import create from 'zustand';
import { persist } from 'zustand/middleware';

type User = {
  id: string;
  email: string;
  username: string;
  createdAt: string;
};

type Store = {
  user: User;
  updateUser: (data: User) => void;
  updateUsername: (username: string) => void;
  clearUser: () => void;
};

const useStore = create<Store>()(
  persist(
    (set) => ({
      user: { id: '', email: '', username: '', createdAt: '' },
      updateUser: (data: User) => set(() => ({ user: data })),
      updateUsername: (username: string) =>
        set((state) => ({ user: { ...state.user, username } })),
      clearUser: () =>
        set(() => ({ user: { id: '', email: '', username: '', createdAt: '' } })),
    }),
    {
      name: 'user',
    },
  ),
);

export default useStore;

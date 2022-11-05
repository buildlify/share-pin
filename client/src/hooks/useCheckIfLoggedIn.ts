import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from './useStore';

const useCheckIfLoggedIn = (): void => {
  const { user } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id !== '') navigate('/posts');
  }, [user, navigate]);
};

export default useCheckIfLoggedIn;

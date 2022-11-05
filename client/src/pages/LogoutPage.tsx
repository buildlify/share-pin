import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../hooks/useStore';

const LogoutPage = () => {
  const { clearUser } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    clearUser();
    navigate('/login');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};

export default LogoutPage;

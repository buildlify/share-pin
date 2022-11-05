import LoginBox from '../components/login-box/LoginBox';
import useCheckIfLoggedIn from '../hooks/useCheckIfLoggedIn';

const LoginPage = () => {
  useCheckIfLoggedIn();
  return (
    <main className="flex justify-center items-center w-full h-screen">
      <LoginBox />
    </main>
  );
};

export default LoginPage;
